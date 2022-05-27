import { styled } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 73,
  },
}));

export default Toolbar;
