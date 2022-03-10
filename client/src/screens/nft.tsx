import React from "react";
import {
  Grid,
  Container,
  Typography,
  Stack,
  Icon,
  Button,
  Box,
  Paper,
} from "@mui/material";

import NFTCard from "../comps/view/nft-card";
import { AppCtx } from "../app";
import { Link, useParams } from "react-router-dom";

import NftPriceTag from "../comps/nft-price-tag";
import NftDescriptionBox from "../comps/view/nft-description-box";
import NftActionButton from "../comps/nft-action-button";
import NftCountdown from "../comps/nft-count-down";
import NftRendererIcons from "../comps/nft-renderer-icons";
import NftFavouriteButton from "../comps/nft-favourite-button";

export const NftScreen = () => {
  const { key } = useParams();
  const dataContext = React.useContext(AppCtx);

  const nftItem = dataContext?.nftItems
    .filter((nft) => nft.key + "" === key)
    .pop()!;

  const collection = dataContext?.nftCollections
    .filter((collection) => collection.key === nftItem?.collectionKey)
    .pop()!;
  return (
    <Container maxWidth="xl" sx={{ contentAlign: "justify-end", mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <NFTCard
            nft={nftItem!}
            updateNftItems={dataContext?.updateNftItems!}
          />
          <Box
            component="div"
            aria-label="Favourite"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexGrow: 1,
              mt: 1,
            }}
          >
            <NftFavouriteButton
              nft={nftItem}
              updateNftItems={dataContext?.updateNftItems!}
            />
          </Box>
          <NftDescriptionBox nft={nftItem} collection={collection} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ mt: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Link to={`/collection/view/${collection.key}`}>
              <Typography variant="body2">{collection.name}</Typography>
            </Link>
            <Box
              component="div"
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              <NftActionButton
                button={{
                  key: "collection-url-button",
                  url: collection?.url!,
                  name: `Open external:  ${collection.name}`,
                  icon: "open_in_new",
                }}
              />
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Typography variant="h6">{nftItem.name}</Typography>
              <NftRendererIcons renderer={nftItem.renderer} />
            </Stack>
          </Stack>
          <Paper sx={{ px: 0, py: 3 }} elevation={4}>
            <Grid item xs={12} sx={{ my: 3, px: 2, pb: 0, pt: 1 }}>
              <NftPriceTag nft={nftItem} size={30} />
            </Grid>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mt: 2, mb: 4 }}
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
