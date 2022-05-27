import express from "express";
import { ISessionData, Session } from "../models/session";
import { gqlSchema } from "../utils/graphql/builder";
import { processRequest, getGraphQLParameters } from "graphql-helix";

const router = express.Router();

enum ResponseType {
  PUSH = "PUSH",
  RESPONSE = "RESPONSE",
  MULTIPART_RESPONSE = "MULTIPART_RESPONSE",
}

router.use("/", async (req, res) => {
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  const params = getGraphQLParameters(request);
  const { operationName, query, variables } = params;

  const { type, headers, subscribe, status, payload }: any =
    await processRequest({
      query,
      request,
      variables,
      operationName,
      schema: gqlSchema,
      contextFactory: (ctx: any) => {
        return {
            session: req.session,
            authorization: req.headers['Authorization'],
            updateSession: (data: ISessionData) => {
              const session = req.session as Session;
              session.data = {
                ...session.data,
                ...data
              };
            }
        };
      },
    });

  switch (type) {
    case ResponseType.PUSH:
      req.on("close", (result: any) => {
        result.unsubscribe();
      });

      res.writeHead(200, {
        Connector: "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
      });

      await subscribe((result: any) => {
        res.write(`data: ${JSON.stringify(result)}\n\n`);
      });
      break;
    case ResponseType.RESPONSE:
      headers.forEach(({ name, value }: any) => {
        res.setHeader(name, value);
      });
      res.status(status).json(payload);
      break;
    case ResponseType.MULTIPART_RESPONSE:
      // Unsupported
      // TODO: log this response
      break;
  }
});

export default router;
