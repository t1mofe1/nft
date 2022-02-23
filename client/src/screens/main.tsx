import React from "react";

import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import NftCarouselItem from "../comps/nft-carousel-item";

import { AppCtx } from "../app";

export const MainScreen = () => {
  const dataContext = React.useContext(AppCtx);

  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", my: 5 }}>
      <Grid item xs={12}>
        <Carousel>
          {dataContext?.boostedCategories.map((nftCategory, i) => (
            <NftCarouselItem
              key={"nft-boosted-category-" + nftCategory.uri}
              order={i}
              nftItems={dataContext?.nftItems.filter(
                (nft) => nft?.boosted?.category === nftCategory.uri
              )}
              nftCategory={nftCategory}
            />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};
