"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _actions = require("egov-ui-kit/redux/form/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "institutionAuthority",
  fields: {
    name: {
      id: "authority-name",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true
    },
    mobile: {
      id: "authority-mobile",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      pattern: /^(\+\d{1,2}[-]{0,1})?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number"
    },
    designation: {
      id: "authority-designation",
      jsonPath: "propertyDetails[0].institution.designation",
      type: "textfield",
      floatingLabelText: "Designation",
      hintText: "Enter designation",
      errorMessage: "",
      required: true
    },
    telephone: (0, _defineProperty3.default)({
      id: "authority-telephone",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].altContactNumber",
      type: "textfield",
      floatingLabelText: "Landline No.(with STD code)",
      hintText: "Enter Landline No.",
      required: true,
      pattern: /^[0-9]{11}$/i,
      errorMessage: "Enter valid landline number"
    }, "required", true),
    email: {
      id: "authority-email",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "PT_FORM3_EMAIL_ID",
      hintText: "PT_FORM3_EMAIL_ID_PLACEHOLDER",
      errorMessage: "Enter valid email id",
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    address: {
      id: "authority-address",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].correspondenceAddress",
      type: "textfield",
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
      required: true
    },
    isSameAsPropertyAddress: {
      id: "rcpt",
      type: "checkbox",
      jsonPath: "",
      errorMessage: "",
      floatingLabelText: "PT_FORM3_ADDRESS_CHECKBOX",
      value: "",
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            sourceField = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;
        var iscorrAddrSameProp = sourceField.value;

        var _get = (0, _get3.default)(state, "form.propertyAddress.fields", {}),
            _get$city = _get.city,
            city = _get$city === undefined ? "" : _get$city,
            _get$colony = _get.colony,
            colony = _get$colony === undefined ? "" : _get$colony,
            _get$houseNumber = _get.houseNumber,
            houseNumber = _get$houseNumber === undefined ? "" : _get$houseNumber,
            _get$mohalla = _get.mohalla,
            mohalla = _get$mohalla === undefined ? "" : _get$mohalla,
            _get$pincode = _get.pincode,
            pincode = _get$pincode === undefined ? "" : _get$pincode,
            _get$street = _get.street,
            street = _get$street === undefined ? "" : _get$street;

        var mohallaDetails = mohalla && mohalla.dropDownData && mohalla.dropDownData.find(function (mohallaData) {
          return mohallaData.value === (0, _get3.default)(mohalla, "value", "");
        });
        if (iscorrAddrSameProp) {
          var correspondingAddress = ["" + (0, _get3.default)(houseNumber, "value", ""), "" + (0, _get3.default)(colony, "value", ""), "" + (0, _get3.default)(street, "value", ""), "" + (0, _get3.default)(mohallaDetails, "label", ""), "" + (0, _get3.default)(city, "value", "").split(".").pop(), "" + (0, _get3.default)(pincode, "value", "")].join(", ").replace(/^(,\s)+|(,\s)+$/g, '').replace(/(,\s){2,}/g, ", ");
          dispatch((0, _actions.setFieldProperty)(formKey, "address", "value", correspondingAddress));
        } else {
          dispatch((0, _actions.setFieldProperty)(formKey, "address", "value", ""));
        }
      }
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;