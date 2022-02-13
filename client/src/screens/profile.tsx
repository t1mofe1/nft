import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import  NFTCard from "../comps/nft-card";
import  ProfileHeader from "../comps/profile/header";

import FavoriteIcon from '@mui/icons-material/Favorite';

import Paper from "@mui/material/Paper";
import AppsIcon from "@mui/icons-material/Apps";


import BarChartIcon from "@mui/icons-material/BarChart";
import { IProfile } from "../models/profile";

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
export const ProfileScreen = (profile: IProfile) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
        <Box>
          <ProfileHeader  {...profile} />
          <TabContext value={value} >
            <TabList value={value} sx={{mb:{xs:0,md:4}}} onChange={handleChange} aria-label="icon tabs example" centered>
              <Tab icon={<AppsIcon color="primary"/>}  label="Collection" iconPosition="start" value="1" aria-label="phone" />
              <Tab icon={<FavoriteIcon color="error" />}  label="Favourite" iconPosition="start" value="2" aria-label="phone" />
              <Tab icon={<BarChartIcon color="info" />} label="Data" iconPosition="start"  value="3" aria-label="person" />
            </TabList>
            <TabPanel value="1" >
              <Grid container spacing={2}>
                {
                  profile.collection.map((nft) => (
                    <Grid item xs={12} md={3} sx={{mb:1}}>
                      <NFTCard {...nft}/>
                    </Grid>
                  ))
                }
              </Grid>
            </TabPanel>
            <TabPanel value="2" >
              <Grid container spacing={2}>
                {
                  profile.favourite.map((nft) => (
                    <Grid item xs={12} md={3} sx={{mb:1}}>
                      <NFTCard {...nft}/>
                    </Grid>
                  ))
                }
              </Grid>
            </TabPanel>
            <TabPanel value="3" >
              <DenseTable/>
            </TabPanel>
          </TabContext>
        </Box>
  );
};
