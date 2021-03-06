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

var LocationPin = function LocationPin(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M256 260.5477c-6.3665 0-12.2777-.9097-17.735-2.2738l8.6398 120.5065c.4554 5.002 4.0933 9.0947 9.0953 9.0947s8.6398-4.0927 9.0947-9.0947l8.6399-120.5065c-5.4563 1.364-11.368 2.2738-17.7346 2.2738",
      fill: "#d8d8d8"
    }),
    _react2.default.createElement("path", {
      d: "M324.2114 192.3364c0-37.7436-30.4678-68.2114-68.2113-68.2114s-68.2114 30.4678-68.2114 68.2114 30.4678 68.2113 68.2114 68.2113 68.2113-30.4678 68.2113-68.2113",
      fill: "#dd342e"
    }),
    _react2.default.createElement("path", {
      d: "M205.9787 196.8835c-2.7287 0-4.5476-1.819-4.5476-4.5477 0-30.0129 24.556-54.569 54.569-54.569 2.7287 0 4.5476 1.819 4.5476 4.5477s-1.819 4.5476-4.5476 4.5476c-25.011 0-45.4743 20.4633-45.4743 45.4743 0 2.7281-1.819 4.547-4.547 4.547",
      fill: "#f86363"
    })
  );
};

exports.default = LocationPin;