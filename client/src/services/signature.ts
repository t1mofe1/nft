import React from 'react';
import { GetNonce } from '../api/account';
import { useState } from '../helpers/state';
import { useGraphqlQuery } from './gql/query';
import { useAuth } from '../comps/auth-context';

interface IState {
    signature: string | null;
    expiration: number | null;
}

interface IGetNonceResponseData {
    value: string;
    expiration: number;
}

export const useSignature = () => {
    const { wallet, address } = useAuth();

    const { isLoading, invoke } = useGraphqlQuery({
        query: [
          new GetNonce(address)
        ],
        defaultData: "",
        invokeAtInit: false,
        cb: async ({ value, expiration }: IGetNonceResponseData) => {
            const signedMessage = await wallet?.sign(value, address);
    
            updateState({
                expiration,
                signature: signedMessage
            });
        }
    });

    const { state: { signature, expiration }, updateState } = useState<IState>({
        signature: null,
        expiration: null
    });

    return {
        signature,
        isLoading,
        sign: invoke,
        isExpired: () => Date.now() > Number(expiration)
    }
}