"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _Ratings = require("../Ratings");

var _Ratings2 = _interopRequireDefault(_Ratings);

var _TextArea = require("../TextArea");

var _TextArea2 = _interopRequireDefault(_TextArea);

var _CheckBoxGroup = require("../CheckBoxGroup");

var _CheckBoxGroup2 = _interopRequireDefault(_CheckBoxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackForm = function FeedbackForm(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      onCheck = _ref.onCheck,
      checkBoxValue = _ref.checkBoxValue,
      onSubmit = _ref.onSubmit;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "feedback-main-container" },
      _react2.default.createElement(
        "div",
        { className: "feedback-form" },
        _react2.default.createElement(_Ratings2.default, { onChange: function onChange(value) {
            return handleFieldChange("rating", value);
          } }),
        _react2.default.createElement(_CheckBoxGroup2.default, { selected: checkBoxValue, onCheck: onCheck }),
        _react2.default.createElement(_TextArea2.default, (0, _extends3.default)({ onChange: function onChange(e, value) {
            return handleFieldChange("comments", value);
          } }, fields.comments))
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({ onClick: onSubmit, className: "responsive-action-button" }, submit, { primary: true, fullWidth: true }))
    )
  );
};

exports.default = FeedbackForm;