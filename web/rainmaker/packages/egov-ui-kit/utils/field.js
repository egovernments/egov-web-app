"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = function Field(_ref) {
  var fieldKey = _ref.fieldKey,
      handleFieldChange = _ref.handleFieldChange,
      _ref$field = _ref.field,
      field = _ref$field === undefined ? {} : _ref$field,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["fieldKey", "handleFieldChange", "field"]);

  var renderField = function renderField() {
    var type = field.type,
        tooltip = field.tooltip,
        label = field.label,
        hideField = field.hideField,
        fieldProps = (0, _objectWithoutProperties3.default)(field, ["type", "tooltip", "label", "hideField"]);

    if (hideField) return null;
    switch (type) {
      case "textfield":
      case "textarea":
        return _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, rest, fieldProps, { onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          }, multiLine: type === "textarea" }));
      case "mobilenumber":
        return _react2.default.createElement(_components.MobileNumberField, (0, _extends3.default)({}, rest, fieldProps, { onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          } }));
      case "number":
      case "password":
        return _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, rest, fieldProps, { type: type, onChange: function onChange(e, value) {
            return handleFieldChange(fieldKey, value);
          } }));
      case "checkbox":
        return _react2.default.createElement(_components.SingleCheckbox, (0, _extends3.default)({}, rest, fieldProps, { style: { marginTop: "27px" }, onCheck: function onCheck(e) {
            return handleFieldChange(fieldKey, e.target.checked);
          } }));
      case "label":
        return _react2.default.createElement(_components.Label, (0, _extends3.default)({}, rest, fieldProps));
      case "singleValueList":
        return _react2.default.createElement(_components.DropDown, (0, _extends3.default)({}, rest, fieldProps, {
          dropDownData: fieldProps.dropDownData || [],
          onChange: function onChange(e, value, selectedValue) {
            return handleFieldChange(fieldKey, selectedValue);
          }
        }));
      default:
        return null;
    }
  };

  return renderField();
};

exports.default = Field;