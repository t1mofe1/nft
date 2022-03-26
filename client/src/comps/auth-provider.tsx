import React from "react";
import { GetAccountByAddress } from "../api/account";
import { useGraphqlQuery } from "../services/gql/query";

interface IAuthContext {
  account?: any;
  isLogged: boolean;
  inProgress?: boolean;
  signIn: (address: string) => void;
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
  const [address, setAddress] = React.useState<string | null>(null);

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
        account: data,
        inProgress: isLoading,
        isLogged: Boolean(data),
        signIn: (address) => setAddress(address),
        signOut: () => {
          window.location.reload();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
