import { styled } from "@mui/material/styles";
import { LinkMain } from "./link-main";

export const LinkNav = styled(LinkMain)(({ theme }) => ({
  color: "#fff",
  fontSize: theme.typography.body2.fontSize,
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
