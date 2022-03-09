import React from "react";

import {
  Stack,
  Grid,
  Box,
  Container,
  Toolbar,
  Tooltip,
  Fade,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import WebIcon from "@mui/icons-material/Web";
import ShareIcon from "@mui/icons-material/Share";

import ProfileAddress from "./address";
import { Link } from "react-router-dom";
import { IProfile } from "../../models/profile";

interface IHeaderProps {
  profile: IProfile;
  showAddress?: boolean;
  showDescription?: boolean;
}

const NftProfileHeader = ({
  profile,
  showAddress = true,
  showDescription = true,
}: IHeaderProps) => {
  const buttons = [
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
      <Button>
        <WebIcon />
      </Button>
    </Tooltip>,
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
      <Button>
        <ShareIcon />
      </Button>
    </Tooltip>,
  ];
  return (
    <Box key={`nft-user-profile-${profile.key}`}>
      <Box
        component="img"
        src={profile.cover}
        sx={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          display: "flex",
          flexDirection: "column",
        }}
      />
      <Container>
        <Toolbar
        // sx={{display: 'flex', flexDirection: {xs:'columns', md:'row'}}}
        >
          <Avatar
            alt={profile.nickname}
            style={{
              width: 200,
              height: 200,
              border: "5px solid #fff",
              marginTop: -100,
            }}
            src={profile.avatar}
          />

          <Stack direction="column">
            <Typography
              sx={{ mx: 2, fontSize: 25, textTransform: "capitalize" }}
              variant="h4"
            >
              {profile.nickname}
            </Typography>
          </Stack>

          <Box
            sx={{
              mx: 1,
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            {buttons}
          </Box>
        </Toolbar>
        {showAddress && (
          <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
            {profile.addresses?.map((address) => (
              <Grid
                key={"address-wrapper" + address.key}
                item
                xs={4}
                md={3}
                lg={2}
                sx={{ mb: 1 }}
              >
                <ProfileAddress address={address} />
              </Grid>
            ))}
          </Grid>
        )}
        {showDescription && (
          <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
            <Grid item xs={12} md={10} lg={8} sx={{ mb: 1 }}>
              <Typography
                sx={{ mt: 2, px: { xs: 2 } }}
                variant="body1"
                gutterBottom
                component="p"
              >
                {profile.description}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
export default NftProfileHeader;
