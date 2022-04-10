import React from "react";

import Carousel from "react-material-ui-carousel";
import {
  Grid,
  Typography,
  Stack,
  Container,
  FormControl,
  MenuItem,
} from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import NftCarouselItem from "../comps/nft-carousel-item";

import { AppCtx } from "../app";
//import LoginForm from "../comps/login-form";
import NFTCardItem from "../comps/nft-card-item";
import { IInfoTab } from "../models/home";
import Infotab from "../comps/main/info-tab";
import AboutSection from "../comps/main/about-section";

const InfoTabsData: Array<IInfoTab> = [
  {
    key: 1,
    title: "Login with wallet",
    description:
      "Connect and use your wallet to login to algomart. You will be able to buy tokens even those minted on different blockchain. Find out more about",
    icon: "account_balance_wallet",
    link: {
      url: "/",
      text: "supported wallets and blockchains.",
    },
  },
  {
    key: 2,
    title: "Create collections",
    description:
      "Create your own collections. Add social links, a description, profile & cover images, and set a secondary sales fee. Find out more",
    icon: "collections",
    link: {
      url: "/",
      text: "how to create collection.",
    },
  },
  {
    key: 3,
    title: "Create programmable NFT",
    description:
      "Develop your very own NFTs (image, animation, sound) in the programming language you preffer. Find out more about",
    icon: "code",
    link: {
      url: "/",
      text: "supported programing languages.",
    },
  },
  {
    key: 4,
    title: "List it and sell it!",
    description:
      "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them! Find out more",
    icon: "bookmark",
    link: {
      url: "/",
      text: "on how to sell your NFT.",
    },
  },
];
export const MainScreen = () => {
  const nftStatuses = ["trending", "new", "sale"];
  const dataContext = React.useContext(AppCtx);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [category, setCategory] = React.useState(
    dataContext?.categories[0].name
  );
  const [status, setStatus] = React.useState(nftStatuses[0]);

  return (
    <>
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <AboutSection />
        <Grid item xs={12} md={6}></Grid>
      </Container>
      <Grid container spacing={2} sx={{ justifyContent: "center", my: 10 }}>
        <Grid item xs={12}>
          <Carousel indicators={false}>
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
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", textAlign: "center" }}
        >
          {InfoTabsData.map((tab) => (
            <Infotab tab={tab} />
          ))}
        </Grid>
        <Grid container spacing={0} sx={{ justifyContent: "center", my: 10 }}>
          <Grid item xs={12} lg={6}>
            <Stack direction="row" sx={{ justifyContent: "center" }}>
              <Typography sx={{ mr: 2, marginTop: "5px" }}>
                Browse on
              </Typography>
              <FormControl>
                <Select
                  variant="standard"
                  labelId="select-status-label"
                  id="select-status"
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  {nftStatuses.map((nftStatus) => (
                    <MenuItem value={nftStatus}>{nftStatus}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography sx={{ mx: 2, marginTop: "5px" }}>
                in category
              </Typography>
              <FormControl>
                <Select
                  variant="standard"
                  labelId="select-category-label"
                  id="select-category"
                  value={category}
                  label="Category"
                  onChange={handleChange}
                >
                  {dataContext?.categories.map((nftCategory) => (
                    <MenuItem key={nftCategory.key} value={nftCategory.name}>
                      {nftCategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {dataContext?.nftItems
                .filter(
                  (item) => item.category === category && item.status === status
                )
                .map((nft) => (
                  <Grid
                    key={"nft-trending-" + nft.key}
                    item
                    xs={6}
                    md={4}
                    sx={{ mb: 1 }}
                  >
                    <NFTCardItem
                      nft={nft}
                      showStatus={false}
                      height={200}
                      updateNftItems={dataContext?.updateNftItems}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
