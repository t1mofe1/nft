import { useFetcher } from "../fetcher";
import { GraphqlSchema } from "./schema";

export enum ReturnCode {
  rcNone,
  rcSuccess,
  rcGeneralError,
}

export interface IGraphqlMutationResponse {
  returnCode: ReturnCode;
  message?: string;
}

export class GraphqlMutationResponse implements IGraphqlMutationResponse {
  public returnCode: ReturnCode;
  public message?: string;

  constructor(props: IGraphqlMutationResponse) {
    this.returnCode = props.returnCode;
    this.message = props.message;
  }

  isError = () => {
    return this.returnCode === ReturnCode.rcGeneralError;
  };

  isSuccess = () => {
    return this.returnCode === ReturnCode.rcSuccess;
  };
}

export class GraphqlMutation extends GraphqlSchema {
  constructor(params: object) {
    super();

    this._params = params;
    this._variables = ["returnCode", "errorMsg, data"];
  }

  public getSchema(): string {
    const body: string = `
            ${this.name}
            ${
              Object.keys(this._params).length
                ? `(${this.getInputSchema()})`
                : ""
            }
            {${this._variables.join(",")}}
        `;

    return body;
  }

  public static fromObject(object: any): GraphqlMutationResponse {
    return new GraphqlMutationResponse(object[Object.keys(object)[0]]);
  }
}

export interface IGraphqlMutationProps {
  headers?: any;
  onSuccess: () => void;
  mutation?: GraphqlMutation;
  onError: (error: string) => void;
  onNetworkError?: (error: string) => void;
}

export const useGraphqlMutation = ({
  headers,
  onError,
  mutation,
  onSuccess,
  onNetworkError,
}: IGraphqlMutationProps) => {

  const getSchema = function (mutation?: GraphqlMutation) {
    return mutation
      ? {
          query: ` mutation {
                ${mutation.getSchema()}
            }`,
        }
      : undefined;
  };

  const { fetch, isLoading } = useFetcher(
    {
      config: {
        headers,
        url: "/api",
        method: "POST",
        data: mutation ? getSchema(mutation) : undefined,

      },
      onSuccess: ({ data, errors }) => {
        const response = GraphqlMutation.fromObject(data);
        response.isSuccess() ? onSuccess() : onError(response?.message || "");
      },
      onError: (error) => {
        if (onNetworkError) onNetworkError(error);
      },
    },
    false
  );

  return {
    isLoading,
    getSchema,
    invoke: (mut?: GraphqlMutation) => fetch(getSchema(mut)),
  };
};


