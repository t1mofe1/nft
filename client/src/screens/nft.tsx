import React from "react";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Tooltip,
  Toolbar,
  Icon,
  Button,
  Box,
  Paper,
} from "@mui/material";

import NFTCard from "../comps/view/nft-card";
import { AppCtx } from "../app";
import { Link, useParams } from "react-router-dom";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { INft } from "../models/nft";
import NftPriceTag from "../comps/nft-price-tag";
import NftDescriptionBox from "../comps/view/nft-description-box";
import NftActionButton from "../comps/nft-action-button";
import NftCountdown from "../comps/nft-count-down";

export const NftScreen = () => {
  const { key } = useParams();
  const dataContext = React.useContext(AppCtx);

  const nftItem = dataContext?.nftItems
    .filter((nft) => nft.key + "" === key)
    .pop()!;

  const collection = dataContext?.nftCollections
    .filter((collection) => collection.key === nftItem?.collectionKey)
    .pop()!;

  const toggleFavourite = (nft: INft) => {
    let count = nft.favourite?.count ? nft.favourite.count : 0;
    const favourite = !nft.favourite?.isFavourite;
    nft.favourite = {
      count: favourite ? ++count : --count,
      isFavourite: favourite,
    };
    dataContext?.updateNftItems(nft);
  };
  return (
    <Container maxWidth="xl" sx={{ contentAlign: "justify-end", mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <NFTCard
            nft={nftItem!}
            updateNftItems={dataContext?.updateNftItems!}
          />
          <NftDescriptionBox nft={nftItem} collection={collection} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 2 }}>
          <Stack direction="row" spacing={0} justifyContent="flex-end">
            <NftActionButton
              button={{
                key: "collection-url-button",
                url: collection?.url!,
                name: `Open external:  ${collection.name}`,
                icon: "open_in_new",
              }}
            />
          </Stack>
          <Toolbar sx={{ mb: 4, mt: 2 }}>
            <Stack
              direction="column"
              spacing={0}
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography variant="h6">{nftItem.name}</Typography>
              <Link to={`/collection/view/${collection.key}`}>
                <Typography variant="body2">{collection.name}</Typography>
              </Link>
            </Stack>
            <Box
              component="div"
              aria-label="Favourite"
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              <Typography
                component="div"
                sx={{ float: "left", marginRight: "3px" }}
              >
                {nftItem.favourite?.count ? nftItem.favourite?.count : 0}
              </Typography>
              <Tooltip
                title={
                  nftItem.favourite?.isFavourite
                    ? "Remove from favourite"
                    : "Add to favourite"
                }
                placement="top"
                arrow
                PopperProps={{
                  disablePortal: true,
                }}
                TransitionProps={{ timeout: 200 }}
              >
                <IconButton
                  sx={{ marginTop: "-10px;" }}
                  onClick={() => toggleFavourite(nftItem)}
                >
                  {nftItem.favourite?.isFavourite ? (
                    <FavoriteIcon sx={{ color: "#f00" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
          <Paper sx={{ px: 0, py: 3 }} elevation={4}>
            <Grid item xs={12} sx={{ my: 3, p: 2 }}>
              <NftPriceTag nft={nftItem} size={30} />
            </Grid>
            <Stack
              spacing={2}
              direction="row"
              sx={{ my: 2 }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                color="secondary"
                variant="contained"
                size="large"
                startIcon={<Icon>{"account_balance_wallet"}</Icon>}
              >
                Buy
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Icon>{"local_offer"}</Icon>}
              >
                Make offer
              </Button>
            </Stack>

            {nftItem.status! === "sale" && nftItem.saleEnds! && (
              <NftCountdown end={nftItem?.saleEnds} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
