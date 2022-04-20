import React, { useState } from "react";
import {
  IconButton,
  Drawer,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
// import { useAuth } from "./auth-context";

import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CloseIcon from "@mui/icons-material/Close";

export const WalletLogged = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <IconButton
        edge="end"
        size="large"
        aria-haspopup="true"
        color="inherit"
        onClick={(event: React.MouseEvent) => setDrawerOpen(!drawerOpen)}
      >
        <WalletIcon />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(!drawerOpen)}
      >
        <Box sx={{ width: 350 }} role="presentation">
          <Grid container spacing={0} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} alignItems="center">
              <Box
                component="div"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  py: 1,
                  px: 2,
                }}
              >
                <Typography sx={{ marginTop: "5px;" }} variant="subtitle1">
                  My Wallet
                </Typography>
                <IconButton
                  aria-label="filter"
                  sx={{ display: "inline-flex" }}
                  color="primary"
                  onClick={() => setDrawerOpen(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};
