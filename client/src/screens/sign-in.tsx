import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Grid,
  Box,
  Fade,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../comps/auth-context";
import { IWallet } from "../models/wallet";
import { IEtherum } from "../models/etherum";
import { ITronlink } from "../models/tronlink";
import { AppCtx } from "../app";

const wallets: IWallet[] = [
  {
    name: "metamask",
    label: "MetaMask",
    description:
      "MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.",
    logo: "/images/metamask-icon.png",
    chain: {
      symbol: "ETH",
      name: "ethereum",
      label: "Ethereum",
    },
    sign: async (nonce: string, address: string) => {
      //@ts-ignore
      const instance = window.ethereum as IEtherum;
      return instance.request({
        method: "personal_sign",
        params: [nonce, address],
      });
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
  {
    name: "tronlink",
    label: "TronLink",
    description:
      "TronLink is a software cryptocurrency wallet used to interact with the Tron blockchain.",
    logo: "/images/tronlink-icon.jpg",
    chain: {
      symbol: "TRX",
      name: "tron",
      label: "Tron",
    },
    sign: async (nonce: string, address: string) => {
      //@ts-ignore
      const instance = window.tronWeb as ITronlink;
      // const signedMessage = await instance.trx.sign(
      //   instance.address.toHex(address)
      // );
      // return instance.trx.verifyMessage(
      //   instance.address.toHex(address),
      //   signedMessage,
      //   address
      // );
      return instance.trx.sign(instance.toHex(nonce));
    },
    getAccounts: async () => {
      //@ts-ignore
      const instance = window.tronWeb as ITronlink;
      return instance.request({
        method: "tron_requestAccounts",
      }) as Promise<Array<any>>;
    },
    //@ts-ignore
    isAvailable: () => !!window.tronWeb,
  },
];

interface ISignInScreen {
  referer?: string;
}

export const SignInScreen = ({ referer = "/" }: ISignInScreen) => {
  const { signIn } = useAuth();
  const [availableWallets, setAvailableWallets] = useState<Array<boolean>>(
    Array(wallets.length).fill(false)
  );
  const [listItemHover, setListItemHover] = useState<Array<boolean>>(
    Array(wallets.length).fill(false)
  );
  const handleListHover = (i: number, hover: boolean) => {
    listItemHover[i] = hover;
    setListItemHover(listItemHover);
  };

  const dataContext = React.useContext(AppCtx);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      let available: Array<boolean> = [];
      wallets.forEach((wallet: IWallet) => {
        available.push(wallet.isAvailable());
      });
      setAvailableWallets(available);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container maxWidth="md">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="left"
        spacing={2}
        sx={{ height: "80vh" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Sign in</Typography>
            <Typography variant="body2">
              Choose one of our available wallets to sign in.
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <List>
              {wallets.map((wallet, i) => (
                <ListItem
                  sx={{ justifyContent: "left", py: 2 }}
                  key={wallet.name}
                  button
                  component="li"
                  disabled={!availableWallets[i]}
                  onMouseEnter={() => handleListHover(i, true)}
                  onMouseLeave={() => handleListHover(i, false)}
                  onClick={() => {
                    wallet.getAccounts().then((accounts) => {
                      if (wallet.chain.name === "tron") {
                        if (
                          //@ts-ignore
                          window.tronWeb.defaultAddress.base58 &&
                          accounts.code === 200
                        )
                          //@ts-ignore
                          signIn(window.tronWeb.defaultAddress.base58, wallet);
                        else {
                          dataContext?.enqueueSnackbar(
                            "Please log in to TronLink wallet extension.",
                            {
                              variant: "warning",
                            }
                          );
                          return false;
                        }
                      } else {
                        if (!Array.isArray(accounts)) {
                          // TODO hanle it in better way
                          throw new Error("There is no account");
                        }

                        if (accounts.length === 0) {
                          // TODO hanle it in better way
                          throw new Error("There is no account");
                        }
                        signIn(accounts[0], wallet);
                      }
                      navigate(referer, { replace: true });
                    });
                  }}
                >
                  <ListItemIcon>
                    <img alt={wallet.label} src={wallet.logo} width={25} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={4}
                      >
                        <Typography>{wallet.label}</Typography>
                        <Chip label={wallet.chain.name} variant="outlined" />
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
