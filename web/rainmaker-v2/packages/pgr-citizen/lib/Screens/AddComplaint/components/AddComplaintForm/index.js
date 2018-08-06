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

var _LocationDetails = require("../LocationDetails");

var _LocationDetails2 = _interopRequireDefault(_LocationDetails);

var _AdditionalDetails = require("../AdditionalDetails");

var _AdditionalDetails2 = _interopRequireDefault(_AdditionalDetails);

var _ComplaintType = require("../ComplaintType");

var _ComplaintType2 = _interopRequireDefault(_ComplaintType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddComplaintForm = function AddComplaintForm(_ref) {
  var formKey = _ref.formKey,
      localizationLabels = _ref.localizationLabels,
      handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      categories = _ref.categories;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    { className: "add-complaint-main-cont form-without-button-cont-generic" },
    _react2.default.createElement(_common.ImageUpload, { module: "rainmaker-pgr", formKey: formKey, fieldKey: "media" }),
    _react2.default.createElement(_ComplaintType2.default, { localizationLabels: localizationLabels, categories: categories, complaintType: fields.complaintType }),
    _react2.default.createElement(_LocationDetails2.default, { formKey: formKey, handleFieldChange: handleFieldChange, landmark: fields.landmark, locationDetails: fields.address }),
    _react2.default.createElement(_AdditionalDetails2.default, { handleFieldChange: handleFieldChange, additionalDetails: fields.additionalDetails }),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont " },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        primary: true,
        fullWidth: true,
        style: { boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }
      }, submit, {
        className: "responsive-action-button"
      }))
    )
  );
};

exports.default = AddComplaintForm;