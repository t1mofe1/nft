import { Typography, Stack, Container, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LinkLogo } from "./link-logo";
import { LinkMain } from "./link-main";

const FooterStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  position: "absolute",
  botom: 0,
  marginTop: "calc(5% + 60px)",
  width: "100%",
  color: "#fff",
}));

export const Footer = () => {
  return (
    <FooterStyled>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          <Stack
            direction="column"
            sx={{ flexShrink: 1, maxWidth: { sx: "100%", md: "30%" } }}
          >
            <LinkLogo to="/">Algomart</LinkLogo>
            <Typography variant="body2" sx={{ color: "#d1d1d1" }}>
              First decentralized market place with programmable NFTs that are
              fully-stored on the blockchain.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} sx={{ flexGrow: 1 }}>
            <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Useful links
              </Typography>
              <LinkMain to="/">How to create asset</LinkMain>
              <LinkMain to="/">How to swap assets</LinkMain>
              <LinkMain to="/">How to add wallets</LinkMain>
            </Stack>
            <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Information
              </Typography>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
            </Stack>
            <Stack direction="column" spacing={2} sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ color: "#fff" }}>
                Support
              </Typography>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
              <LinkMain to="/">huhu</LinkMain>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            Algomart, {new Date().getFullYear()} and beyond, All rights reserved
          </Typography>
        </Stack>
      </Container>
    </FooterStyled>
  );
};
