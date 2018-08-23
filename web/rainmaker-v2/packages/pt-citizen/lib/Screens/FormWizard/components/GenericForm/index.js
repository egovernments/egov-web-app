"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GenericForm = function GenericForm(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      formKey = _ref.formKey,
      containerStyle = _ref.containerStyle,
      handleRemoveItem = _ref.handleRemoveItem,
      disabled = _ref.disabled,
      className = _ref.className;

  var fields = form.fields || {};
  return _react2.default.createElement(_components.Card, {
    style: containerStyle,
    textChildren: _react2.default.createElement(
      "div",
      { className: formKey + " col-xs-12" },
      handleRemoveItem && _react2.default.createElement(
        "div",
        { className: "text-right", style: { cursor: "pointer" }, onClick: handleRemoveItem },
        _react2.default.createElement(_components.Icon, { action: "navigation", name: "close" })
      ),
      Object.keys(fields).map(function (fieldKey, index) {
        return _react2.default.createElement(
          "div",
          { key: index },
          fieldKey === "dummy" ? _react2.default.createElement("div", { className: "col-xs-6", style: { height: 72 } }) : _react2.default.createElement(
            "div",
            {
              style: fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {},
              className: fields[fieldKey].numcols ? fields[fieldKey].hideField ? "" : "col-xs-" + fields[fieldKey].numcols : "col-xs-6"
            },
            _react2.default.createElement(_field2.default, {
              fieldKey: fieldKey,
              field: fields[fieldKey],
              handleFieldChange: handleFieldChange,
              disabled: disabled,
              className: className
            }),
            fields[fieldKey].toolTip && !fields[fieldKey].hideField && _react2.default.createElement(_components.ToolTipUi, { id: "form-wizard-tooltip", title: fields[fieldKey].toolTipMessage })
          )
        );
      })
    ),
    className: className
  });
};
exports.default = GenericForm;