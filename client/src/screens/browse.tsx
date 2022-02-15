
import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import  NFTCard from "../comps/nft-card";

import {INft} from '../models/nft';

interface IBrowseScreenProps {
  nftItems : Array<INft>
};
export const BrowseScreen  = ({nftItems}:IBrowseScreenProps) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return  (
          <Box>
            <Grid container spacing={2} sx={{ justifyContent:'center', my:5}}>
                <Grid item xs={12} md={10} lg={3}>
                  <Typography variant="h4"  sx={{ textTransform:'capitalize', textAlign:'center'}} gutterBottom component="p">
                      Browse collections
                  </Typography>
                </Grid>
            </Grid>
            <TabContext value={value} >
              <TabList value={value} sx={{mb:{xs:0,md:4}}} onChange={handleChange} aria-label="icon tabs example" centered>
                <Tab label="New"  value="1" />
                <Tab label="Trending" value="2" />
                <Tab label="On sale"  value="3" />
                <Tab label="Animated"  value="4" />
                <Tab label="Polymorphous"  value="5" />
              </TabList>
              <TabPanel value="1" >
                <Grid container spacing={2}>
                    {
                      nftItems.filter((item)=> item.status === 'new').map((nft) => (
                        <Grid item xs={12} md={3} sx={{mb:1}}>
                          <NFTCard nft={nft} showStatus={false}/>
                        </Grid>
                      ))
                    }
                  </Grid> 
              </TabPanel>
              <TabPanel value="2" >
                <Grid container spacing={2}>
                    {
                      nftItems.filter((item)=> item.status === 'trending').map((nft) => (
                        <Grid item xs={12} md={3} sx={{mb:1}}>
                          <NFTCard nft={nft} showStatus={false}/>
                        </Grid>
                      ))
                    }
                </Grid>
              </TabPanel>
              <TabPanel value="3" >
                <Grid container spacing={2}>
                    {
                      nftItems.filter((item)=> item.status === 'sale').map((nft) => (
                        <Grid item xs={12} md={3} sx={{mb:1}}>
                          <NFTCard nft={nft} showStatus={false}/>
                        </Grid>
                      ))
                    }
                </Grid>
              </TabPanel>
              <TabPanel value="4" >
                <Grid container spacing={2}>
                    {
                      nftItems.filter((item)=> item.category === 'animated').map((nft) => (
                        <Grid item xs={12} md={3} sx={{mb:1}}>
                          <NFTCard nft={nft}/>
                        </Grid>
                      ))
                    }
                </Grid>
              </TabPanel>
              <TabPanel value="5" >
                <Grid container spacing={2}>
                    {
                      nftItems.filter((item)=> item.category === 'polymorphous').map((nft) => (
                        <Grid item xs={12} md={3} sx={{mb:1}}>
                          <NFTCard nft={nft}/>
                        </Grid>
                      ))
                    }
                </Grid>
              </TabPanel>
            </TabContext>
          </Box>
  )
};