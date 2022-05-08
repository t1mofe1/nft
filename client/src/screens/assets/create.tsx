import React from "react";
import {
  Button,
  MenuItem,
  Container,
  Box,
  TextField,
  FormControl,
  Typography,
  FormHelperText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { AppCtx } from "../../app";
import { useState } from "../../helpers/state";
import { useAuth } from "../../comps/auth-context";
import { SignInScreen } from "../sign-in";
import DropZoneMui from "../../comps/drop-zone-native";

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
      <FormControl fullWidth margin="normal">
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
        <DropZoneMui text="Drag & drop asset code, or click to select file" />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          select
          variant="outlined"
          value={library}
          onChange={(e) => {
            updateState({
              library: e.target.value,
            });
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
          Select available library, used to render asset code. If you are not
          decided what library, you can always select it later. Find out more{" "}
          <Link style={{ color: theme.palette.secondary.main }} to={"/"}>
            {" "}
            what libraries are supported.
          </Link>
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth margin="normal">
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
      <FormControl fullWidth margin="normal">
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
      <FormControl fullWidth margin="normal">
        <TextField
          fullWidth
          multiline
          value={description}
          minRows={5}
          onChange={(e) => {
            const description = e.target.value;
            updateState({
              description,
            });
          }}
          maxRows="Infinity"
          variant="outlined"
          label="Description"
        />
      </FormControl>

      <FormControl sx={{ mt: 2, float: "right" }}>
        <Button color="secondary" variant="contained">
          Create
        </Button>
      </FormControl>
    </Container>
  );
};
