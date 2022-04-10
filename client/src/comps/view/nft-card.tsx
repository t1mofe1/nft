import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import CardMedia from "@mui/material/CardMedia";

import { INft } from "../../models/nft";
import { Paper, Stack } from "@mui/material";

interface INftCardProps {
  nft: INft;
  showStatus?: boolean;
  height?: string;
  updateNftItems: Function;
}

const NFTCard = ({
  nft,
  showStatus = true,
  height,
  updateNftItems,
}: INftCardProps) => {
  return (
    <Stack spacing={0} sx={{ mt: 3 }} direction="column">
      <Paper
        key={"nft-card-" + nft.key}
        sx={{
          position: "relative",
        }}
        elevation={4}
      >
        <Box sx={{ position: "relative" }}>
          {showStatus && nft.status && (
            <Chip
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
            height={height ? height : "400"}
            image={nft.cover}
            alt={nft.name}
          />
        </Box>
        {/* <CardContent>
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
            <Tooltip
              title={nft.blockchain.name}
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
                src={nft.blockchain.logo}
                sx={{
                  width: "16px",
                  height: "16px",
                  mr: 1,
                  marginTop: "6px",
                }}
              />
            </Tooltip>
            <Box component="span">
              {nft.status === "sale" && (
                <Typography variant="subtitle1">
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{
                      color: "text.disabled",
                      textDecoration: "line-through",
                    }}
                  >
                    {nft.price}
                  </Typography>
                  &nbsp;
                  {nft.priceSale}
                </Typography>
              )}
              {nft.status !== "sale" && (
                <Typography variant="subtitle1">{nft.price}</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent> */}
        {/* <CardActions>
        <Button sx={{ marginTop: "-6px" }} size="small" color="primary">
          Buy
        </Button>
       
      </CardActions> */}
      </Paper>
    </Stack>
  );
};

export default NFTCard;
