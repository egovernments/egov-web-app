"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstitutionAuthorityHOC = exports.InstitutionHOC = exports.OwnerInformation = exports.DynamicFormHoc = exports.ExemptionCategoryHOC = exports.OwnerInfoHOC = exports.OwnershipTypeHOC = exports.PlotInformationHOC = exports.PropertyAddressHOC = exports.UsageInformationHOC = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{ value: "Male", label: _react2.default.createElement(_translationNode2.default, { label: "Male" }) }, { value: "Female", label: _react2.default.createElement(_translationNode2.default, { label: "Female" }) }, { value: "Transgender", label: _react2.default.createElement(_translationNode2.default, { label: "Transgender" }) }];

// const guardianOptions = [{ value: "Husband", label: <Label label="Husband" /> }, { value: "Father ", label: <Label label="Father" /> }];

var styles = {
  labelStyle: {
    color: "rgb(0, 188, 209)",
    font: "12px",
    letterSpacing: 0.6,
    marginBottom: 5,
    marginTop: 14
  },

  radioButtonItemStyle: {
    marginBottom: "18px",
    paddingLeft: "2px",
    height: "16px"
  },
  selectedLabelStyle: {
    color: "#00bbd3"
  },
  radioButtonLabelStyle: {
    lineHeight: 1,
    marginBottom: 8
  },
  iconStyle: {
    width: 16,
    height: 16
  }
};

var OwnerInformation = function OwnerInformation(_ref) {
  var form = _ref.form,
      formKey = _ref.formKey,
      handleFieldChange = _ref.handleFieldChange,
      cardTitle = _ref.cardTitle,
      deleteBtn = _ref.deleteBtn,
      handleChange = _ref.handleChange,
      handleGuardianChange = _ref.handleGuardianChange,
      handleRemoveOwner = _ref.handleRemoveOwner,
      formId = _ref.formId,
      disabled = _ref.disabled;

  var fields = form.fields || {};
  var genderSelected = (0, _get2.default)(fields, "ownerGender.value", "");
  return _react2.default.createElement(_components.Card, {
    textChildren: _react2.default.createElement(
      "div",
      { className: "pt-owner-info" },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          null,
          cardTitle
        ),
        deleteBtn && _react2.default.createElement(
          "div",
          {
            className: "pt-ownerinfo-deletebtn",
            onClick: function onClick() {
              handleRemoveOwner(formId, formKey);
            }
          },
          _react2.default.createElement(_components.Icon, { action: "content", name: "clear" })
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "owner-details-form" },
        _react2.default.createElement(
          "div",
          { className: "name-address" },
          _react2.default.createElement(_field2.default, { fieldKey: "ownerName", field: fields["ownerName"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "ownerMobile", field: fields["ownerMobile"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, {
            fieldKey: "ownerCategory",
            field: fields["ownerCategory"],
            handleFieldChange: handleFieldChange,
            disabled: disabled,
            className: "ownerCategory"
          }),
          _react2.default.createElement(_field2.default, { fieldKey: "ownerCategoryId", field: fields["ownerCategoryId"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "ownerAddress", field: fields["ownerAddress"], handleFieldChange: handleFieldChange, disabled: disabled })
        ),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_translationNode2.default, { label: "Gender", fontSize: 12, labelStyle: styles.labelStyle, bold: true }),
          _react2.default.createElement(_components.RadioButton, {
            id: "gender-selection",
            name: "gender-selection",
            options: options,
            handleChange: function handleChange(e) {
              handleFieldChange("ownerGender", e.target.value);
            },
            radioButtonItemStyle: styles.radioButtonItemStyle,
            labelStyle: styles.radioButtonLabelStyle,
            selectedLabelStyle: styles.selectedLabelStyle,
            className: "owner-gender-selection",
            iconStyle: styles.iconStyle,
            valueSelected: genderSelected,
            disabled: disabled
          }),
          _react2.default.createElement(
            "div",
            { className: "relationship-details" },
            _react2.default.createElement(_field2.default, { fieldKey: "ownerGuardian", field: fields["ownerGuardian"], handleFieldChange: handleFieldChange, disabled: disabled }),
            _react2.default.createElement(_field2.default, { fieldKey: "ownerRelationship", field: fields["ownerRelationship"], handleFieldChange: handleFieldChange, disabled: disabled })
          ),
          _react2.default.createElement(_field2.default, {
            fieldKey: "ownerCategoryIdType",
            field: fields["ownerCategoryIdType"],
            handleFieldChange: handleFieldChange,
            disabled: disabled,
            className: "ownerCategoryIdType"
          }),
          _react2.default.createElement(_field2.default, { fieldKey: "ownerEmail", field: fields["ownerEmail"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "ownerAadhar", field: fields["ownerAadhar"], handleFieldChange: handleFieldChange, disabled: disabled })
        )
      )
    )
  });
};

var InstitutionAuthority = function InstitutionAuthority(_ref2) {
  var form = _ref2.form,
      formKey = _ref2.formKey,
      handleFieldChange = _ref2.handleFieldChange,
      cardTitle = _ref2.cardTitle,
      formId = _ref2.formId,
      disabled = _ref2.disabled;

  var fields = form.fields || {};
  return _react2.default.createElement(_components.Card, {
    textChildren: _react2.default.createElement(
      "div",
      { className: "pt-institute-authority-info" },
      _react2.default.createElement(
        "div",
        { className: "pt-authority-title" },
        _react2.default.createElement(
          "span",
          null,
          _react2.default.createElement(_components.Icon, { action: "social", name: "person" })
        ),
        _react2.default.createElement(
          "span",
          null,
          cardTitle
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "authority-details-form" },
        _react2.default.createElement(
          "div",
          { className: "name-address" },
          _react2.default.createElement(_field2.default, { fieldKey: "name", field: fields["name"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "mobile", field: fields["mobile"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "email", field: fields["email"], handleFieldChange: handleFieldChange, disabled: disabled })
        ),
        _react2.default.createElement(
          "div",
          { className: "address" },
          _react2.default.createElement(_field2.default, { fieldKey: "designation", field: fields["designation"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "telephone", field: fields["telephone"], handleFieldChange: handleFieldChange, disabled: disabled }),
          _react2.default.createElement(_field2.default, { fieldKey: "address", field: fields["address"], handleFieldChange: handleFieldChange, disabled: disabled })
        )
      )
    )
  });
};

var UsageInformationHOC = (0, _form2.default)({ formKey: "basicInformation", path: "PropertyTaxPay" })(_GenericForm2.default);
var PropertyAddressHOC = (0, _form2.default)({ formKey: "propertyAddress", path: "PropertyTaxPay" })(_GenericForm2.default);
var PlotInformationHOC = (0, _form2.default)({ formKey: "plotInformation", path: "PropertyTaxPay" })(_GenericForm2.default);
var OwnershipTypeHOC = (0, _form2.default)({ formKey: "ownershipType", path: "PropertyTaxPay" })(_GenericForm2.default);
var OwnerInfoHOC = (0, _form2.default)({ formKey: "ownerInfo", path: "PropertyTaxPay" })(OwnerInformation);
var ExemptionCategoryHOC = (0, _form2.default)({ formKey: "exemptionCategory", path: "PropertyTaxPay" })(_GenericForm2.default);
var InstitutionHOC = (0, _form2.default)({ formKey: "institutionDetails", path: "PropertyTaxPay/OwnerInformation/Institution" })(_GenericForm2.default);
var DynamicFormHoc = function DynamicFormHoc(formKey, Form) {
  return (0, _form2.default)({ formKey: formKey })(Form);
};
var InstitutionAuthorityHOC = (0, _form2.default)({ formKey: "institutionAuthority", path: "PropertyTaxPay/OwnerInformation/Institution" })(InstitutionAuthority);

exports.UsageInformationHOC = UsageInformationHOC;
exports.PropertyAddressHOC = PropertyAddressHOC;
exports.PlotInformationHOC = PlotInformationHOC;
exports.OwnershipTypeHOC = OwnershipTypeHOC;
exports.OwnerInfoHOC = OwnerInfoHOC;
exports.ExemptionCategoryHOC = ExemptionCategoryHOC;
exports.DynamicFormHoc = DynamicFormHoc;
exports.OwnerInformation = OwnerInformation;
exports.InstitutionHOC = InstitutionHOC;
exports.InstitutionAuthorityHOC = InstitutionAuthorityHOC;