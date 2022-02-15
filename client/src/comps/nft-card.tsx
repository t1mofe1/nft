import React, {  useEffect } from "react";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import  Button from '@mui/material/Button';
import CardActionArea   from '@mui/material/CardActionArea';
import CardActions  from '@mui/material/CardActions';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import {INft} from '../models/nft';

interface INftCardComp {
  nft : INft;
  showStatus?: Boolean;
}



const NFTCard = ({nft, showStatus=true}:INftCardComp) => {

  const [cardHover, setCardHover] = React.useState(false);
  const [favourite, setFavourite] = React.useState(nft.favourite && nft.favourite.isFavourite === true);
  const [favouriteCount, setFavouriteCount] = React.useState(nft.favourite && nft.favourite.count ? nft.favourite.count : 0);


  const toggleFavourite = () => {
    setFavourite(!favourite);
    if (!favourite)
      setFavouriteCount(favouriteCount + 1)
    else
      setFavouriteCount(favouriteCount - 1)


  }
  const onMouseEnterHandler =  () => {
    setCardHover(true);
  }
  const onMouseLeaveHandler =  () => {
    setCardHover(false);
  }
    return (
      <Card 
        sx={{ maxWidth: '100%', borderRadius: 5,  mx: {xs:0,md:2}, mb: {xs:0,md:2}, marginTop: cardHover ? '-5px' : 0, transition: 'margin-top 0.3s' }} 
        elevation={cardHover ? 8 : 2} 
        onMouseEnter={onMouseEnterHandler} 
        onMouseLeave={onMouseLeaveHandler}
        >
        <CardActionArea>
          <Box sx={{ position: 'relative' }}>
               
            {
                showStatus && nft.status && (
                    <Chip style={{opacity: cardHover ? 0 : 1, transition: 'opacity 0.3s'}} sx={{position: 'absolute', top:'20px', right:'20px', borderRadius: 1, fontWeight:800, color: "#fff", }} label={nft.status.toUpperCase()} color={(nft.status === 'sale' && 'error') || (nft.status === 'new' && 'success') || 'info'} size="small"/>
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
            <Grid item xs={6}>
              {nft.name}
            </Grid>
            <Grid item xs={6}  sx={{
                display: { xs: 'none', md: 'flex' }, 
                flexGrow: 1 ,
                justifyContent: 'flex-end'
                }}>
               <Tooltip 
                  title={nft.blockchain.name} placement="top" arrow
                  PopperProps={{
                      disablePortal: true,
                  }}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 200 }}
                  >    
                <Box component="img"  src={nft.blockchain.logo} sx={{width:'16px', height:'16px', mr:1, marginTop:'6px'}}/>
              </Tooltip>
              <Box  
                component="span"
                >
                  {
                    nft.status === 'sale' && (
                      <Typography variant="subtitle1">
                        <Typography
                            component="span"
                            variant="body1"
                            sx={{
                              color: 'text.disabled',
                              textDecoration: 'line-through'
                            }}
                          >
                            {nft.price}
                        </Typography>
                        &nbsp;
                        { nft.priceSale}
                      </Typography>
                    )
                  }
                  { 
                    nft.status !== 'sale' && (
                        <Typography variant="subtitle1">
                          {nft.price}
                        </Typography>
                    )
                  }
                  
              </Box>
            </Grid>
          </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button sx={{marginTop:'-6px'}} size="small" color="primary">
            Buy
          </Button>
          <Box component="div" aria-label="Favourite" sx={{display: 'flex', flexGrow:1, justifyContent: 'flex-end'}}> 
            <Typography component="div" sx={{float:'left', marginRight:'3px'}}>
              {favouriteCount }
            </Typography>
            <IconButton sx={{marginTop:'-10px;'}} onClick={toggleFavourite}>
              {favourite ?  <FavoriteIcon sx={{color: "#f00"}}/> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    );
  }
  
  
export default NFTCard;