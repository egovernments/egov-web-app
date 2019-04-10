"use strict";

require("babel-polyfill");

require("url-search-params-polyfill");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require("react-router-dom");

var _styles = require("@material-ui/core/styles");

var _themes = require("ui-config/themes");

var _themes2 = _interopRequireDefault(_themes);

var _reactRedux = require("react-redux");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

require("./index.css");

var _App = require("ui-views/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import registerServiceWorker from "./registerServiceWorker";

var theme = (0, _styles.createMuiTheme)(_themes2.default);

// move it to a env file
// support for older browsers
window.basename = process.env.NODE_ENV === "production" ? "/employee-tradelicence" : "";
// hardcoded the base; to be changed soon!!!!!

_reactDom2.default.render(_react2.default.createElement(
  _styles.MuiThemeProvider,
  { theme: theme },
  _react2.default.createElement(
    _reactRedux.Provider,
    { store: _store2.default },
    _react2.default.createElement(
      _reactRouterDom.BrowserRouter,
      { basename: window.basename },
      _react2.default.createElement(_App2.default, null)
    )
  )
), document.getElementById("root"));
// registerServiceWorker();