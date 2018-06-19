"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionFooter = function ActionFooter(_ref) {
  var label1 = _ref.label1,
      label2 = _ref.label2,
      primaryAction = _ref.primaryAction,
      secondaryAction = _ref.secondaryAction;

  return _react2.default.createElement(
    "div",
    { className: "wizard-footer col-xs-12", style: { textAlign: "right", padding: 0 } },
    _react2.default.createElement(
      "div",
      { className: "col-xs-6", style: { float: "right", padding: 0 } },
      label1 && _react2.default.createElement(_components.Button, {
        label: label1,
        labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
        buttonStyle: { border: "1px solid #fe7a51" },
        style: { marginRight: 45, width: "36%" },
        onClick: secondaryAction
      }),
      _react2.default.createElement(_components.Button, {
        label: label2,
        style: { width: "36%" },
        backgroundColor: "#fe7a51",
        labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
        buttonStyle: { border: 0 },
        onClick: primaryAction
      })
    )
  );
};

exports.default = ActionFooter;