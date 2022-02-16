import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {Tooltip} from '@mui/material';
import Fade from '@mui/material/Fade';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid } from '@mui/material';
import { Typography, Divider, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { INftFilterProps } from '../../models/nft';




const NftFilter = ({blockchains, languages, categories}: INftFilterProps) => {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState(open);
    };

    const [checkedCategories, setCheckedCategories] = React.useState(Array(categories.length).fill(false));
    const [checkedBlockchains, setCheckedBlockchains] = React.useState(Array(blockchains.length).fill(false));
    const [checkedLanguages, setCheckedLanguages] = React.useState(Array(languages.length).fill(false));

    const handleChangeAllCategories = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedCategories(Array(categories.length).fill(event.target.checked));
      };
      const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>, i : number) => {
        setCheckedCategories(checkedCategories.map((category, j )=> j===i ? event.target.checked : category ));
      };

    const handleChangeAllBlockchains = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedBlockchains(Array(blockchains.length).fill(event.target.checked));
    };
    const handleChangeBlockchain = (event: React.ChangeEvent<HTMLInputElement>, i : number) => {
        setCheckedBlockchains(checkedBlockchains.map((blockchain, j )=> j===i ? event.target.checked : blockchain ));
    };

    const handleChangeAllLanguages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedLanguages(Array(languages.length).fill(event.target.checked));
    };
    const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>, i : number) => {
        setCheckedLanguages(checkedLanguages.map((language, j )=> j===i ? event.target.checked : language ));
    };
   

  return (
    <div>
        <React.Fragment key="1">
            <Tooltip 
                title="Filter" placement="top" arrow
                PopperProps={{
                    disablePortal: true,
                }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 200 }}
                >    
                <IconButton aria-label="filter" color="primary">
                    <FilterListIcon  onClick={toggleDrawer(true)}/>
                </IconButton>
            </Tooltip>
          <Drawer
            anchor="left"
            open={state}
            onClose={toggleDrawer(false)}
          >
            <Box
            sx={{ width: {sx:'100%', md:350} }}
            role="presentation"
            
            >
                <Grid container spacing={2} sx={{ justifyContent:'center'}}>
                    <Grid item xs={12}  alignItems="center">
                        <Box component="div"
                        sx={{display:'flex',flexDirection:'row',  justifyContent:'space-between',py:1, px:2}}>
                            <Typography sx={{marginTop:'5px;'}}  variant="subtitle1">Filters</Typography>
                            <IconButton aria-label="filter" sx={{display:'inline-flex'}} color="primary">
                                <CloseIcon  onClick={toggleDrawer(false)}/>
                            </IconButton>
                        </Box>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}  sx={{ml: 3}}>
                        <Typography sx={{marginTop:'5px;',fontSize:'0.9em'}}  variant="h6" gutterBottom>Categories</Typography>
                        <FormControlLabel
                            label="All"
                            control={
                            <Checkbox
                                size="small" 
                                checked={checkedCategories.filter((item)=>item === true).length === checkedCategories.length}
                                indeterminate={checkedCategories.filter((item)=>item === true).length > 0 &&  checkedCategories.filter((item)=>item === true).length < checkedCategories.length}
                                onChange={handleChangeAllCategories}
                            />
                            }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                categories.map((category, i)=> (
                                    <FormControlLabel 
                                        sx={{textTransform:'capitalize'}}
                                        label={category}
                                        control={<Checkbox size="small" checked={checkedCategories[i]} onChange={(event)=> handleChangeCategory(event, i)} />}
                                    />
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}  sx={{ml: 3}}>
                        <Typography sx={{marginTop:'5px;',fontSize:'0.9em'}}  variant="h6" gutterBottom>Blockchain</Typography>
                        <FormControlLabel
                            label="All"
                            control={
                            <Checkbox
                                size="small" 
                                checked={checkedBlockchains.filter((item)=>item === true).length === checkedBlockchains.length}
                                indeterminate={checkedBlockchains.filter((item)=>item === true).length > 0 &&  checkedBlockchains.filter((item)=>item === true).length < checkedBlockchains.length}
                                onChange={handleChangeAllBlockchains}
                            />
                            }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                blockchains.map((blockchain, i)=> (
                                    <FormControlLabel
                                        sx={{textTransform:'capitalize'}}
                                        label={blockchain.name}
                                        control={<Checkbox size="small" checked={checkedBlockchains[i]} onChange={(event)=> handleChangeBlockchain(event, i)} />}
                                    />
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12}  sx={{ml: 3}}>
                        <Typography sx={{marginTop:'5px;',fontSize:'0.9em'}}  variant="h6" gutterBottom>Programming Languages</Typography>
                        <FormControlLabel
                            label="All"
                            control={
                            <Checkbox
                                size="small" 
                                checked={checkedLanguages.filter((item)=>item === true).length === checkedLanguages.length}
                                indeterminate={checkedLanguages.filter((item)=>item === true).length > 0 &&  checkedLanguages.filter((item)=>item === true).length < checkedLanguages.length}
                                onChange={handleChangeAllLanguages}
                            />
                            }
                        />
                       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                languages.map((language, i)=> (
                                    <FormControlLabel
                                        sx={{textTransform:'capitalize'}}
                                        label={language.name}
                                        control={<Checkbox size="small" checked={checkedLanguages[i]} onChange={(event)=> handleChangeLanguage(event, i)} />}
                                    />
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{p:3}}>
                    <Button variant="outlined" startIcon={<FilterListOffIcon/>} fullWidth size="large">Clear all</Button>
                </Box>
            </Box>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
export default NftFilter;