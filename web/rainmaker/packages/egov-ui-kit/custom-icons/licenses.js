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

var LicenceIcon = function LicenceIcon(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    (0, _extends3.default)({ className: "custom-icon", viewBox: "0 0 24 24" }, props),
    _react2.default.createElement("path", {
      d: "M8,13 L8,12 L1.01,12 L1,16 C1,17.11 1.89,18 3,18 L17,18 C18.11,18 19,17.11 19,16 L19,12 L12,12 L12,13 L8,13 Z M18,4 L13.99,4 L13.99,2 L11.99,0 L7.99,0 L5.99,2 L5.99,4 L2,4 C0.9,4 0,4.9 0,6 L0,9 C0,10.11 0.89,11 2,11 L8,11 L8,9 L12,9 L12,11 L18,11 C19.1,11 20,10.1 20,9 L20,6 C20,4.9 19.1,4 18,4 Z M12,4 L8,4 L8,2 L12,2 L12,4 Z",
      id: "path-1"
    })
  );
};

exports.default = LicenceIcon;