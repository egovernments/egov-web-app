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
    (0, _extends3.default)({ viewBox: "0 0 100 125", className: "custom-icon" }, props),
    _react2.default.createElement("path", {
      d: "M4.32,86h36l1.57-20.51H58.11L59.68,86h36a3.32,3.32,0,0,0,3.07-4.56l-25.87-64A5.66,5.66,0,0,0,67.64,14H54.15l1,13.67H44.8l1-13.67H32.36a5.66,5.66,0,0,0-5.24,3.54l-25.87,64A3.32,3.32,0,0,0,4.32,86Zm39.84-50.1H55.84l1.49,19.41H42.67Z",
      id: "path-1"
    })
  );
};

exports.default = Roads;