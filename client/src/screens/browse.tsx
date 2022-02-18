
import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import  NFTCard from "../comps/nft-card";
import NftFilter from "../comps/browse/nft-filter";
import { AppCtx } from "../app";



export const BrowseScreen  = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const dataContext = React.useContext(AppCtx); 

  return  (
        <Box>
          <Grid container spacing={2} sx={{ justifyContent:'center', my:5}}>
              <Grid item xs={12} md={10} lg={3}>
                <Typography variant="h4"  sx={{ textTransform:'capitalize', textAlign:'center'}} gutterBottom component="p">
                    Browse collections
                </Typography>
              </Grid>
          </Grid>
            <TabContext value={value}>
              <Grid 
                container 
                spacing={2} 
                direction="row"
                justifyContent="center"
                >
                <Grid item  xs={12} md={10} lg={1} sx={{textAlign:'right',marginTop:{xs:'0px', lg:'3px'}}}>
                  <NftFilter/>
                </Grid>
                <Grid item xs={12} md={10} lg={6}>
                  <TabList value={value} sx={{mb:{xs:2,md:4}}} onChange={handleChange} aria-label="icon tabs example">
                    <Tab label="New"  value="1" />
                    <Tab label="Trending" value="2" />
                    <Tab label="On sale"  value="3" />
                    <Tab label="Animated"  value="4" />
                    <Tab label="Polymorphous"  value="5" />
                  </TabList>
                </Grid>
              </Grid>
              <TabPanel value="1" >
              <Grid container spacing={2}>
                  {
                    dataContext?.nftItems.filter((item)=> item.status === 'new').map((nft) => (
                      <Grid key={'nft-new-'+nft.key} item xs={12} md={4} xl={3}  sx={{mb:1}}>
                        <NFTCard nft={nft} showStatus={false} updateNftItems={dataContext?.updateNftItems}/>
                      </Grid>
                    ))
                  }
                </Grid> 
            </TabPanel>
            <TabPanel value="2" >
              <Grid container spacing={2}>
                  {
                   dataContext?.nftItems.filter((item)=> item.status === 'trending').map((nft) => (
                      <Grid key={'nft-trending-'+nft.key} item xs={12} md={4} xl={3}  sx={{mb:1}}>
                        <NFTCard nft={nft} showStatus={false}  updateNftItems={dataContext?.updateNftItems}/>
                      </Grid>
                    ))
                  }
              </Grid>
            </TabPanel>
            <TabPanel value="3" >
              <Grid container spacing={2}>
                  {
                    dataContext?.nftItems.filter((item)=> item.status === 'sale').map((nft) => (
                      <Grid key={'nft-sale-'+nft.key} item xs={12} md={4} xl={3}  sx={{mb:1}}>
                        <NFTCard nft={nft} showStatus={false} updateNftItems={dataContext?.updateNftItems}/>
                      </Grid>
                    ))
                  }
              </Grid>
            </TabPanel>
            <TabPanel value="4" >
              <Grid container spacing={2}>
                  {
                    dataContext?.nftItems.filter((item)=> item.category === 'animated').map((nft) => (
                      <Grid key={'nft-animated-'+nft.key} item xs={12} md={4} xl={3}  sx={{mb:1}}>
                        <NFTCard nft={nft} updateNftItems={dataContext?.updateNftItems}/>
                      </Grid>
                    ))
                  }
              </Grid>
            </TabPanel>
            <TabPanel value="5" >
              <Grid container spacing={2}>
                  {
                    dataContext?.nftItems.filter((item)=> item.category === 'polymorphous').map((nft) => (
                      <Grid key={'nft-polymorphous-'+nft.key} item xs={12} md={4} xl={3} sx={{mb:1}}>
                        <NFTCard nft={nft} updateNftItems={dataContext?.updateNftItems}/>
                      </Grid>
                    ))
                  }
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
  )
};