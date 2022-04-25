import { Link } from "react-router-dom";

import { Grid, Typography, Stack, Button } from "@mui/material";

const AboutSection = () => {
  return (
    <Grid item xs={12} md={6}>
      <Stack sx={{ mb: 5 }} alignItems="center">
        <Typography
          variant="h4"
          sx={{ textTransform: "capitalize" }}
          gutterBottom
        >
          Exchange, collect and create programmable NFTs
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          Algomart is the first Decentralized Market Place with programmable
          NFTs that are fully-stored on the blockchain.
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 5 }}>
        <Button
          to="/browse"
          component={Link}
          color="secondary"
          variant="contained"
        >
          Browse
        </Button>
        <Button to="/assets/create" component={Link} variant="outlined">
          Create
        </Button>
      </Stack>
    </Grid>
  );
};
export default AboutSection;
