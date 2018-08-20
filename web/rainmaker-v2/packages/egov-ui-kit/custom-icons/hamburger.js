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

var Hamburger = function Hamburger(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ className: "custom-icon" }, props),
    _react2.default.createElement("path", { d: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" }),
    ";"
  );
};

exports.default = Hamburger;