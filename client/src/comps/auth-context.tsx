import React from "react";
import { IWallet } from "../models/wallet";
import { useState } from "../helpers/state";
import { IAccount } from "../models/account";
import { useGraphqlQuery } from "../services/gql/query";
import { useGraphqlMutation } from "../services/gql/mutation";
import { CreateAccount, GetAccountByAddress } from "../api/account";

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
  const {
    state: { address, wallet },
    updateState,
  } = useState<{ address: string | null; wallet?: IWallet }>({
    address: localStorage.getItem("address"),
  });

  const { data, isLoading, invoke, reset } = useGraphqlQuery({
    query: [new GetAccountByAddress(String(address))],
    defaultData: null,
    invokeAtInit: false,
    cb: (data, error) => {
      if (error === "ACCOUNT_NOT_FOUND") {
        createAccount.invoke();
      }
    },
  });

  const createAccount = useGraphqlMutation({
    mutation: new CreateAccount(String(address), String(wallet?.chain.name)),
    onSuccess: () => invoke(),
    onError: () => {},
  });

  React.useEffect(() => {
    if (address !== null) {
      invoke();
      localStorage.setItem("address", address);
    }
  }, [address]);

  return (
    <AuthContext.Provider
      value={{
        wallet,
        account: data,
        inProgress: isLoading,
        isLogged: Boolean(data),
        address: String(address),
        refresh: () => {
          invoke();
        },
        signIn: (address, wallet) => updateState({ address, wallet }),
        signOut: () => {
          reset();
          updateState({
            address: null,
            wallet: undefined,
          });
          localStorage.removeItem("address");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
