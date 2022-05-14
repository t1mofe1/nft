import React from "react";
import { AccountInfo, Connection, clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { useState } from "../../helpers/state";
import { useAuth } from "../../comps/auth-context";

type Balance = number | "loading";

interface State {
  balance: Balance;
}
interface ConnectionState {
  connection?: Connection;
}
interface IBalanceContext {
  balance: Balance;
  refreshBalance: () => void;
  rpcUrl: string;
}

const BalanceContext = React.createContext<IBalanceContext | null>(null);

export const useBalance = () => {
  const ctx = React.useContext(BalanceContext);
  if (!ctx) {
    throw new Error("Missing balance context");
  }
  return {
    ...ctx,
  };
};

export const BalanceProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { address } = useAuth();
  console.log(address);
  const {
    state: { balance, rpcUrl },
    updateState,
  } = useState<{ balance: Balance; rpcUrl: string }>({
    balance: "loading",
    rpcUrl: "",
  });

  const configRpcUrl = clusterApiUrl("mainnet-beta");

  const provider: ConnectionState = React.useMemo(() => {
    if (rpcUrl === undefined) return {};
    try {
      const url = new URL(rpcUrl).toString();
      return { connection: new Connection(url, "confirmed") };
    } catch (err) {
      console.error(err);
      return {};
    }
  }, [rpcUrl]);

  const refreshBalance = React.useCallback(() => {
    if (address === null || provider === undefined) {
      updateState({ balance: "loading" });
      return;
    }

    (async () => {
      try {
        const publicKey: PublicKey = new PublicKey(address);
        const balance = await provider?.connection?.getBalance(publicKey);
        updateState({ balance: balance });
      } catch (err) {
        console.warn(err, "Failed to refresh balance");
      }
    })();
  }, [address, provider, updateState]);

  React.useEffect(() => {
    updateState({ rcpUrl: configRpcUrl });
  }, [configRpcUrl, updateState]);
  React.useEffect(() => {
    refreshBalance();
    const onChange = () => {
      if (document.visibilityState !== "visible") return;
      refreshBalance();
    };

    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [refreshBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balance: balance,
        rpcUrl: rpcUrl,
        refreshBalance: () => refreshBalance(),
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};
