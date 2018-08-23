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

var TaxAssessmentDetailsTwo = function TaxAssessmentDetailsTwo(_ref) {
  var wizardFields = _ref.wizardFields,
      form = _ref.form,
      handleFieldChange = _ref.handleFieldChange;

  var fields = wizardFields(form.fields || {});

  return _react2.default.createElement(
    "div",
    { className: "tax-assessment-details-cont-2" },
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, fields.builtUpArea1, { onChange: function onChange(e, value) {
        return handleFieldChange("builtUpArea1", value);
      }, id: "built-up-area-1" })),
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, fields.builtUpArea2, { onChange: function onChange(e, value) {
        return handleFieldChange("buildUpArea2", value);
      }, id: "built-up-area-2" }))
  );
};

exports.default = TaxAssessmentDetailsTwo;