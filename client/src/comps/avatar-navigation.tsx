import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  IconButton,
  Drawer,
  Box,
  Grid,
  Divider,
  Avatar,
  Button,
  Stack,
} from "@mui/material";
// import { useAuth } from "./auth-context";
import { useAuth } from "./auth-context";

export const AvatarNavigation = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { account, address, isLogged, inProgress, signOut } = useAuth();
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        // aria-controls={1}
        aria-haspopup="true"
        onClick={(event: React.MouseEvent) => setDrawerOpen(!drawerOpen)}
        color="inherit"
      >
        <Avatar alt={account?.nickname} src={account?.avatar} />
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
