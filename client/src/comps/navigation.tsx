import React from "react";

import {
  Box,
  AppBar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  ListItemText,
  Menu,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "./auth-context";
import { styled, alpha } from "@mui/material/styles";
import { WalletDrawer } from "./wallet-drawer";

import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

import { Link } from "react-router-dom";
import { LinkLogo } from "./link-logo";
import { LinkNav } from "./link-navigation";
import Toolbar from "./toolbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  po85terEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "85ch",
    },
  },
}));

export const MainNavigation = () => {
  const { account, isLogged, inProgress, signOut } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const MobileMenu = () => (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {isLogged && <LinkNav to={`/assets/create`}>Create</LinkNav>}
        {!isLogged && <LinkNav to={`/sign-in`}>Sign in</LinkNav>}
      </MenuItem>
    </Menu>
  );

  const WideScreenMenu = () => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <LinkNav
          to={`/account/${account?.id}`}
          onClick={() => handleMenuClose()}
        >
          <ListItemText>Profile</ListItemText>
        </LinkNav>
      </MenuItem>
      <MenuItem
        onClick={() => {
          signOut();
          handleMenuClose();
        }}
      >
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar elevation={0} position="static">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "common.white",
              }}
            >
              <LinkLogo to="/">ALGOMART</LinkLogo>
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, maxWidth: 850 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Stack direction="row" alignItems="center">
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
            >
              {isLogged && <LinkNav to={`/assets/create`}>Create</LinkNav>}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isLogged && !inProgress && <WalletDrawer />}
              {inProgress && (
                <Box pt={1}>
                  <CircularProgress size="1rem" color="inherit" />
                </Box>
              )}
              {!isLogged && !inProgress && (
                <Button
                  to="sign-in"
                  component={Link}
                  color="secondary"
                  variant="contained"
                >
                  Sign in
                </Button>
              )}
            </Box>
          </Stack>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            {isLogged && !inProgress && <WalletDrawer />}
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu />
    </Box>
  );
};
