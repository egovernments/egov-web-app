"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _mobileNumber;

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
      jsonPath: "",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      type: "singleValueList",
      dataFetchConfig: {
        url: _endPoints.CITY.GET.URL,
        action: _endPoints.CITY.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [{
              moduleName: "tenant",
              masterDetails: [{
                name: "tenants"
              }]
            }]
          }
        },
        dataPath: ["MdmsRes.tenant.tenants"]
      }
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
      floatingLabelText: "PT_ASSESSMENT_ID",
      errorMessage: "",
      hintText: "PT_ASSESSMENT_ID_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64
    }

    // houseNo: {
    //   id: "house-no",
    //   jsonPath: "",
    //   type: "textfield",
    //   floatingLabelText: "House No.",
    //   errorMessage: "",
    //   hintText: "Enter house no.",
    //   numcols: 6,
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    // },
    // mohalla: {
    //   id: "mohalla",
    //   numcols: 6,
    //   type: "singleValueList",
    //   jsonPath: "services[0].mohalla",
    //   floatingLabelText: "ES_CREATECOMPLAINT_MOHALLA",
    //   hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
    //   errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
    //   dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    // },
    // tenantId: {
    //   id: "add-complaint-tenantid",
    //   jsonPath: "services[0].tenantId",
    //   value: "pb.amritsar",
    // },
  },
  submit: {
    type: "submit",
    label: "SEARCH",
    id: "search-property"
  },
  action: "_search",
  saveUrl: "/pt-services-v2/property",
  redirectionRoute: "",
  isFormValid: false
};

exports.default = formConfig;