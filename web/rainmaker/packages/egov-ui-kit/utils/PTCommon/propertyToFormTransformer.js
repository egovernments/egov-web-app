"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertRawDataToFormConfig = exports.getAssesmentDetails = exports.getInstituteAuthority = exports.getInstituteDetails = exports.getpropertyAddressDetails = exports.getAllOwnerDetails = exports.getOwnerShipDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _ownerInfo = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/ownerInfo");

var _ownerInfo2 = _interopRequireDefault(_ownerInfo);

var _ownershipType = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/ownershipType");

var _ownershipType2 = _interopRequireDefault(_ownershipType);

var _institutionAuthority = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/OwnerInformation/Institution/institutionAuthority");

var _institutionAuthority2 = _interopRequireDefault(_institutionAuthority);

var _institutionDetails = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/OwnerInformation/Institution/institutionDetails");

var _institutionDetails2 = _interopRequireDefault(_institutionDetails);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _capitalize = require("lodash/capitalize");

var _capitalize2 = _interopRequireDefault(_capitalize);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _assessInfoFormManager = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import propertyAddress from "egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyAddress";
var propertyAddress = process.env.REACT_APP_NAME === "Citizen" ? require("egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyAddress").default : require("config/forms/specs/PropertyTaxPay/propertyAddress").default;

var addData = function addData(config, currentForm) {
  var res = (0, _extends4.default)({}, config);
  Object.keys(config.fields).forEach(function (field) {
    var jsonPath = config.fields[field].jsonPath;
    if (jsonPath) {
      var value = currentForm[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] || "";
      if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
        value = (0, _capitalize2.default)(value) || "Male";
      } else if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        value = (0, _get2.default)(currentForm, "documents[0]." + jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length), "");
      }
      (0, _set2.default)(res, "fields." + field + ".value", value);
    }
  });
  delete res.name;
  return res;
};

var getOwnerShipDetails = exports.getOwnerShipDetails = function getOwnerShipDetails(property) {
  var ownerShipForms = {
    ownershipType: addData((0, _cloneDeep2.default)(_ownershipType2.default), (0, _get2.default)(property, "propertyDetails[0]", {}))
  };
  return ownerShipForms;
};

// export const getAllOwnerDetails = (property, isSingleOwner = false) => {
//   const ownerDataFromApi = get(property, "propertyDetails[0].owners", [])
//   let ownerForms = {}
//   ownerDataFromApi.forEach((ownerDetails, index) => {
//     ownerForms = {
//       ...ownerForms,
//       [isSingleOwner ? "ownerInfo" : `ownerInfo_${index}`]: addData(cloneDeep(ownerInfo), ownerDetails),
//     }
//   })
//   return ownerForms
// }

var getAllOwnerDetails = exports.getAllOwnerDetails = function getAllOwnerDetails(property) {
  var isSingleOwner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var ownerDataFromApi = (0, _get2.default)(property, "propertyDetails[0].owners", []);
  var ownerForms = {};
  ownerDataFromApi.forEach(function (ownerDetails, index) {
    var singleownerDetails = addData((0, _cloneDeep2.default)(_ownerInfo2.default), ownerDetails);
    singleownerDetails.fields.ownerRelationship.value = "father";
    ownerForms = (0, _extends4.default)({}, ownerForms, (0, _defineProperty3.default)({}, isSingleOwner ? "ownerInfo" : "ownerInfo_" + index, singleownerDetails));
  });
  return ownerForms;
};

var getpropertyAddressDetails = exports.getpropertyAddressDetails = function getpropertyAddressDetails(propertyRes) {
  var Properties = propertyRes.Properties;

  var oldPIDPath = (0, _get2.default)(propertyAddress, "fields.oldPID.jsonPath", "");
  var mohallaPath = (0, _get2.default)(propertyAddress, "fields.mohalla.jsonPath", "");
  var propertyAddressForm = {
    propertyAddress: addData((0, _cloneDeep2.default)(propertyAddress), (0, _get2.default)(Properties[0], "address", {}))
  };
  (0, _set2.default)(propertyAddressForm, "propertyAddress.fields.oldPID.value", (0, _get2.default)(propertyRes, oldPIDPath, ""));
  (0, _set2.default)(propertyAddressForm, "propertyAddress.fields.mohalla.value", (0, _get2.default)(propertyRes, mohallaPath, ""));
  (0, _set2.default)(propertyAddressForm, "propertyAddress.fields.city.value", (0, _get2.default)(Properties[0], "tenantId", ""));

  return propertyAddressForm;
};

var getInstituteDetails = exports.getInstituteDetails = function getInstituteDetails(property) {
  var instituteDetailsForms = {
    institutionDetails: addData((0, _cloneDeep2.default)(_institutionDetails2.default), (0, _get2.default)(property, "propertyDetails[0].institution", {}))
  };
  return instituteDetailsForms;
};

var getInstituteAuthority = exports.getInstituteAuthority = function getInstituteAuthority(propertyResponse) {
  var Properties = propertyResponse.Properties;

  var instituteDataFromApi = (0, _get2.default)(Properties[0], "propertyDetails[0].owners", []);
  var designationPath = (0, _get2.default)(_institutionAuthority2.default, "fields.designation.jsonPath", "");
  var instituteAuthorityForm = {};
  instituteDataFromApi.forEach(function (instituteDetails, index) {
    if (!!instituteDetails.altContactNumber) {
      instituteAuthorityForm = {
        institutionAuthority: addData((0, _cloneDeep2.default)(_institutionAuthority2.default), instituteDetails)
      };
    }
  });
  (0, _set2.default)(instituteAuthorityForm, "institutionAuthority.fields.designation.value", (0, _get2.default)(propertyResponse, designationPath, ""));

  return instituteAuthorityForm;
};

var getAssesmentDetails = exports.getAssesmentDetails = function getAssesmentDetails(propertyResponse) {
  return (0, _PTCommon.transformPropertyDataToAssessInfo)(propertyResponse);
};

var convertRawDataToFormConfig = exports.convertRawDataToFormConfig = function convertRawDataToFormConfig(propertyResponse) {
  var Properties = propertyResponse.Properties;

  var properties = Properties;

  // let res = {};
  var ownerForms = {};
  var institutionAuthority = {};
  var institutionDetails = {};
  var ownerShipForm = getOwnerShipDetails(properties[0]);
  var propertyAddress = getpropertyAddressDetails(propertyResponse);
  var assessmentForms = getAssesmentDetails(propertyResponse);
  var typeOfOwnershipPath = (0, _get2.default)(ownershipType, "fields.ownershipCategory.jsonPath", "");
  var ownershipType = (0, _get2.default)(ownerShipForm, "ownershipType.fields.typeOfOwnership.value", "");

  if (ownershipType === "MULTIPLEOWNERS" || ownershipType === "SINGLEOWNER") {
    ownerForms = getAllOwnerDetails(properties[0], ownershipType === "SINGLEOWNER");
  } else if (ownershipType.toLowerCase().indexOf("insti") !== -1) {
    institutionAuthority = getInstituteAuthority(propertyResponse);
    institutionDetails = getInstituteDetails(properties[0]);
    (0, _set2.default)(ownerShipForm, "ownershipType.fields.typeOfOwnership.value", (0, _get2.default)(propertyResponse, typeOfOwnershipPath, ""));
  } else {
    //TODO
  }

  return (0, _extends4.default)({}, propertyAddress, assessmentForms, ownerForms, ownerShipForm, institutionAuthority, institutionDetails);
};