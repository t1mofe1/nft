import React from "react";
import { IAccount } from "../models/account";
import { GetAccountByAddress } from "../api/account";
import { useGraphqlQuery } from "../services/gql/query";
import { IWallet } from "../models/wallet";
import { useState } from "../helpers/state";

interface IAuthContext {
  address: string;
  wallet?: IWallet;
  isLogged: boolean;
  account?: IAccount;
  inProgress?: boolean;
  refresh: () => void;
  signIn: (address: string, wallet: IWallet) => void;
  signOut: () => void;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    throw new Error("Missing auth context");
  }

  return {
    ...ctx,
  };
};

export const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { state: { address, wallet }, updateState } = useState<{address: string | null, wallet?: IWallet}>({
    address: null
  })

  const { data, isLoading, invoke, reset } = useGraphqlQuery({
    query: [new GetAccountByAddress(address || "")],
    defaultData: null,
    invokeAtInit: false,
  });

  React.useEffect(() => {
    if (address !== null) invoke();
  }, [address]);

  return (
    <AuthContext.Provider
      value={{
        wallet,
        account: data,
        inProgress: isLoading,
        isLogged: Boolean(data),
        address: String(address),
        refresh: () => invoke(),
        signIn: (address, wallet) => updateState({ address, wallet }),
        signOut: () => {
          reset();
          updateState({
            address: null,
            wallet: undefined
          });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
