import React from "react";
import { IBlockChain } from "../models/nft";
import { GetBlockChains } from "../api/blockchain";
import { useGraphqlQuery } from "../services/gql/query";

interface IAppContext {
  blockChains: IBlockChain[];
}

const AppContext = React.createContext<IAppContext | null>(null);

export const AppContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [address, setAddress] = React.useState<string | null>(null);

  const { data, isLoading, invoke, reset } = useGraphqlQuery({
    query: [new GetBlockChains()],
    defaultData: null,
    invokeAtInit: true,
  });

  return (
    <AppContext.Provider value={{ blockChains: [] }}>
      {children}
    </AppContext.Provider>
  );
};
