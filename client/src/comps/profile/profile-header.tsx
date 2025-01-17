import React from "react";

import {
  Grid,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Fade,
  IconButton,
  Icon,
} from "@mui/material";
import { IAccount } from "../../models/account";
import { ProfileCover } from "../profile-cover";
import { ProfileAvatar } from "../profile-avatar";
import { ProfileAddress } from "./profile-address";
import { ProfileNickname } from "../profile-nickname";
import { AppCtx } from "../../app";

interface IProfileHeaderProps {
  account: IAccount;
}

export const ProfileHeader = ({ account }: IProfileHeaderProps) => {
  const dataContext = React.useContext(AppCtx);

  return (
    <Box key={`nft-user-profile-${account?.id}`}>
      <ProfileCover src={account.cover} accountId={account.id} />
      <Container sx={{ zIndex: 5, position: "relative" }}>
        <Toolbar>
          <ProfileAvatar
            src={account.avatar}
            alt={account.nickname}
            accountId={account.id}
          />
          <ProfileNickname
            accountId={account.id}
            defaultValue={account.nickname}
          />
          <Box
            sx={{
              mx: 1,
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Tooltip
              key={"btn-" + 1}
              title="Webpage"
              placement="bottom"
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 200 }}
            >
              <IconButton>
                <Icon sx={{ fontSize: "40px" }}>{"web_asset"}</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip
              key={"btn-" + 2}
              title="Share profile"
              placement="bottom"
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 200 }}
            >
              <IconButton>
                <Icon sx={{ fontSize: "40px" }}>{"share"}</Icon>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
        <Grid container spacing={1} sx={{ justifyContent: "center" }}>
          {account?.addresses?.map(({ chain, address }) => (
            <Grid
              key={"address-wrapper" + address}
              item
              xs={4}
              md={3}
              lg={2}
              sx={{ mb: 1 }}
            >
              <ProfileAddress
                address={{
                  key: 0,
                  address,
                  blockchain: {
                    name: chain,
                    logo: dataContext?.nftFilterProps.blockchains
                      .filter((blockchain) => {
                        return blockchain.name === chain;
                      })
                      .pop()?.logo,
                    symbol: dataContext?.nftFilterProps.blockchains
                      .filter((blockchain) => {
                        return blockchain.name === chain;
                      })
                      .pop()?.symbol,
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
