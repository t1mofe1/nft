import {
  Box,
  Grid,
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
} from "@mui/material";
import { Tabs } from "../comps/tabs";
import { IAccount } from "../models/account";
import { useParams } from "react-router-dom";
import { useAuth } from "../comps/auth-context";
import { GetAccountByKey } from "../api/account";
import { useGraphqlQuery } from "../services/gql/query";
import { ProfileHeader } from "../comps/profile/header";

import NFTCardItem from "../comps/nft-card-item";

import AppsIcon from "@mui/icons-material/Apps";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BarChartIcon from "@mui/icons-material/BarChart";

//data
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const DenseTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const ProfileScreen = () => {
  const { key } = useParams();
  const { account, isLogged } = useAuth();

  const { data } = useGraphqlQuery<IAccount>({
    query: [new GetAccountByKey(key as string)],
    defaultData: account,
    invokeAtInit: !isLogged,
  });

  if (!data) {
    return (
      <Box mt={3}>
        <Typography align="center">Loading..</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ProfileHeader account={data} />
      <Tabs
        items={[
          {
            props: {
              value: "1",
              label: "Assets",
              iconPosition: "start",
              icon: <AppsIcon color="primary" />,
            },
            component: (
              <Grid container spacing={2}>
                {[].map((nft: any) => (
                  <Grid
                    key={"nft" + nft.key}
                    item
                    xs={12}
                    md={4}
                    xl={3}
                    sx={{ mb: 1 }}
                  >
                    <NFTCardItem nft={nft} updateNftItems={() => undefined} />
                  </Grid>
                ))}
              </Grid>
            ),
          },
          {
            props: {
              value: "2",
              label: "Favourite",
              iconPosition: "start",
              icon: <FavoriteIcon color="primary" />,
            },
            component: (
              <Grid container spacing={2}>
                {[].map((nft: any) => (
                  <Grid
                    key={"nft" + nft.key}
                    item
                    xs={12}
                    md={4}
                    xl={3}
                    sx={{ mb: 1 }}
                  >
                    <NFTCardItem nft={nft} updateNftItems={() => undefined} />
                  </Grid>
                ))}
              </Grid>
            ),
          },
          {
            props: {
              value: "3",
              label: "Data",
              iconPosition: "start",
              icon: <BarChartIcon color="primary" />,
            },
            component: (
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ),
          },
        ]}
      />
    </Box>
  );
};
