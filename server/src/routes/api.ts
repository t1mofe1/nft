import express from 'express';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from 'graphql-helix';
import { ISessionData, Session } from '../models/session';
import { gqlSchema } from '../utils/graphql/builder';

const router = express.Router();

enum ResponseType {
  PUSH = 'PUSH',
  RESPONSE = 'RESPONSE',
  MULTIPART_RESPONSE = 'MULTIPART_RESPONSE',
}

router.use('/', async (req, res) => {
  // Create a generic Request object that can be consumed by Graphql Helix's API
  const request = {
    body: req.body,
    headers: req.headers,
    method: req.method,
    query: req.query,
  };

  // Determine whether we should render GraphiQL instead of returning an API response
  if (shouldRenderGraphiQL(request)) {
    return res.send(renderGraphiQL());
  }

  // Extract the GraphQL parameters from the request
  const { operationName, query, variables } = getGraphQLParameters(request);

  // Validate and execute the query
  const result = await processRequest({
    operationName,
    query,
    variables,
    request,
    schema: gqlSchema,
    contextFactory: (ctx) => ({
      session: req.session,
      authorization: req.headers['authorization'],
      updateSession: (data: ISessionData) => {
        const session = req.session as Session;

        session.data = {
          ...session.data,
          ...data,
        };
      },
    }),
  });

  // processRequest returns one of three types of results depending on how the server should respond
  // 1) RESPONSE: a regular JSON payload
  // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
  // 3) PUSH: a stream of events to push back down the client for a subscription
  switch (result.type) {
    case ResponseType.RESPONSE:
      // We set the provided status and headers and just the send the payload back to the client
      result.headers.forEach(({ name, value }) => res.setHeader(name, value));

      res.status(result.status).json(result.payload);

      break;
    case ResponseType.MULTIPART_RESPONSE:
      // Indicate we're sending an event stream to the client
      res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'multipart/mixed; boundary="-"',
        'Transfer-Encoding': 'chunked',
      });

      // If the request is closed by the client, we unsubscribe and stop executing the request
      req.on('close', () => {
        result.unsubscribe();
      });

      res.write('---');

      // Subscribe and send back each result as a separate chunk. We await the subscribe
      // call. Once we're done executing the request and there are no more results to send
      // to the client, the Promise returned by subscribe will resolve and we can end the response.
      await result.subscribe((result) => {
        const chunk = Buffer.from(JSON.stringify(result), 'utf8');

        const data = [
          '',
          'Content-Type: application/json; charset=utf-8',
          `Content-Length: ${chunk.length}`,
          '',
          chunk,
        ];
        if (result.hasNext) data.push('---');

        res.write(data.join('\r\n'));
      });

      res.write('\r\n-----\r\n');
      res.end();

      break;
    case ResponseType.PUSH:
      // Indicate we're sending an event stream to the client
      res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      });

      // If the request is closed by the client, we unsubscribe and stop executing the request
      req.on('close', () => {
        result.unsubscribe();
      });

      // We subscribe to the event stream and push any new events to the client
      await result.subscribe((result) => {
        res.write(`data: ${JSON.stringify(result)}\n\n`);
      });

      break;

    default:
      break;
  }
});

export default router;
