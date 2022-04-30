import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";

// import { AppCtx } from "../../app";

import { INftCollection } from "../../models/nft";
import { Icon, Stack } from "@mui/material";

interface INftCollectionDetailsProps {
  collection: INftCollection;
}

const NftCollectionDetails = ({ collection }: INftCollectionDetailsProps) => {
  // const dataContext = React.useContext(AppCtx);

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
        <Icon sx={{ fontSize: "40px" }}>{"web_asset"}</Icon>
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
        <Icon sx={{ fontSize: "40px" }}>{"share"}</Icon>
      </Button>
    </Tooltip>,
  ];
  return (
    <Box key={"nft-collection-" + collection.key}>
      <Box
        component="img"
        src={collection.cover}
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          display: "flex",
          flexDirection: "column",
        }}
      />
      <Container>
        <Toolbar>
          <Avatar
            alt={collection.name}
            style={{
              width: 200,
              height: 200,
              border: "5px solid #fff",
              marginTop: -100,
            }}
            src={collection.avatar}
          />
          <Typography
            sx={{ mx: 2, fontSize: 25, textTransform: "capitalize" }}
            variant="h4"
          >
            {collection.name}
          </Typography>
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
        <Grid container spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
          <Grid item xs={12} md={10} lg={8} sx={{ mb: 1 }}>
            <Typography
              sx={{ mt: 2, px: { xs: 2 } }}
              variant="body1"
              gutterBottom
              component="p"
            >
              {collection.description}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default NftCollectionDetails;
