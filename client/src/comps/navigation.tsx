import React from "react";
import {
  Box,
  AppBar,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  ListItemText,
  Menu,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "./auth-context";
import { WalletAuth } from "./wallet-auth";
import { styled, alpha } from "@mui/material/styles";

import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

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

const LogoLinkStyle = {
  fontSize: 18,
  color: "#fff",
  textDecoration: "none",
  marginLeft: 3,
  marginRight: 3,
};

const LinkStyle = {
  fontSize: 14,
  textDecoration: "none",
  marginRight: 10,
};

const RightLinkMobileStyle = {
  display: "block",
};

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
        <Link to={`/browse`} style={RightLinkMobileStyle}>
          Browse
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to={`/about`} style={RightLinkMobileStyle}>
          About
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
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
        <Link
          style={LinkStyle}
          to={`/account/${account?.id}`}
          onClick={() => handleMenuClose()}
        >
          <ListItemText>Profile</ListItemText>
        </Link>
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
              <Link to={`/`} style={LogoLinkStyle}>
                ALGOMART
              </Link>
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
          <Stack direction="row">
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                flexGrow: 1,
                justifyContent: "flex-end",
                p: 1,
                m: 1,
              }}
            >
              {isLogged && (
                <Link
                  to={`/assets/create`}
                  style={{ ...LinkStyle, color: "#fff" }}
                >
                  Create
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isLogged && !inProgress && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )}
              {!isLogged && <WalletAuth />}
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
          </Box>
        </Toolbar>
      </AppBar>
      <MobileMenu />
      <WideScreenMenu />
    </Box>
  );
};
