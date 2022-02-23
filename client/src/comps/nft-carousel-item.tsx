import React from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { INft, INftCategory } from "../models/nft";
import {
  CardMedia,
  Grid,
  Paper,
  Typography,
  CardContent,
  Button,
  ButtonProps,
} from "@mui/material";

interface IButtonProps extends ButtonProps {
  hoverColor?: string;
}
const ColorButton = styled(Button)<IButtonProps>(({ hoverColor, theme }) => ({
  color: theme.palette.getContrastText(grey[700]),
  backgroundColor: "transparent",
  borderColor: "#fff",
  "&:hover": {
    backgroundColor: "#f1f1f1",
    borderColor: "#fff",
    color: hoverColor,
  },
}));

interface INftCarouselItemProps {
  nftItems?: Array<INft>;
  nftCategory: INftCategory;
  order: number;
}

const NftCarouselItem = ({
  nftItems,
  nftCategory,
  order,
}: INftCarouselItemProps) => {
  return (
    <Paper elevation={7}>
      <Grid
        container
        spacing={0}
        sx={{
          height: "100%",
          display: "flex",
          verticalAlign: "middle",
        }}
      >
        {nftItems?.slice(0, 3).map((nft, i) => (
          <>
            {i === order && (
              <>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: "center",
                    backgroundColor: nftCategory.color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" color="#efefef">
                      {nftCategory.name}
                    </Typography>
                    <Typography variant="body1" color="#efefef" sx={{ my: 1 }}>
                      {nftCategory.description}
                    </Typography>
                    <ColorButton
                      hoverColor={nftCategory.color}
                      variant="outlined"
                      href={`category/${nftCategory.uri}`}
                      size="large"
                      sx={{
                        mt: 2,
                      }}
                    >
                      View category
                    </ColorButton>
                  </CardContent>
                </Grid>
              </>
            )}
            <Grid item xs={3}>
              <CardMedia
                component="img"
                height="345"
                image={nft.cover}
                alt={nft.name}
              />
            </Grid>
            {i === 2 && order === 3 && (
              <>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: "center",
                    backgroundColor: nftCategory.color,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Typography variant="h3" color="#efefef">
                      {nftCategory.name}
                    </Typography>
                    <Typography variant="body1" color="#efefef" sx={{ my: 1 }}>
                      {nftCategory.description}
                    </Typography>
                    <ColorButton
                      hoverColor={nftCategory.color}
                      variant="outlined"
                      href={`category/${nftCategory.uri}`}
                      size="large"
                      sx={{
                        mt: 2,
                      }}
                    >
                      View category
                    </ColorButton>
                  </CardContent>
                </Grid>
              </>
            )}
          </>
        ))}
      </Grid>
    </Paper>
  );
};

export default NftCarouselItem;
