import React from "react";
import { Box, Card, Link, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { INft } from "../models/nft";

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const NFTCard = (nft: INft) => {
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {/* {nft.status && (
          <Label
            variant="filled"
            color={(nft.status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {nft.status}
          </Label>
        )} */}
        <ProductImgStyle alt={nft.name} src={nft.cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {nft.name}
          </Typography>
        </Link>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
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
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default NFTCard;
