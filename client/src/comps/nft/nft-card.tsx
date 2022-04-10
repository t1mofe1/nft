import React from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

import CardMedia from "@mui/material/CardMedia";

import { INft } from "../../models/nft";

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
  );
};

export default NFTCard;
