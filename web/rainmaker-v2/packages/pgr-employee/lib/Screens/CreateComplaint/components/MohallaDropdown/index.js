"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MohallaDD = function MohallaDD(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      mohalla = _ref.mohalla;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_components.AutoSuggestDropdown, (0, _extends3.default)({
      className: "fix-for-layout-break",
      fullWidth: true,
      dataSource: mohalla && mohalla.dropDownData,
      onChange: function onChange(chosenRequest, index) {
        handleFieldChange("mohalla", chosenRequest.value);
      },
      floatingLabelText: mohalla && mohalla.floatingLabelText
    }, mohalla))
  );
};

exports.default = MohallaDD;