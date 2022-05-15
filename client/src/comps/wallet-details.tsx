import React from "react";

import { Box, Stack, Typography, IconButton, Icon } from "@mui/material";
import { AppCtx } from "../app";
import { useAuth } from "./auth-context";
import { Address } from "./address";

export const WalletDetails = () => {
  const dataContext = React.useContext(AppCtx);
  const { wallet, address } = useAuth();
  const [balance, setBalance] = React.useState(0);

  React.useEffect(() => {
    wallet?.getBalance(address).then((balance) => {
      setBalance(wallet?.convertBalance(balance));
    });
  }, [address, wallet]);

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ p: 2 }}
      >
        <IconButton>
          <Box
            component="img"
            src={
              dataContext?.nftFilterProps.blockchains
                .filter((blockchain) => {
                  return blockchain.name === wallet?.chain.name;
                })
                .pop()?.logo
            }
            sx={{ width: 24 }}
          />
        </IconButton>
        <Stack direction="column" spacing={1}>
          <Address address={address} variant="body2" color="secondary" />
          <Stack direction="row" spacing={1} justifyContent="center">
            <Typography variant="subtitle1" fontWeight={600}>
              {balance}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600}>
              {wallet?.chain.symbol}
            </Typography>
          </Stack>
        </Stack>
        <IconButton>
          <Icon>{"expand_more"}</Icon>
        </IconButton>
      </Stack>
    </>
  );
};
