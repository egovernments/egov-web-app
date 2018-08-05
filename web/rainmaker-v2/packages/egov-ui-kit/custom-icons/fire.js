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

var FireIcon = function FireIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ className: "custom-icon", viewBox: "-8 0 24 24" }, props),
    _react2.default.createElement("path", {
      d: "M5.13482114,22 C-0.84229456,19.0568562 -1.77846931,13.8327759 3.26247164,7.21070234 C3.33448508,8.97658863 3.47851197,10.6688963 4.48670016,11.6254181 C4.19864639,10.0802676 2.97441787,4.63545151 9.59965455,0 C7.58327817,9.63879599 21.9139532,12.361204 10.6078427,21.8528428 C13.6324073,15.5986622 8.51945292,15.819398 8.37542604,10.006689 C6.07099589,12.2876254 5.85495556,14.6421405 6.71911687,17.3645485 C5.78294212,16.9966555 4.84676737,16.0401338 4.27065983,14.7892977 C3.26247164,17.4381271 4.19864639,20.1605351 5.13482114,22 Z",
      id: "path-1"
    }),
    ";"
  );
};

exports.default = FireIcon;