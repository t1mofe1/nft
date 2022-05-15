import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
export const LinkMain = styled(Link)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
