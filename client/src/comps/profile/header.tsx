import React from "react";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";

import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { IProfile } from "../../models/profile";

const ProfileHeader = (profile: IProfile) => {
  //address tooltip
  const [tooltipCopiedOpen, setTooltipCopiedOpen] = React.useState(false);
  const [tooltipCopyOpen, setTooltipCopyOpen] = React.useState(false);

  const handleTooltipsClose = () => {
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(false);
  };

  const handleTooltipCopiedOpen = () => {
    navigator.clipboard.writeText(profile.address);
    setTooltipCopyOpen(false);
    setTooltipCopiedOpen(true);
  };
  const handleTootltipCopyOpen = () => {
    setTooltipCopyOpen(true);
  };

  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={profile.cover}
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "flex",
            flexDirection: "column",
          }}
        />
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: { xs: "columns", md: "row" },
            }}
          >
            <Avatar
              alt={profile.nickname}
              style={{
                width: 128,
                height: 128,
                border: "4px solid #fff",
                alignItems: "center",
                flexShrink: 0,
                marginTop: -64,
              }}
              src={profile.avatar}
            />
            <Typography
              sx={{ ml: 2, fontSize: 25, textTransform: "capitalize" }}
              variant="h4"
            >
              {profile.nickname}
            </Typography>
            <Stack></Stack>
          </Toolbar>
        </Container>
      </Box>

      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={0}
        style={{ minHeight: "10vh", marginTop: "25px" }}
      >
        <Grid item xs={12} md={3}>
          <Tooltip
            title="Copied"
            placement="bottom"
            arrow
            PopperProps={{
              disablePortal: true,
            }}
            open={tooltipCopiedOpen}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 200 }}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <Tooltip
              title="Copy"
              placement="bottom"
              arrow
              PopperProps={{
                disablePortal: true,
              }}
              open={tooltipCopyOpen}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 200 }}
              disableFocusListener
              disableHoverListener
              disableTouchListener
            >
              <Chip
                onMouseEnter={handleTootltipCopyOpen}
                onMouseLeave={handleTooltipsClose}
                icon={<AlternateEmailIcon />}
                label={
                  profile.address.substr(0, 6) +
                  " ... " +
                  profile.address.substr(-4)
                }
                sx={{ px: 1 }}
                onClick={handleTooltipCopiedOpen}
              />
            </Tooltip>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0}
        style={{ minHeight: "10vh" }}
      >
        <Grid item xs={12} md={6}>
          <Typography
            sx={{ mt: 2, px: { xs: 2 } }}
            variant="body2"
            gutterBottom
            component="p"
          >
            {profile.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ProfileHeader;
