import React from "react";

import {
  Drawer,
  Box,
  Grid,
  Divider,
  Avatar,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./auth-context";
import { useTheme } from "@mui/material/styles";

<<<<<<< Updated upstream:client/src/comps/avatar-navigation.tsx
export const AvatarNavigation = () => {
  const theme = useTheme();
=======
const LinkProfile = styled(LinkMain)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontSize: theme.typography.body2.fontSize,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

export const WalletDrawer = () => {
>>>>>>> Stashed changes:client/src/comps/wallet-drawer.tsx
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
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
      >
        <Box sx={{ width: 350 }} role="presentation">
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
      </Drawer>
    </>
  );
};
