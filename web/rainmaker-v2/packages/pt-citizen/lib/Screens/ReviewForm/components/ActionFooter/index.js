"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionFooter = function ActionFooter() {
  return _react2.default.createElement(
    "div",
    { className: "wizard-footer col-xs-12", style: { textAlign: "right" } },
    _react2.default.createElement(
      "div",
      { className: "col-xs-6", style: { float: "right" } },
      _react2.default.createElement(_components.Button, {
        label: "GO BACK",
        labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
        buttonStyle: { border: "1px solid #fe7a51" },
        style: { marginRight: 45, width: "36%" }
      }),
      _react2.default.createElement(_components.Button, {
        label: "PAY",
        style: { width: "36%" },
        backgroundColor: "#fe7a51",
        labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
        buttonStyle: { border: 0 }
      })
    )
  );
};

exports.default = ActionFooter;