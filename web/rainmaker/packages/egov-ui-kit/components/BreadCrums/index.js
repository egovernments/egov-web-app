"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadCrums = function BreadCrums() {
  return _react2.default.createElement(
    "div",
    { className: "rainmaker-displayInline" },
    _react2.default.createElement(_Icon2.default, { action: "action", name: "home", color: "#fe7a51" }),
    _react2.default.createElement(
      "div",
      { style: { marginLeft: 10, marginTop: 3 } },
      "\u276F"
    )
  );
};

exports.default = BreadCrums;