import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import cyan from "@material-ui/core/colors/cyan";
import indigo from "@material-ui/core/colors/indigo";
const theme = createMuiTheme({
    palette: {
        primary: cyan,
        secondary: indigo
    }
});
  
ReactDOM.render(
    <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ThemeProvider>
    </StyledThemeProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
