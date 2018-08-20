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

var ComplaintResolvedForm = function ComplaintResolvedForm(_ref) {
  var formKey = _ref.formKey,
      form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      onSubmit = _ref.onSubmit;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "custom-padding-for-screens" },
      _react2.default.createElement(_common.ImageUpload, { module: "rainmaker-pgr", formKey: formKey, fieldKey: "media" }),
      _react2.default.createElement(
        "div",
        { style: { padding: "24px 16px 0px 1px" } },
        _react2.default.createElement(_common.TextArea, (0, _extends3.default)({ onChange: function onChange(e, value) {
            return handleFieldChange("textarea", value);
          } }, fields.textarea))
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        onClick: onSubmit,
        className: "responsive-action-button",
        id: "complaint-resolved-mark-resolved"
      }, submit, {
        primary: true,
        fullWidth: true
      }))
    )
  );
};

exports.default = ComplaintResolvedForm;