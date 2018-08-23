import get from "lodash/get";
import queryString from "query-string";

export const resetFormWizard = (form, removeForm) => {
  const formKeys = form && Object.keys(form);
  const formToReset = [
    "basicInformation",
    "propertyAddress",
    "plotDetails",
    "ownershipType",
    "institutionAuthority",
    "institutionDetails",
    "cashInfo",
    "paymentModes",
    "receiptInfo",
    "additionalRebate",
  ];
  formKeys.forEach((formKey) => {
    if (
      formToReset.includes(formKey) ||
      formKey.startsWith("ownerInfo") ||
      formKey.startsWith("customSelect_") ||
      formKey.startsWith("floorDetails_")
    ) {
      removeForm(formKey);
    }
  });
};

export const getLatestPropertyDetails = (propertyDetailsArray) => {
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce((acc, curr) => {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};

export const getQueryValue = (query, key) => get(queryString.parse(query), key, undefined);
