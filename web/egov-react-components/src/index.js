import React from "react";
import { render } from "react-dom";
import theme from "./config/theme";
import injectTapEventPlugin from "react-tap-event-plugin";
import App from "./App";
//Web font loader
import WebFont from "webfontloader";
// styles
import "./styles/bootstrap-customized.css";
import "./styles/app.css";

import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const muiTheme = getMuiTheme(theme);

// to eliminate the click delay
injectTapEventPlugin();

// load material icons
WebFont.load({
  google: {
    families: ["Material+Icons", "Roboto"],
  },
});


render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <App/>
    </MuiThemeProvider>,
  document.getElementById("root")
);
