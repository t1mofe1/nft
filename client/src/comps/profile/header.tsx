import React from "react";

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';


import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import WebIcon from '@mui/icons-material/Web';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';

import  ProfileAddress from "./address";

import {IProfile} from "../../models/profile"

interface IProfileHeaderProps {
    profile : IProfile

}
const ProfileHeader = ({profile}:IProfileHeaderProps) => {

    const buttons = [
        <Tooltip 
            title="Webpage" placement="bottom" arrow
            PopperProps={{
                disablePortal: true,
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 200 }}
        >    
            <Button ><WebIcon  /></Button>
        </Tooltip>,
        <Tooltip 
            title="Share profile" placement="bottom" arrow
            PopperProps={{
                disablePortal: true,
            }}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 200 }}
        >    
            <Button ><ShareIcon /></Button>
        </Tooltip>
      ];
    return (
        <Box>
            <Box component="img" src={profile.cover} sx={{width:'100%', height:'200px', objectFit: 'cover', display:'flex',flexDirection:'column'}}/>
            <Container>
                <Toolbar 
                    // sx={{display: 'flex', flexDirection: {xs:'columns', md:'row'}}}
                    >
                        <Avatar alt={profile.nickname} 
                            style={{
                                width: 200, height: 200,
                                border: '5px solid #fff',
                                marginTop: -100
                            }} 
                            src={profile.avatar}/>
                        <Typography sx={{mx:2,  fontSize: 25, textTransform: 'capitalize'}} variant="h4" >{profile.nickname}</Typography>
                        <Box sx={{mx:1, display: 'flex',  flexGrow: 1 , justifyContent: 'flex-end'}}>
                            {buttons}
                        </Box>  
                </Toolbar>
                <Grid container spacing={2} sx={{ justifyContent:'center', mt:2}}>
                    {
                        profile.addresses.map((address) => (
                            <Grid item xs={4} md={3} lg={2} sx={{mb:1}}>
                                <ProfileAddress address={address}/>
                            </Grid>
                            ))
                    }
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent:'center', mt:2}}>
                  <Grid item xs={12} md={10} lg={8} sx={{mb:1}}>
                    <Typography sx={{mt:2,px : {xs : 2}}} variant="body1" gutterBottom component="p">
                        {profile.description}
                    </Typography> 
                  </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
export default ProfileHeader;