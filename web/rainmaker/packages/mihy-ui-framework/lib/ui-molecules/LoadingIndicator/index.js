"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CircularProgress = require("@material-ui/core/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  container: {
    height: "100%",
    width: "100%",
    position: "fixed",
    backgroundColor: "rgba(189,189,189,0.5)",
    zIndex: 9998,
    left: 0,
    top: 0
  },
  containerHide: {
    display: "none",
    position: "relative"
  },
  refresh: {
    display: "block",
    position: "absolute",
    zIndex: 9999,
    margin: "auto",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transform: "none",
    color: "#FF9800"
  }
};

var LoadingIndicator = function LoadingIndicator(_ref) {
  var _ref$status = _ref.status,
      status = _ref$status === undefined ? "loading" : _ref$status,
      loadingColor = _ref.loadingColor;

  return _react2.default.createElement(
    "div",
    { id: "loading-indicator", style: status === "hide" ? style.containerHide : style.container },
    _react2.default.createElement(_CircularProgress2.default, { style: style.refresh, size: 50 })
  );
};

LoadingIndicator.propTypes = {
  status: _propTypes2.default.string,
  loadingColor: _propTypes2.default.string,
  style: _propTypes2.default.object
};

exports.default = LoadingIndicator;