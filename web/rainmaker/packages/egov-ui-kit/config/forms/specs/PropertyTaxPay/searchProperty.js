"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mobileNumber;

var _actions = require("egov-ui-kit/redux/form/actions");

var _endPoints = require("egov-ui-kit/utils/endPoints");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "searchProperty",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    city: {
      id: "city",
      numcols: 6,
      fullWidth: true,
      className: "search-property-form-pt",
      jsonPath: "",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      type: "singleValueList"
    },
    mobileNumber: (_mobileNumber = {
      id: "complainant-mobile-no",
      type: "mobilenumber",
      jsonPath: "",
      floatingLabelText: "PT_OWNER_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "PT_OWNER_MOBILE_NUMBER_PLACEHOLDER",
      inputStyle: { width: "calc(100% - 35px)" },
      numcols: 6,
      pattern: "^([0-9]){10}$",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    }, (0, _defineProperty3.default)(_mobileNumber, "pattern", /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i), (0, _defineProperty3.default)(_mobileNumber, "value", ""), _mobileNumber),
    oldpropertyids: {
      id: "old-property-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      errorMessage: "",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
      value: ""
    },
    ids: {
      id: "property-tax-assessment-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "PT_UNIQUE_ID",
      errorMessage: "",
      hintText: "PT_UNIQUE_ID_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64
    }
  },
  submit: {
    type: "submit",
    label: "SEARCH",
    id: "search-property"
  },
  afterInitForm: function afterInitForm(action, store, dispatch) {
    try {
      var state = store.getState();
      var _state$common = state.common,
          cities = _state$common.cities,
          citiesByModule = _state$common.citiesByModule;

      var tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
      var PT = citiesByModule.PT;

      if (PT) {
        var tenants = PT.tenants;
        var dd = tenants.reduce(function (dd, tenant) {
          var selected = cities.find(function (city) {
            return city.code === tenant.code;
          });
          dd.push({ label: selected.name, value: selected.code });
          return dd;
        }, []);
        dispatch((0, _actions.setFieldProperty)("searchProperty", "city", "dropDownData", dd));
        if (process.env.REACT_APP_NAME !== "Citizen") {
          var found = tenants.find(function (city) {
            return city.code === tenantId;
          });
          if (found) {
            dispatch((0, _actions.handleFieldChange)("searchProperty", "city", tenantId));
            dispatch((0, _actions.setFieldProperty)("searchProperty", "city", "disabled", true));
          }
        }
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  },
  action: "_search",
  saveUrl: "/pt-services-v2/property",
  redirectionRoute: "",
  isFormValid: false
};

exports.default = formConfig;