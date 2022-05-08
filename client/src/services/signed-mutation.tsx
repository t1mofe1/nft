import React from 'react';
import { GetNonce } from '../api/account';
import { useGraphqlQuery } from './gql/query';
import { useAuth } from '../comps/auth-context';
import { IGraphqlMutationProps, useGraphqlMutation } from './gql/mutation';

export const useSignedGraphqlMutation = (props: IGraphqlMutationProps) => {
    const { wallet, isLogged, address } = useAuth();

    const { isLoading, invoke } = useGraphqlQuery({
        query: [
            new GetNonce()
        ],
        defaultData: "",
        invokeAtInit: false,
        cb: async (data: string) => {
            const signedMessage = 
                await wallet?.sign(data, address);
        
            setSignature(signedMessage);
        },
    });

    const [signature, setSignature] = React.useState<string | null>(null);

    const mutation = useGraphqlMutation({
        ...props,
        headers: {
            ...props.headers,
            Authorization: `Bearer ${window.btoa(String(signature))}`
        },
        onSuccess: () => {
            setSignature(null);
            props.onSuccess.call(null);
        },
        onError: (error) => {
            setSignature(null);
            props.onError.call(null, error);
        }
    });

    React.useEffect(() => {
        if (signature !== null) {
            mutation.invoke();
        }
    }, [signature])

    return {
        ...mutation,
        invoke: () => {
            if (!isLogged) {
                return;
            }

            invoke();
        },
        isLoading: isLoading || mutation.isLoading
    };
}