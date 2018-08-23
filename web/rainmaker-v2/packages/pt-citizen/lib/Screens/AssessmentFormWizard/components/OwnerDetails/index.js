"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OwnerDetails = function OwnerDetails(_ref) {
  var form = _ref.form,
      wizardFields = _ref.wizardFields,
      handleFieldChange = _ref.handleFieldChange;

  var fields = wizardFields(form.fields || {});
  return _react2.default.createElement(
    "div",
    { className: "owner-details-form-cont" },
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({ id: "owner-name", onChange: function onChange(e, value) {
        return handleFieldChange("name", value);
      } }, fields.name)),
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({ id: "father-or-husband-name", onChange: function onChange(e, value) {
        return handleFieldChange("fatherHusbandName", value);
      } }, fields.fatherHusbandName)),
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({ id: "aadhar-no" }, fields.aadharNumber, { onChange: function onChange(e, value) {
        return handleFieldChange("aadharNumber", value);
      } })),
    _react2.default.createElement(_components.MobileNumberField, (0, _extends3.default)({ id: "mobile-no" }, fields.mobileNumber, { onChange: function onChange(e, value) {
        return handleFieldChange("mobileNumber", value);
      } })),
    _react2.default.createElement(_components.TextField, (0, _extends3.default)({ id: "address" }, fields.address, { onChange: function onChange(e, value) {
        return handleFieldChange("address", value);
      } }))
  );
};

exports.default = OwnerDetails;