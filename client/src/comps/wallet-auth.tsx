import React from "react";
import Strings from "../strings";
import { useAuth } from "./auth-context";
import { IWallet } from "../models/wallet";
import { IEtherum } from "../models/etherum";
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import WalletIcon from "@mui/icons-material/AccountBalanceWallet";

const wallets: IWallet[] = [
  {
    name: "metamask",
    label: "MetaMask",
    sign: async () => {},
    getAccounts: async () => {
      //@ts-ignore
      const instance = window.ethereum as IEtherum;
      return instance.request({ method: "eth_requestAccounts" }) as Promise<
        Array<any>
      >;
    },
    //@ts-ignore
    isAvailable: () => window.ethereum && window.ethereum.isMetaMask === true,
  },
];

export const WalletAuth = () => {
  const { inProgress, signIn } = useAuth();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  return (
    <React.Fragment>
      {!inProgress && (
        <IconButton
          edge="end"
          size="large"
          title={Strings.wallet}
          aria-haspopup="true"
          color="inherit"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <WalletIcon />
        </IconButton>
      )}
      {inProgress && (
        <Box pt={1}>
          <CircularProgress size="1rem" color="inherit" />
        </Box>
      )}
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
      >
        {wallets.map(({ name, label, getAccounts, isAvailable }) => (
          <MenuItem
            disabled={!isAvailable()}
            onClick={() => {
              setAnchor(null);

              getAccounts().then((accounts) => {
                if (!Array.isArray(accounts)) {
                  // TODO hanle it in better way
                  throw new Error("There is no account");
                }

                if (accounts.length === 0) {
                  // TODO hanle it in better way
                  throw new Error("There is no account");
                }
                signIn(accounts[0]);
              });
            }}
          >
            <Box sx={{ display: "flex" }}>
              <img src="/images/metamask-icon.png" width={25} />
              <Box ml={2}>{label}</Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};
