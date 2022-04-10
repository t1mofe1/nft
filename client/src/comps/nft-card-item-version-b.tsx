import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

import NftPriceTag from "./nft-price-tag";

import { INft } from "../models/nft";
import NftRendererIcons from "./nft-renderer-icons";
import NftFavouriteButton from "./nft-favourite-button";
import { Avatar, Stack, Typography, Icon, Paper } from "@mui/material";

interface INftCardProps {
  nft: INft;
  showStatus?: boolean;
  height?: number;
  updateNftItems: Function;
}

const NFTCardItemB = ({
  nft,
  showStatus = true,
  height = 300,
  updateNftItems,
}: INftCardProps) => {
  const [cardHover, setCardHover] = React.useState(false);

  const onMouseEnterHandler = () => {
    setCardHover(true);
  };
  const onMouseLeaveHandler = () => {
    setCardHover(false);
  };
  return (
    <Card
      key={"nft-card-" + nft.key}
      sx={{
        maxWidth: "100%",
        borderRadius: 5,
        mx: { xs: 0, md: 2 },
        my: 7,
        overflow: "inherit",
      }}
      elevation={4}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <CardContent sx={{ position: "relative", mx: 2 }}>
        <Link to={`/nft/view/${nft.key}`}>
          <Paper elevation={3} sx={{ borderRadius: 5 }}>
            <CardMedia
              sx={{
                marginTop: "-100px",
                borderRadius: 5,
              }}
              component="img"
              height={height}
              image={nft.cover}
              alt={nft.name}
            />
          </Paper>
        </Link>

        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
        >
          <Link to={`/profile/${nft.creator.key}`}>
            <Avatar
              alt={nft.creator.nickname}
              style={{
                width: 48,
                height: 48,
                border: "3px solid #fff",
                marginTop: -24,
              }}
              src={nft.creator.avatar}
            />
          </Link>
          <NftRendererIcons renderer={nft.renderer} />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Box>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              sx={{
                opacity: cardHover ? 1 : 0,
                transition: "opacity 0.3s",
              }}
              startIcon={<Icon>{"account_balance_wallet"}</Icon>}
            >
              Buy
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                ml: 1,
                opacity: cardHover ? 1 : 0,
                transition: "opacity 0.3s",
              }}
              startIcon={<Icon>{"local_offer"}</Icon>}
            >
              Make offer
            </Button>
          </Box>
          <NftFavouriteButton nft={nft} updateNftItems={updateNftItems!} />
        </Stack>
        {showStatus && nft.status && (
          <Chip
            style={{
              opacity: cardHover ? 0 : 1,
              transition: "opacity 0.3s",
            }}
            sx={{
              position: "absolute",
              top: "-65px",
              right: "30px",
              borderRadius: 1,
              fontWeight: 800,
              color: "#fff",
            }}
            label={nft.status.toUpperCase()}
            color={
              (nft.status === "sale" && "error") ||
              (nft.status === "new" && "success") ||
              "info"
            }
            size="small"
          />
        )}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Stack direction="column">
            <Typography variant="h5">{nft.name}</Typography>
            <Link to={`/collection/view/${nft.collection.key}`}>
              <Typography variant="body2" color="secondary">
                {nft.collection.name}
              </Typography>
            </Link>
          </Stack>
          <NftPriceTag nft={nft} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NFTCardItemB;
