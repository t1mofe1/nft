import { Tooltip, Stack, Typography } from "@mui/material";
import { INft } from "../models/nft";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

interface INftFavouriteButton {
  nft: INft;
  updateNftItems: Function;
}
const NftFavouriteButton = ({ nft, updateNftItems }: INftFavouriteButton) => {
  const toggleFavourite = (nft: INft) => {
    let count = nft.favourite?.count ? nft.favourite.count : 0;
    const favourite = !nft.favourite?.isFavourite;
    nft.favourite = {
      count: favourite ? ++count : --count,
      isFavourite: favourite,
    };
    updateNftItems(nft);
  };
  return (
    <Stack
      direction="row"
      spacing={0.5}
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="div">{nft.favourite?.count}</Typography>
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
        TransitionProps={{ timeout: 200 }}
      >
        <IconButton
          sx={{ marginTop: "-10px;" }}
          onClick={() => toggleFavourite(nft)}
        >
          {nft.favourite?.isFavourite ? (
            <FavoriteIcon sx={{ color: "#f00" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
export default NftFavouriteButton;
