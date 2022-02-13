import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import  Button from '@mui/material/Button';
import CardActionArea   from '@mui/material/CardActionArea';
import CardActions  from '@mui/material/CardActions';

import {INft} from '../models/nft';

const NFTCard = (nft:INft) => {
    return (
      <Card sx={{ maxWidth: '100%', borderRadius: 5,  mx: {xs:0,md:2}, mb: {xs:0,md:2}}} elevation={2} >
        <CardActionArea>
          <Box sx={{ position: 'relative' }}>
              {
                nft.status && (
                    <Chip sx={{position: 'absolute', top:'20px', right:'20px', borderRadius: 1, fontWeight:800, color: "#fff"}} label={nft.status.toUpperCase()} color={(nft.status === 'sale' && 'error') || (nft.status === 'new' && 'success') || 'info'} size="small"/>
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
               <Tooltip 
                  title={nft.blockchain.name} placement="top" arrow
                  PopperProps={{
                      disablePortal: true,
                  }}
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 200 }}
                  >    
                <Box component="img"  src={nft.blockchain.logo} sx={{width:'16px', height:'16px', mr:1, marginTop:'-1px'}}/>
              </Tooltip>
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