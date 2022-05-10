import { Link } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";

export const LinkLogo = styled(Link)(({ theme }) => ({
  color: "#fff",
  textTransform: "uppercase",
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.h5.fontSize,
}));
