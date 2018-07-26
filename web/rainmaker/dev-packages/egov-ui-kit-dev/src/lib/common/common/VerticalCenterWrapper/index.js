"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerticalCenterWrapper = function VerticalCenterWrapper(_ref) {
  var leftChildren = _ref.leftChildren,
      rightChildren = _ref.rightChildren,
      leftWrapperStyle = _ref.leftWrapperStyle,
      rightWrapperStyle = _ref.rightWrapperStyle;

  return _react2.default.createElement(
    "div",
    { className: "wrapper" },
    _react2.default.createElement(
      "div",
      { style: leftWrapperStyle, className: "left" },
      leftChildren
    ),
    _react2.default.createElement(
      "div",
      { style: rightWrapperStyle, className: "right" },
      rightChildren
    )
  );
};

exports.default = VerticalCenterWrapper;