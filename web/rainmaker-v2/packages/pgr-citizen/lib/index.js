"use strict";

require("babel-polyfill");

require("url-search-params-polyfill");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

var _store = require("./redux/store");

var _store2 = _interopRequireDefault(_store);

var _theme = require("./config/theme");

var _theme2 = _interopRequireDefault(_theme);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _webfontloader = require("webfontloader");

var _webfontloader2 = _interopRequireDefault(_webfontloader);

require("egov-ui-kit/assets/styles/bootstrap-customized.css");

require("egov-ui-kit/assets/styles/app.css");

var _getMuiTheme = require("material-ui/styles/getMuiTheme");

var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// styles
var muiTheme = (0, _getMuiTheme2.default)(_theme2.default);

// to eliminate the click delay

//Web font loader

// sms listener
// import "./webview/sms";

// support for older browsers
(0, _reactTapEventPlugin2.default)();

// load material icons
_webfontloader2.default.load({
  google: {
    families: ["Material+Icons", "Roboto"]
  }
});

// move it to a env file
window.basename = process.env.NODE_ENV === "production" ? "/citizen" : "";
// hardcoded the base; to be changed soon!!!!!
(0, _reactDom.render)(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(
    _MuiThemeProvider2.default,
    { muiTheme: muiTheme },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      { basename: window.basename },
      _react2.default.createElement(_App2.default, null)
    )
  )
), document.getElementById("root"));