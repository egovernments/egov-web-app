"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DividerUi = function DividerUi(_ref) {
  var inset = _ref.inset,
      lineStyle = _ref.lineStyle;

  return _react2.default.createElement(_Divider2.default, { inset: inset, style: lineStyle });
};

exports.default = DividerUi;


DividerUi.propTypes = {
  inset: _propTypes2.default.bool,
  style: _propTypes2.default.object
};