import React from "react";
import { useSignature } from "./signature";
import { useAuth } from "../comps/auth-context";
import { IGraphqlMutationProps, useGraphqlMutation } from "./gql/mutation";

export const useSignedGraphqlMutation = (props: IGraphqlMutationProps) => {
  const { isLogged } = useAuth();
  const { sign, signature, isLoading, isExpired } = useSignature();

  const mutation = useGraphqlMutation({
    ...props,
    headers: {
      ...props.headers,
      Authorization: `Bearer ${window.btoa(String(signature))}`,
    },
    onSuccess: () => {
      props.onSuccess.call(null);
    },
    onError: (error) => {
      props.onError.call(null, error);
    },
  });

  React.useEffect(() => {
    if (signature !== null) {
      mutation.invoke();
    }
  }, [signature]);

  return {
    ...mutation,
    invoke: () => {
      if (!isLogged) {
        return;
      }

      isExpired() ? sign() : mutation.invoke();
    },
    isLoading: isLoading || mutation.isLoading,
  };
};
