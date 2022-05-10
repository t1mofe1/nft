import { Link } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
export const LinkMain = styled(Link)(({ theme }) => ({
  color: "#fff",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
