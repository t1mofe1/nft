import { createTheme } from "@mui/material/styles";
import { green, grey, red } from "@mui/material/colors";

const rawTheme = createTheme({
  palette: {
    primary: {
      main: "#272727",
    },
    secondary: {
      main: "#ff3366",
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
    body1: {
      color: "#637381",
    },
    body2: {
      color: "#637381",
    },
  },
});

const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...rawTheme.typography,
    fontHeader,
    h1: {
      ...rawTheme.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
    },
    h2: {
      ...rawTheme.typography.h2,
      ...fontHeader,
    },
    h3: {
      ...rawTheme.typography.h3,
      ...fontHeader,
    },
    h4: {
      ...rawTheme.typography.h4,
      ...fontHeader,
    },
    h5: {
      ...rawTheme.typography.h5,
      ...fontHeader,
    },
    h6: {
      ...rawTheme.typography.h6,
      ...fontHeader,
      fontSize: "1.25em",
    },
    subtitle1: {
      ...rawTheme.typography.subtitle1,
    },
    body1: {
      ...rawTheme.typography.body1,
      fontWeight: rawTheme.typography.fontWeightRegular,
    },
    body2: {
      ...rawTheme.typography.body2,
    },
  },
};

export default theme;
