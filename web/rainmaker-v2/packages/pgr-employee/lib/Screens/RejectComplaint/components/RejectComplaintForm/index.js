"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RejectComplaintForm = function RejectComplaintForm(_ref) {
  var form = _ref.form,
      options = _ref.options,
      onSubmit = _ref.onSubmit,
      ontextAreaChange = _ref.ontextAreaChange,
      handleOptionChange = _ref.handleOptionChange,
      optionSelected = _ref.optionSelected,
      commentValue = _ref.commentValue;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "custom-padding-for-screens" },
      _react2.default.createElement(
        "div",
        { className: "reject-complaint-question request-reaasign-question" },
        _react2.default.createElement(_common.Question, { options: options, label: "ES_REJECT_COMPLAINT_QUESTION", handleChange: handleOptionChange, valueSelected: optionSelected })
      ),
      _react2.default.createElement(
        "div",
        { className: "reject-complaint-textArea" },
        _react2.default.createElement(_common.TextArea, (0, _extends3.default)({ onChange: ontextAreaChange, value: commentValue }, fields.textarea))
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        onClick: onSubmit,
        className: "responsive-action-button",
        id: "rejectcomplaint-submit-action",
        primary: true
      }, submit, {
        fullWidth: true
      }))
    )
  );
};

exports.default = RejectComplaintForm;