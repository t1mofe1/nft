import "./index.css";

import App from "./app";
import React from "react";
import Theme from "./theme";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./comps/auth-context";
import { AppContextProvider } from "./comps/app-context";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
