"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var resetFormWizard = exports.resetFormWizard = function resetFormWizard(form, removeForm) {
  var formKeys = form && Object.keys(form);
  var formToReset = ["basicInformation", "propertyAddress", "plotDetails", "ownershipType", "institutionAuthority", "institutionDetails", "cashInfo", "paymentModes", "receiptInfo", "additionalRebate"];
  formKeys.forEach(function (formKey) {
    if (formToReset.includes(formKey) || formKey.startsWith("ownerInfo") || formKey.startsWith("customSelect_") || formKey.startsWith("floorDetails_")) {
      removeForm(formKey);
    }
  });
};

var getLatestPropertyDetails = exports.getLatestPropertyDetails = function getLatestPropertyDetails(propertyDetailsArray) {
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce(function (acc, curr) {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};