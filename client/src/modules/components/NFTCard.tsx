import React from "react";
import {Grid, Box, Chip} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {NFT} from '../types/nft.types';

const NFTCard = (nft:NFT) => {
    return (
      <Card sx={{ maxWidth: 400, }}>
        <CardActionArea>
          <Box sx={{ position: 'relative' }}>
              {
                nft.status && (
                    <Chip sx={{position: 'absolute', top:'10px', right:'10px'}} label={nft.status.toUpperCase()} color={(nft.status === 'sale' && 'error') || 'success'} size="small"/>
                )
            }
            <CardMedia
              component="img"
              height="300"
              image={nft.cover}
              alt="green iguana"
            />
          </Box>
          <CardContent>
          <Grid container>
            <Grid xs={6}>
              {nft.name}
            </Grid>
            <Grid xs={6}  sx={{
                display: { xs: 'none', md: 'flex' }, 
                flexGrow: 1 ,
                justifyContent: 'flex-end'
                }}>
              <Box component="img" src={nft.blockchain.logo} sx={{width:'9px',mr:1}}/>
              <Box  
                component="span"
                >{nft.price}</Box>
            </Grid>
          </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Buy
          </Button>
        </CardActions>
      </Card>
    );
  }
  
  
export default NFTCard;