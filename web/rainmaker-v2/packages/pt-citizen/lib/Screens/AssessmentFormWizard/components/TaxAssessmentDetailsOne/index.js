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

var TaxAssessmentDetailsOne = function TaxAssessmentDetailsOne(_ref) {
  var form = _ref.form,
      wizardFields = _ref.wizardFields,
      handleFieldChange = _ref.handleFieldChange;

  var fields = wizardFields(form.fields || {});
  return _react2.default.createElement(
    "div",
    { className: "tax-assessment-details-cont-1" },
    _react2.default.createElement(_components.DropDown, (0, _extends3.default)({
      onChange: function onChange(e, value) {
        return handleFieldChange("propertyType", value);
      }
    }, fields.propertyType, {
      dropDownData: [{ label: "property1", value: "prop1" }, { label: "property2", value: "prop2" }],
      fullWidth: true
    })),
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({}, fields.plotSize, { onChange: function onChange(e, value) {
        return handleFieldChange("plotSize", value);
      }, id: "plot-size" })),
    _react2.default.createElement(_components.DropDown, (0, _extends3.default)({}, fields.floorCount, {
      onChange: function onChange(e, value) {
        return handleFieldChange("floorCount", value);
      },
      dropDownData: [{ label: "1", value: "1" }, { label: "2", value: "2" }],
      fullWidth: true
    }))
  );
};

exports.default = TaxAssessmentDetailsOne;