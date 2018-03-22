import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./router";
import store from "./store";
import theme from "./config/theme";
import injectTapEventPlugin from "react-tap-event-plugin";
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

// for hosting in subdirectories
const urlParts = window.location.pathname.split("/").filter((part) => part.length);
const basename = "/" + urlParts.slice(0, urlParts.length).join("/");

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router basename={process.env.NODE_ENV === "production" ? basename : ""}>
        <Main />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
