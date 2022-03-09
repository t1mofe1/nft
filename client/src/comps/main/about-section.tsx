import { Link } from "react-router-dom";

import { Grid, Typography, Stack, Button } from "@mui/material";

const AboutSection = () => {
  return (
    <Grid container spacing={0} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            sx={{ textTransform: "capitalize" }}
            gutterBottom
          >
            Exchange, collect and create programmable NFTs
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Algomart is the first Decentralized Market Place with programmabe
            NFTs that are fully-stored on the blockchain.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mb: 5 }}
        >
          <Button color="secondary" variant="contained">
            Browse
          </Button>
          <Button variant="outlined">Create</Button>
        </Stack>
        <Link to="/">Find our more about algomart</Link>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  );
};
export default AboutSection;
