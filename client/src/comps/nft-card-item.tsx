import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

import NftPriceTag from "./nft-price-tag";

import { INft } from "../models/nft";

interface INftCardProps {
  nft: INft;
  showStatus?: boolean;
  height?: number;
  updateNftItems: Function;
}

const NFTCardItem = ({
  nft,
  showStatus = true,
  height = 300,
  updateNftItems,
}: INftCardProps) => {
  const [cardHover, setCardHover] = React.useState(false);

  const toggleFavourite = () => {
    let count = nft.favourite?.count ? nft.favourite.count : 0;
    const favourite = !nft.favourite?.isFavourite;
    nft.favourite = {
      count: favourite ? ++count : --count,
      isFavourite: favourite,
    };
    updateNftItems(nft);
  };
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
        mb: { xs: 0, md: 2 },
        position: "relative",
        marginTop: cardHover ? "-5px" : 0,
        transition: "margin-top 0.3s",
      }}
      elevation={cardHover ? 8 : 2}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Link to={`/nft/view/${nft.key}`}>
        <CardActionArea>
          <Box sx={{ position: "relative" }}>
            {showStatus && nft.status && (
              <Chip
                style={{
                  opacity: cardHover ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
                sx={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
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
            <CardMedia
              component="img"
              height={height}
              image={nft.cover}
              alt={nft.name}
            />
          </Box>
          <CardContent>
            <Grid container>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    {nft.name}
                  </Grid>
                  <Grid item xs={12}>
                    <Tooltip
                      title={nft.renderer.language.name}
                      placement="top"
                      arrow
                      PopperProps={{
                        disablePortal: true,
                      }}
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 200 }}
                    >
                      <Box
                        component="img"
                        src={nft.renderer.language.logo}
                        sx={{
                          width: "16px",
                          height: "16px",
                          mr: 1,
                          marginTop: "6px",
                        }}
                      />
                    </Tooltip>
                    {nft.renderer.library && (
                      <Tooltip
                        title={nft.renderer.library.name}
                        placement="top"
                        arrow
                        PopperProps={{
                          disablePortal: true,
                        }}
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 200 }}
                      >
                        <Box
                          component="img"
                          src={nft.renderer.library.logo}
                          sx={{
                            width: "16px",
                            height: "16px",
                            mr: 1,
                            marginTop: "6px",
                          }}
                        />
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexGrow: 1,
                  justifyContent: "flex-end",
                }}
              >
                <NftPriceTag nft={nft} />
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button sx={{ marginTop: "-6px" }} size="small" color="primary">
          Buy
        </Button>
        <Box
          component="div"
          aria-label="Favourite"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
        >
          <Typography
            component="div"
            sx={{ float: "left", marginRight: "3px" }}
          >
            {nft.favourite?.count}
          </Typography>
          <Tooltip
            title={
              nft.favourite?.isFavourite
                ? "Remove from favourite"
                : "Add to favourite"
            }
            placement="top"
            arrow
            PopperProps={{
              disablePortal: true,
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 200 }}
          >
            <IconButton sx={{ marginTop: "-10px;" }} onClick={toggleFavourite}>
              {nft.favourite?.isFavourite ? (
                <FavoriteIcon sx={{ color: "#f00" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default NFTCardItem;
