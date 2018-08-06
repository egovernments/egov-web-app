"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require("material-ui/SvgIcon");

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OpenComplaints = function OpenComplaints(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 100 125", className: "custom-icon" }, props),
    _react2.default.createElement("path", { d: "M88.069,18.513H68.562c-2.364,0-4.511,1.379-5.495,3.529l-0.994,2.173H26.645c-3.117,0-5.754,2.303-6.173,5.391  l-0.505,3.718h-8.036c-2.915,0-5.16,2.571-4.768,5.459l6.019,42.704h71.599h0l8.055-57.516  C93.229,21.084,90.984,18.513,88.069,18.513z M86.45,35.178l-4.154,28.656l-3.71-26.346c-0.324-2.385-2.361-4.163-4.768-4.163  H25.452c0.539-1.668,2.098-2.843,3.903-2.843h53.031C84.888,30.482,86.809,32.701,86.45,35.178z" })
  );
};

exports.default = OpenComplaints;