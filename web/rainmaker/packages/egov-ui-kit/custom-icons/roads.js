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

var Roads = function Roads(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ viewBox: "0 0 24 24", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M14.1428571,18 L9.96428571,18 L10.17,14.25 L7.83,14.25 L8.03571429,18 L3.85714286,18 L0,0 L7.07142857,0 L7.35428571,5.25 L10.6457143,5.25 L10.9285714,0 L18,0 L14.1428571,18 Z M7.47,7.5 L7.71428571,12 L10.2857143,12 L10.53,7.5 L7.47,7.5 Z",
      id: "path-1"
    })
  );
};

exports.default = Roads;