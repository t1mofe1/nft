import React from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
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

import Paper from '@mui/material/Paper';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';


import  NFTCard from "../modules/components/NFTCard";

import {Profile} from "../modules/types/profile.types"

import BarChartIcon from '@mui/icons-material/BarChart';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import Avatar from '@mui/material/Avatar';






//data
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
}
export const ProfileScreen = (profile:Profile) => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleChipClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
        <Box>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '10vh', marginTop:'25px' }}
          >
            <Grid item xs={3}>
              <Avatar alt={profile.nickname}  sx={{ width: 74, height: 74 }} src={profile.avatar}/>
            </Grid>
           
          </Grid> 
          <Grid container  
             direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            style={{ minHeight: '10vh', marginTop:'25px' }}
            >
            <Grid item xs={12} md={6}>
                <Chip icon={<AlternateEmailIcon />} label={profile.address.substr(0,4) + ' ... ' + profile.address.substr(-4)} sx={{px:1}} onClick={handleChipClick} />
            </Grid>
          </Grid>
          <Grid container  
             direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0}
            style={{ minHeight: '10vh' }}
            >
            <Grid item xs={12} md={6}>
                <Typography sx={{mt:2}} variant="body2" gutterBottom component="p">
                  {profile.description}
                </Typography> 
              </Grid>
          </Grid>
          <TabContext value={value}>
            <TabList value={value} onChange={handleChange} aria-label="icon tabs example" centered>
              <Tab icon={<AppsIcon />} label="Items" iconPosition="start" value="1" aria-label="phone" />
              <Tab icon={<BarChartIcon />} label="Data" iconPosition="start"  value="2" aria-label="person" />
            </TabList>
            <TabPanel value="1" >
              <Grid container spacing={2}>
                {
                  profile.collection.map((nft) => (
                    <Grid item xs={8} md={3} sx={{mb:1}}>
                      <NFTCard {...nft}/>
                    </Grid>
                  ))
                }
              </Grid>
            </TabPanel>
            <TabPanel value="2" >
              <DenseTable/>
            </TabPanel>
          </TabContext>
        </Box>
  );
};