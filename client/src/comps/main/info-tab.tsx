import { Link } from "react-router-dom";
import { Typography, Grid } from "@mui/material";
import { IInfoTab } from "../../models/home";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";
interface IHomeInfoTab {
  tab: IInfoTab;
}
const HomeInfotab = ({ tab }: IHomeInfoTab) => {
  const theme = useTheme();
  return (
    <Grid item xs={6} md={3} key={tab.key}>
      <Icon color="secondary" sx={{ fontSize: "40px" }}>
        {tab.icon}
      </Icon>
      <Typography variant="h5" sx={{ mr: 2, marginTop: "5px" }}>
        {tab.title}
      </Typography>
      <Typography variant="body2" sx={{ mr: 2, marginTop: "5px" }}>
        {tab.description}
      </Typography>
      <Link style={{ color: theme.palette.secondary.main }} to={tab.link.url}>
        {tab.link.text}
      </Link>
    </Grid>
  );
};
export default HomeInfotab;
