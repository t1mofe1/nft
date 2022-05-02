import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../comps/auth-context";
import { IWallet } from "../models/wallet";
import { IEtherum } from "../models/etherum";

const wallets: IWallet[] = [
  {
    name: "metamask",
    label: "MetaMask",
    logo: "/images/metamask-icon.png",
    chain: {
      symbol: "ETH",
      name: "ethereum",
      label: "Ethereum"
    },
    sign: async (nonce: string, address: string) => {
      //@ts-ignore
      const instance = window.ethereum as IEtherum;
      return instance.request({ method: 'personal_sign', params: [ nonce, address ] });
    },
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

interface ISignInScreen {
  referer?: string;
}

export const SignInScreen = ({ referer = "/" }: ISignInScreen) => {

  const { signIn } = useAuth();
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="left"
        spacing={2}
        sx={{ height: "80vh" }}
      >
        <Typography variant="h3">Sign in</Typography>
        <Typography variant="body2">
          Choose one of our available wallets to sign in.
        </Typography>
        <List>
          {wallets.map((wallet) => (
            <ListItem
              sx={{ justifyContent: "center", py: 2 }}
              alignItems="center"
              key={wallet.name}
              button
              component="li"
              disabled={!wallet.isAvailable()}
              onClick={() => {
                wallet.getAccounts().then((accounts) => {
                  if (!Array.isArray(accounts)) {
                    // TODO hanle it in better way
                    throw new Error("There is no account");
                  }

                  if (accounts.length === 0) {
                    // TODO hanle it in better way
                    throw new Error("There is no account");
                  }
                  signIn(accounts[0], wallet);
                  navigate(referer, { replace: true });
                });
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <ListItemIcon>
                  <img alt={wallet.label} src={wallet.logo} width={25} />
                </ListItemIcon>
                <ListItemText primary={wallet.label} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Container>
  );
};
