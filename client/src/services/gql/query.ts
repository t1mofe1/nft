import React from "react";
import { useState } from "../../helpers/state";
import { useFetcher } from "../fetcher";
import { useGraphqlQueryCache } from "./cache";
import { GraphqlSchema } from "./schema";

export class GraphqlQuery extends GraphqlSchema {
  constructor(params: any, variables: Array<string>) {
    super();

    this._params = params;
    this._variables = variables;
  }

  public getSchema(): string {
    return `
            ${this.name}
            ${
              Object.keys(this._params || {}).length
                ? `(${this.getInputSchema()})`
                : ""
            }
            ${
              this._variables.length > 0 ? `{${this._variables.join(",")}}` : ``
            }
        `;
  }

  public fromObject(obj: any) {
    return obj[this.name];
  }
}

interface IGraphqlQueryProps {
  defaultData: any;
  invokeAtInit?: boolean;
  query: Array<GraphqlQuery>;
  cb?: (data?: any, error?: string) => void | Promise<void>;
}

const getGraphqlErrorString = (errors: any) => {
  if (Array.isArray(errors)) { 
    return errors.map((x) => {
        //@ts-ignore
        return x.message;
      })
      .join("\n");
  }

  return ``;
};

const getGraphqlQueryString = (query: Array<GraphqlQuery>) => {
  return `{
        ${query
          .map((x) => {
            return x.getSchema();
          })
          .join(" ")}
    }`;
};

const getGraphqlQueryResult = (data: any, query: Array<GraphqlQuery>) => {
  if (!data) {
    return null;
  }

  if (query.length === 1) {
    return query[0].fromObject(data);
  }

  const result = {};

  query.forEach((x) => {
    //@ts-ignore
    result[x.name] = x.fromObject(data);
  });

  return result;
};

export const useGraphqlQuery = <T = any>({
  query,
  defaultData,
  invokeAtInit = true,
  cb = () => undefined
}: IGraphqlQueryProps) => {
  
  useGraphqlQueryCache();

  const {
    state: { data, error }, updateState,
  } = useState<{ data: T; error: string }>({ data: defaultData, error: "" });

  const { fetch, isLoading } = useFetcher(
    {
      config: {
        url: "/api",
        method: "POST",
        data: {
          query: getGraphqlQueryString(query),
        },
      },
      onError: (error) => updateState({ error }),
      onSuccess: ({ data, errors }) => {
        const res = getGraphqlQueryResult(data, query);

        res
          ? updateState({ data: res, error: "" })
          : updateState({ error: getGraphqlErrorString(errors) });
      },
    },
    invokeAtInit
  );

  React.useEffect(() => {
    if ((data && data !== defaultData) || error) {
      cb?.call(
        null, 
        data, 
        error
      );
    };
  }, [data, error]);

  return {
    data,
    error,
    isLoading,
    invoke: fetch,
    reset: () => updateState({ data: defaultData, defaultData, error: "" }),
  };
};
