import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";
import { Typography, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { AppCtx } from "../../app";
import { INftCategory } from "../../models/nft";

const defaultStateChecked: Array<string> = [];

const NftFilter = () => {
  const dataContext = React.useContext(AppCtx);

  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      )
        return;
      setState(open);
    };
  const clearAll = () => {
    setCheckedCategories(defaultStateChecked);
    setCheckedBlockchains(defaultStateChecked);
    setCheckedLanguages(defaultStateChecked);
  };

  const [checkedCategories, setCheckedCategories] =
    React.useState(defaultStateChecked);
  const [checkedBlockchains, setCheckedBlockchains] =
    React.useState(defaultStateChecked);
  const [checkedLanguages, setCheckedLanguages] =
    React.useState(defaultStateChecked);

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    let categories: Array<string> = checkedCategories?.filter(
      (category) => category !== event.target.name
    );
    if (event.target.checked) categories.push(event.target.name);
    setCheckedCategories(categories);
    dataContext?.updateNftFilter({
      blockchains: checkedBlockchains,
      languages: checkedLanguages,
      categories: categories,
    });
  };

  const handleChangeBlockchain = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let blockchains: Array<string> = checkedBlockchains?.filter(
      (blockchain) => blockchain !== event.target.name
    );
    if (event.target.checked) blockchains.push(event.target.name);
    setCheckedBlockchains(blockchains);
    dataContext?.updateNftFilter({
      blockchains: blockchains,
      languages: checkedLanguages,
      categories: checkedCategories,
    });
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let languages: Array<string> = checkedLanguages?.filter(
      (language) => language !== event.target.name
    );
    if (event.target.checked) languages.push(event.target.name);
    setCheckedLanguages(languages);
    dataContext?.updateNftFilter({
      blockchains: checkedBlockchains,
      languages: languages,
      categories: checkedCategories,
    });
  };

  return (
    <div>
      <React.Fragment key="1">
        <Tooltip
          title="Filter"
          placement="top"
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 200 }}
        >
          <IconButton
            aria-label="filter"
            onClick={toggleDrawer(true)}
            color="primary"
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          <Box sx={{ width: { sx: "100%", md: 350 } }} role="presentation">
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid item xs={12} alignItems="center">
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    py: 1,
                    px: 2,
                  }}
                >
                  <Typography sx={{ marginTop: "5px;" }} variant="subtitle1">
                    Filters
                  </Typography>
                  <IconButton
                    aria-label="filter"
                    sx={{ display: "inline-flex" }}
                    color="primary"
                    onClick={toggleDrawer(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Grid>
              <Grid item xs={12} sx={{ ml: 3 }}>
                <Typography
                  sx={{ marginTop: "5px;", fontSize: "0.9em" }}
                  variant="h6"
                  gutterBottom
                >
                  Categories
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {dataContext?.nftFilterProps.categories.map((category, i) => (
                    <FormControlLabel
                      sx={{ textTransform: "capitalize" }}
                      label={category.name}
                      name={category.uri}
                      control={
                        <Checkbox
                          size="small"
                          checked={
                            checkedCategories?.indexOf(category.uri) !== -1
                          }
                          onChange={(event) => handleChangeCategory(event)}
                        />
                      }
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ ml: 3 }}>
                <Typography
                  sx={{ marginTop: "5px;", fontSize: "0.9em" }}
                  variant="h6"
                  gutterBottom
                >
                  Blockchain
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {dataContext?.nftFilterProps.blockchains.map(
                    (blockchain, i) => (
                      <FormControlLabel
                        sx={{ textTransform: "capitalize" }}
                        label={blockchain.name}
                        name={blockchain.name}
                        control={
                          <Checkbox
                            size="small"
                            checked={
                              checkedBlockchains?.indexOf(blockchain.name) !==
                              -1
                            }
                            onChange={(event) => handleChangeBlockchain(event)}
                          />
                        }
                      />
                    )
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ ml: 3 }}>
                <Typography
                  sx={{ marginTop: "5px;", fontSize: "0.9em" }}
                  variant="h6"
                  gutterBottom
                >
                  Programming Languages
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {dataContext?.nftFilterProps.languages.map((language, i) => (
                    <FormControlLabel
                      sx={{ textTransform: "capitalize" }}
                      label={language.name}
                      name={language.name}
                      control={
                        <Checkbox
                          size="small"
                          checked={
                            checkedLanguages?.indexOf(language.name) !== -1
                          }
                          onChange={(event) => handleChangeLanguage(event)}
                        />
                      }
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                onClick={clearAll}
                startIcon={<FilterListOffIcon />}
                fullWidth
                size="large"
              >
                Clear all
              </Button>
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default NftFilter;
