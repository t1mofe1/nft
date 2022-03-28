import React from "react";
import { Container, Grid, Typography, Fade, Box, Tooltip } from "@mui/material";
import NFTCard from "../comps/nft-card-item";
import { AppCtx } from "../app";
import { Link, useParams } from "react-router-dom";
import { INftCollection, INftHeader } from "../models/nft";
import NftCollectionHeader from "../comps/collection/nft-collection-header";

export const NftCollectionScreen = () => {
  const dataContext = React.useContext(AppCtx);
  const { key } = useParams();

  const collection: INftCollection = dataContext?.nftCollections
    .filter((collection) => collection.key + "" === key)
    .pop()!;
  return (
    <>
      <NftCollectionHeader collection={collection} />
      <Grid container spacing={4} sx={{ mt: 5 }}>
        {dataContext?.nftItems
          .filter((nft) => nft.collection.key + "" === key)
          .filter((item) => item.status === "new")
          .map((nft) => (
            <Grid
              key={"nft-new-" + nft.key}
              item
              xs={12}
              md={4}
              xl={3}
              sx={{ mb: 1 }}
            >
              <NFTCard
                nft={nft}
                showStatus={false}
                updateNftItems={dataContext?.updateNftItems}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
