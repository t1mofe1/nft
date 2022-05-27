import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Grid,
  Typography,
  Chip,
} from "@mui/material";
import { useAuth } from "../comps/auth-context";
import { IWallet } from "../models/wallet";
import { IEtherum } from "../models/etherum";
import { ITronlink } from "../models/tronlink";
import { IPhantom } from "../models/phantom";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { AppCtx } from "../app";
const wallets: IWallet[] = [
  {
    name: "metamask",
    label: "MetaMask",
    description:
      "MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain.",
    logo: "/images/metamask-icon.png",
    url: "https://metamask.io/",
    androidAppUrl: "https://play.google.com/store/apps/details?id=io.metamask",
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
    getAccount: (resp) => {
      console.log(resp);
      if (Array.isArray(resp)) return resp[0];
      return "";
    },
    convertBalance: (balance: string) => {
      let eth = parseInt(balance, 16);
      return eth * Math.pow(10, -18);
    },

    getBalance: async (address: string) => {
      //@ts-ignore
      const instance = window.ethereum as IEtherum;
      return instance.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      }) as Promise<any>;
    },
    connect: async () => {
      //@ts-ignore
      const instance = window.ethereum as IEtherum;
      return instance.request({
        method: "eth_requestAccounts",
      }) as Promise<any>;
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
    url: "https://www.tronlink.org/",
    androidAppUrl:
      "https://play.google.com/store/apps/details?id=com.tronlinkpro.wallet",
    chain: {
      symbol: "TRX",
      name: "tron",
      label: "Tron",
    },
    convertBalance: (balance) => parseFloat(balance),
    getBalance: async (address: string) =>
      new Promise(function (resolve, reject) {
        //@ts-ignore
        const instance = window.tronWeb as ITronlink;
        resolve(instance.trx.getBalance(address));
      }),
    sign: async (nonce: string, address: string) => {
      //@ts-ignore
      const instance = window.tronWeb as ITronlink;

      return instance.trx.sign(instance.toHex(nonce));
    },
    connect: async () => {
      //@ts-ignore
      const instance = window.tronWeb as ITronlink;
      //@ts-ignore
      return instance.request({
        method: "tron_requestAccounts",
      }) as Promise<any>;
    },
    getAccount: (resp) => {
      //@ts-ignore
      if (window.tronWeb.defaultAddress.base58 && resp.code === 200) {
        //@ts-ignore
        return window.tronWeb.defaultAddress.base58;
      }
      return "";
    },
    //@ts-ignore
    isAvailable: () => !!window.tronWeb && window.tronWeb.isTronLink,
  },
  {
    name: "phantom",
    label: "Phantom",
    description:
      "Phantom is a software cryptocurrency wallet used to interact with the Solana blockchain.",
    logo: "/images/phantom-icon.png",
    url: "https://phantom.app/",

    chain: {
      symbol: "SOL",
      name: "solana",
      label: "Solana",
    },
    convertBalance: (balance) => parseFloat(balance),
    sign: async (nonce: string, address: string) => {
      //@ts-ignore
      const instance = window.solana as IPhantom;
      return await instance.signMessage(
        new TextEncoder().encode(address),
        "utf8"
      );
    },
    getBalance: async (address: string) => {
      const configRpcUrl = clusterApiUrl("mainnet-beta");
      console.log(configRpcUrl);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      const publicKey: PublicKey = new PublicKey(address);
      const connection = new Connection(configRpcUrl, "confirmed");
      return connection.getBalance(publicKey) as Promise<any>;
    },
    getAccount: (resp: { publicKey: any }) => {
      return resp.publicKey.toString();
    },
    connect: async () => {
      //@ts-ignore
      const instance = window.solana as IPhantom;
      //@ts-ignore
      return instance.connect() as Promise<any>;
    },
    //@ts-ignore
    isAvailable: () => !!window.solana && window.solana.isPhantom,
  },
];

interface ISignInScreen {
  referer?: string;
}

export const SignInScreen = ({ referer = "/" }: ISignInScreen) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const dataContext = React.useContext(AppCtx);
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
                  onClick={() => {
                    if (!wallet.isAvailable()) {
                      //@todo: if user agent is mobile get them to app store link
                      //@ts-ignore
                      return window.open(wallet.url, "_blank").focus();
                    }
                    wallet.connect().then((resp) => {
                      const account = wallet.getAccount(resp);
                      if (!account) {
                        dataContext?.enqueueSnackbar(
                          `Please log in to ${wallet?.label}  wallet extension.`,
                          {
                            variant: "warning",
                          }
                        );
                        return false;
                      }
                      signIn(account, wallet);
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
