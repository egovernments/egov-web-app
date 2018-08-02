"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _YearDialogue = require("../../../YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlankAssessment = function BlankAssessment(_ref) {
  var noAssessmentMessage = _ref.noAssessmentMessage,
      button = _ref.button,
      dialogueOpen = _ref.dialogueOpen,
      closeDialogue = _ref.closeDialogue,
      onButtonClick = _ref.onButtonClick;

  return _react2.default.createElement(
    "div",
    { className: "no-assessment-message-cont" },
    _react2.default.createElement(_translationNode2.default, { label: noAssessmentMessage, dark: true, fontSize: "16px" }),
    button && _react2.default.createElement(_components.Button, {
      className: "assessment-button",
      primary: true,
      label: "New Property Assessment",
      style: {
        height: 36,
        lineHeight: "auto",
        minWidth: "inherit"
      },
      labelStyle: {
        padding: "0 12px 0 12px ",
        letterSpacing: "0.6px",
        display: "inline-block",
        height: "22px",
        lineHeight: "22px",
        fontSize: "14px"
      },
      onClick: onButtonClick
    }),
    _react2.default.createElement(_YearDialogue2.default, { open: dialogueOpen, closeDialogue: closeDialogue })
  );
};

exports.default = BlankAssessment;