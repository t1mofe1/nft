import React from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Grid,
  Divider,
  Avatar,
  Button,
  Stack,
  SwipeableDrawer,
  IconButton,
  Icon,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";

import { useAuth } from "./auth-context";
import { AppCtx } from "../app";
import { WalletDetails } from "./wallet-details";
import { LinkMain } from "./link-main";

const LinkProfile = styled(LinkMain)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: theme.typography.body2.fontSize,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
export const WalletDrawer = () => {
  const { account, signOut } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <IconButton
        edge="end"
        size="large"
        title={account?.nickname}
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={(event: React.MouseEvent) => setDrawerOpen(!drawerOpen)}
      >
        <Avatar
          src={account?.avatar}
          alt={account?.nickname}
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
        onOpen={() => setDrawerOpen(!drawerOpen)}
        sx={{ width: { xs: "100%", md: 320 } }}
      >
        <Box sx={{ width: { xs: 300, md: 320 } }} role="presentation">
          <Grid container spacing={0} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} alignItems="center">
              <Stack
                component="div"
                direction="row"
                justifyContent="left"
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Avatar alt={account?.nickname} src={account?.avatar} />
                <LinkProfile
                  to={`/account/${account?.id}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  View profile
                </LinkProfile>
              </Stack>
              <Divider />
              <Grid item xs={12} alignItems="center">
                <Stack direction="column">
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{ p: 2 }}
                  >
                    <WalletDetails />
                  </Stack>
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <Button
                      variant="text"
                      color="primary"
                      component={Link}
                      to={"/"}
                      size="large"
                      startIcon={<Icon>{"account_balance_wallet"}</Icon>}
                    >
                      Add wallet
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      component={Link}
                      to={"/"}
                      size="large"
                      startIcon={<Icon>{"person"}</Icon>}
                    >
                      Edit profile
                    </Button>
                  </Stack>
                </Stack>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    position: "absolute",
                    bottom: "50px",
                    left: "40%",
                  }}
                  onClick={() => {
                    signOut();
                    setDrawerOpen(false);
                  }}
                >
                  Sign out
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
