import React from "react";

import {
  Box,
  Grid,
  Divider,
  Avatar,
  Button,
  Stack,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./auth-context";
import { useTheme } from "@mui/material/styles";

export const AvatarNavigation = () => {
  const theme = useTheme();
  const { account, signOut, wallet, address } = useAuth();
  const [balance, setBalance] = React.useState(0);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
    wallet?.getBalance(address).then((balance) => setBalance(balance));
  };
  return (
    <>
      <IconButton
        edge="end"
        size="large"
        title={account?.nickname}
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={(event: React.MouseEvent) => handleDrawerOpen()}
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
                <Link
                  style={{
                    color: theme.palette.primary.light,
                    fontSize: theme.typography.body2.fontSize,
                  }}
                  to={`/account/${account?.id}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  View profile
                </Link>
              </Stack>
              <Divider />
              <Grid item xs={12} alignItems="center">
                <Typography variant="h4">{balance}</Typography>
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
