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

var ToolTip = function ToolTip(_ref) {
  var placement = _ref.placement,
      show = _ref.show,
      title = _ref.title,
      id = _ref.id;

  return _react2.default.createElement(_components.Tooltip, { enterDelay: 300, id: id, leaveDelay: 300, open: show, placement: placement, title: title });
};

var Field = function Field(_ref2) {
  var fieldKey = _ref2.fieldKey,
      handleFieldChange = _ref2.handleFieldChange,
      _ref2$field = _ref2.field,
      field = _ref2$field === undefined ? {} : _ref2$field,
      rest = (0, _objectWithoutProperties3.default)(_ref2, ["fieldKey", "handleFieldChange", "field"]);

  var renderField = function renderField() {
    var type = field.type,
        tooltip = field.tooltip,
        fieldProps = (0, _objectWithoutProperties3.default)(field, ["type", "tooltip"]);

    switch (type) {
      case "textfield":
      case "textarea":
        return _react2.default.createElement(
          "div",
          { style: { display: "flex" } },
          _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, rest, fieldProps, { onChange: function onChange(e, value) {
              return handleFieldChange(fieldKey, value);
            }, multiLine: type === "textarea" })),
          tooltip && _react2.default.createElement(ToolTip, tooltip)
        );
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
      case "singleValueList":
        return _react2.default.createElement(
          "div",
          { style: { display: "flex" } },
          _react2.default.createElement(_components.DropDown, (0, _extends3.default)({}, rest, fieldProps, {
            dropDownData: fieldProps.dropDownData || [],
            onChange: function onChange(e, value, selectedValue) {
              return handleFieldChange(fieldKey, selectedValue);
            }
          })),
          tooltip && _react2.default.createElement(ToolTip, tooltip)
        );
      default:
        return null;
    }
  };

  return renderField();
};

exports.default = Field;