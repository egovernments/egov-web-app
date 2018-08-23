"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryValue = exports.getLatestPropertyDetails = exports.resetFormWizard = undefined;

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var resetFormWizard = (exports.resetFormWizard = function resetFormWizard(
  form,
  removeForm
) {
  var formKeys = form && Object.keys(form);
  var formToReset = [
    "basicInformation",
    "propertyAddress",
    "plotDetails",
    "ownershipType",
    "institutionAuthority",
    "institutionDetails",
    "cashInfo",
    "paymentModes",
    "receiptInfo",
    "additionalRebate"
  ];
  formKeys.forEach(function(formKey) {
    if (
      formToReset.includes(formKey) ||
      formKey.startsWith("ownerInfo") ||
      formKey.startsWith("customSelect_") ||
      formKey.startsWith("floorDetails_")
    ) {
      removeForm(formKey);
    }
  });
});

var getLatestPropertyDetails = (exports.getLatestPropertyDetails = function getLatestPropertyDetails(
  propertyDetailsArray
) {
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce(function(acc, curr) {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
});

var getQueryValue = (exports.getQueryValue = function getQueryValue(
  query,
  key
) {
  return (0, _get2.default)(_queryString2.default.parse(query), key, undefined);
});
