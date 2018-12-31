"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titleStyle = {
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 500,
  padding: "28px 0 0 0",
  letterSpacing: 0.7,
  lineHeight: 1,
  color: "#484848"
};

var checkboxOptions = [{ value: "Services", label: "Services" }, { value: "Resolution Time", label: "Resolution Time" }, { value: "Quality of work", label: "Quality of work" }, { value: "Others", label: "Others" }];

var actions = [];
var FeedbackPopup = function FeedbackPopup(_ref) {
  var open = _ref.open,
      handleClose = _ref.handleClose,
      _ref$submitted = _ref.submitted,
      submitted = _ref$submitted === undefined ? false : _ref$submitted,
      onSubmit = _ref.onSubmit,
      selected = _ref.selected,
      onCheck = _ref.onCheck;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_components.Dialog, {
      title: "Rate your experience",
      titleStyle: titleStyle,
      open: open,
      actions: actions,
      children: !submitted ? [_react2.default.createElement(
        "div",
        { className: "feedback-ratings-cont", key: "feedback-ratings-cont" },
        _react2.default.createElement(_components.Ratings, { className: "feedback-ratings", size: 40, count: 5, half: false })
      ), _react2.default.createElement(
        "span",
        { className: "what-was-good", key: "feedback-subtext" },
        "What was good?"
      ), _react2.default.createElement(_components.Checkbox, {
        key: "feedback-checkboxGroup",
        labelStyle: { letterSpacing: "0.6px" },
        options: checkboxOptions,
        containerClassName: "feedback-checkbox-cont",
        selected: selected,
        onCheck: onCheck
      }), _react2.default.createElement(_components.TextArea, {
        key: "feedback-textarea",
        hintText: _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_COMMENTS_PLACEHOLDER" }),
        underlineShow: true,
        hintStyle: { letterSpacing: "0.7px" }
      }), _react2.default.createElement(
        "div",
        { key: "feedback-submit-button", className: "feedback-popup-button-cont" },
        _react2.default.createElement(_components.Button, { label: "CS_COMMON_SUBMIT", buttonLabel: true, primary: true, fullWidth: true, onClick: onSubmit })
      )] : [_react2.default.createElement(
        "div",
        { className: "feedback-submitted-icon-cont", key: "feedback-submitted-icon-cont" },
        _react2.default.createElement(
          _FloatingActionButton2.default,
          { className: "floating-button", style: { boxShadow: 0 }, backgroundColor: "#22b25f" },
          _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" })
        )
      ), _react2.default.createElement(_translationNode2.default, {
        key: "thankyou-text",
        label: "CS_FEEDBACK_SUCCESS",
        className: "feedback-thankyou-text",
        dark: true,
        bold: true,
        fontSize: "16px"
      })],
      handleClose: handleClose,
      bodyStyle: { padding: "0 12px 24px 12px", backgroundColor: "#ffffff" }
    })
  );
};

exports.default = FeedbackPopup;