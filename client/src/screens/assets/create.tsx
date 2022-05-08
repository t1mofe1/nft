import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import {
  Button,
  MenuItem,
  Container,
  TextField,
  FormControl,
  Icon,
  Typography,
  Paper,
  FormHelperText,
  Stack,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import { AppCtx } from "../../app";
import { useState } from "../../helpers/state";
import { useAuth } from "../../comps/auth-context";
import { SignInScreen } from "../sign-in";

const defaultAssetCodes: Array<{ name: string; value: string }> = [
  {
    name: "P5",
    value: `
    function setup() {
      createCanvas(400, 400);
    }
    
    function draw() {
      background(220);
    }`,
  },
  {
    name: "none",
    value: `var now = new Date();
        var ctx = document.getElementById('canvas').getContext('2d');`,
  },
];

export const CreateAssetScreen = () => {
  const { isLogged } = useAuth();
  const theme = useTheme();

  const dataContext = React.useContext(AppCtx);

  const {
    state: { name, description, category, library, files },
    updateState,
  } = useState({
    name: "",
    description: "",
    category: "",
    library: "",
    code: "",
    files: [],
  });
  const [isNameEmpty, setNameEmpty] = React.useState(false);
  if (!isLogged) return <SignInScreen referer={"/assets/create"} />;
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <FormControl fullWidth margin="dense">
        <TextField
          fullWidth
          select
          variant="outlined"
          value={library}
          onChange={(e) => {
            const newLibrary = e.target.value;
            if (library !== newLibrary) {
              updateState({
                library: newLibrary,
                code: defaultAssetCodes.filter((x) => x.name === newLibrary)[0]
                  .value,
              });
            }
          }}
          label="Library"
        >
          <MenuItem key={0} value="none">
            None
          </MenuItem>
          {dataContext?.nftFilterProps.libraries.map((library, i) => {
            return (
              <MenuItem key={i} value={library.name}>
                {library.name.charAt(0).toUpperCase() + library.name.slice(1)}
              </MenuItem>
            );
          })}
        </TextField>
        <FormHelperText>
          Select available library to render asset. Find out more{" "}
          <Link style={{ color: theme.palette.secondary.main }} to={"/"}>
            {" "}
            what libraries are supported.
          </Link>
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          required
          fullWidth
          value={name}
          variant="outlined"
          label="Name"
          error={isNameEmpty}
          onChange={(e) => {
            setNameEmpty(e.target.value === "");
            updateState({ name: e.target.value });
          }}
        />
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          select
          variant="outlined"
          value={category}
          onChange={(e) => updateState({ category: e.target.value })}
          fullWidth
          label="Category"
        >
          {dataContext?.nftFilterProps.categories.map((category, i) => {
            return (
              <MenuItem key={category.key} value={category.name}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <TextField
          fullWidth
          multiline
          value={description}
          minRows={5}
          onChange={(e) => {
            const description = e.target.value;

            updateState({
              description,
              code: defaultAssetCodes.find((x) => x.name === description)
                ?.value,
            });
          }}
          maxRows="Infinity"
          variant="outlined"
          label="Description"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Stack direction="column" alignItems="left" spacing={3}>
          <Box>
            <Typography variant="body1" component="h2">
              Upload the asset code
            </Typography>
            <Typography variant="caption" component="p" sx={{ mb: 4 }}>
              Please upload only *.js file that will contain the asset code. You
              can modify it anytime bofore you will actually release it to the
              blockchain of your choice. Find out more on
              <Link style={{ color: theme.palette.secondary.main }} to={"/"}>
                {" "}
                how to code assets.
              </Link>
            </Typography>
          </Box>
          <DropzoneArea  />
        </Stack>
      </FormControl>
      <FormControl sx={{ mt: 2, float: "right" }}>
        <Button color="secondary" variant="contained">
          Create
        </Button>
      </FormControl>
    </Container>
  );
};
