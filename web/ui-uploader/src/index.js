import React from "react";
import ReactDOM from "react-dom";
import "./styles/bootstrap-grid.css";
import "./styles/app.css";
import App from "./app";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { grey300 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

let themeObject = {
  fontFamily: "Lato, sans",
  textColor: "rgba(0, 0, 0, 0.68)",
  backgroundcolor: "#F7F7F7",
  palette: {
    primary1Color: "#009688",
    primary2Color: "#f58720",
    textColor: "#5f5c62",
    canvasColor: "#F7F7F7",
    borderColor: grey300
  },
  raisedButton: {
    primaryColor: "#607D8B"
  },
  floatingActionButton: {
    color: "#f58720"
  }
};

const muiTheme = getMuiTheme(themeObject);
window.basename = process.env.NODE_ENV === "production" ? "/app/v2/uploader/" : "";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
    <Router basename={window.basename}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
