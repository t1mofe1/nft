import React from "react";
import Strings from "../strings";
import { useAuth } from "./auth-context";
import { IWallet } from "../models/wallet";
import { IEtherum } from "../models/etherum";
import {
  Box,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      <Drawer
        anchor={"right"}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
      >
        <Box sx={{ display: "flex", width: "300px" }} role="presentation">
          <Grid container spacing={0} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} alignItems="center">
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                }}
              >
                <Typography sx={{ marginTop: "5px;" }} variant="subtitle1">
                  Connect Wallet
                </Typography>
                <IconButton
                  aria-label="filter"
                  sx={{ display: "inline-flex" }}
                  color="primary"
                  onClick={() => setAnchor(null)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
            </Grid>
            <Grid item xs={12} sx={{ p: 2 }} alignItems="center">
              <Typography variant="body2">
                Connect with one of our wallets
              </Typography>
            </Grid>
            <Grid item xs={12} alignItems="center">
              {wallets.map(({ name, label, getAccounts, isAvailable }) => (
                <ListItem
                  button
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
                  <ListItemIcon>
                    <img src="/images/metamask-icon.png" width={25} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItem>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};
