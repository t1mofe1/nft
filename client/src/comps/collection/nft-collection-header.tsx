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

import { INftCollection } from "../../models/nft";
import { Link } from "react-router-dom";
import NftHeaderStats from "../nft-header-stats";
import NftCollectionBlockChains from "./nft-collection-blockchains";
import { useTheme } from "@mui/material/styles";

interface ICollectionHeaderProps {
  collection: INftCollection;
}

const NftCollectionHeader = ({ collection }: ICollectionHeaderProps) => {
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
  const theme = useTheme();

  return (
    <Box key={`nft-collection-${collection.key}`}>
      <Box
        component="img"
        src={collection.cover}
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
            alt={collection.name}
            style={{
              width: 200,
              height: 200,
              border: "5px solid #fff",
              marginTop: -100,
            }}
            src={collection.avatar}
          />
          <Stack direction="row" spacing={0}>
            <Stack direction="column">
              <Typography
                sx={{ mx: 2, fontSize: 25, textTransform: "capitalize" }}
                variant="h4"
              >
                {collection.name}
              </Typography>
              <Typography
                sx={{
                  mx: 2,
                  fontSize: 16,
                  textTransform: "none",
                  color: "#444",
                }}
                variant="body2"
              >
                created&nbsp;by&nbsp;
                <Link
                  style={{
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                  }}
                  to={`/profile/${collection.author.key}`}
                >
                  {collection.author.nickname}
                </Link>
              </Typography>
            </Stack>
            {/* <NftCollectionBlockChains blockchains={collection.blockchains} /> */}
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
        <Container maxWidth="lg">
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
          <NftHeaderStats items={collection.stats!} />
        </Container>
      </Container>
    </Box>
  );
};
export default NftCollectionHeader;
