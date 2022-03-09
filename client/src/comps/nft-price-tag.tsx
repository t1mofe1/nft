import { Box, Typography, Tooltip, Stack, Fade } from "@mui/material";

import { INft } from "../models/nft";

interface INftPriceTag {
  nft: INft;
  size?: number;
}

const NftPriceTag = ({ nft, size = 20 }: INftPriceTag) => {
  return (
    <Stack
      direction="row"
      spacing={0}
      justifyContent="center"
      alignItems="center"
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
            width: size,
            height: size,
            mr: 1.5,
          }}
        />
      </Tooltip>
      <Box component="span">
        {nft.status === "sale" && (
          <Typography
            variant="subtitle1"
            sx={{ fontSize: Math.floor(size * 1.2), lineHeight: size + "px" }}
          >
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: "text.disabled",
                textDecoration: "line-through",
                fontSize: Math.floor(size * 0.85),
                lineHeight: size + "px",
              }}
            >
              {nft.price}
            </Typography>
            &nbsp;
            {nft.priceSale}
          </Typography>
        )}
        {nft.status !== "sale" && (
          <Typography
            variant="subtitle1"
            sx={{ fontSize: Math.floor(size * 1.2), lineHeight: size + "px" }}
          >
            {nft.price}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
export default NftPriceTag;
