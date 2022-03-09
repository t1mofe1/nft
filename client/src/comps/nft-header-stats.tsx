// material
import {
  Grid,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { INftStats } from "../models/nft";
interface IDisplayItemProps {
  value: number | Array<number>;
}
const DisplayStatItem = ({ value }: IDisplayItemProps) => {
  const theme = useTheme();
  if (!Array.isArray(value)) return <Typography>{value}</Typography>;
  const [actual, total] = value;
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Typography>{actual}</Typography>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "20px",
          color: theme.palette.secondary.main,
        }}
      >
        {total}
      </Typography>
    </Stack>
  );
};
const StatsItem = (item: INftStats) => {
  return (
    <Grid item xs={6} md={2}>
      <Card elevation={4} sx={{}}>
        {item.avatar ? (
          <CardHeader
            titleTypographyProps={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: 600,

              backgroundColor: "#fff",
              borderRadius: "5px",
              marginTop: "-35px",
              pb: 2,
              pt: 1,
              px: 1,
            }}
            title={item.name}
          />
        ) : (
          <CardHeader
            titleTypographyProps={{
              textAlign: "center",
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: 600,
            }}
            title={item.name}
          />
        )}
        <CardContent sx={{ py: 2, textAlign: "center" }}>
          <DisplayStatItem value={item.value} />
        </CardContent>
      </Card>
    </Grid>
  );
};
interface INftHeaderStats {
  items: Array<INftStats>;
}
const NftHeaderStats = ({ items }: INftHeaderStats) => {
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center", mt: 5 }}>
      {items.map((item) => (
        <StatsItem {...item} />
      ))}
    </Grid>
  );
};

export default NftHeaderStats;
