"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formConfig = {
  name: "financialYear",
  fields: {
    button: {
      id: "year",
      jsonPath: "Properties[0].propertyDetails[0].financialYear",
      value: ""
    }
  },

  isFormValid: false
};

exports.default = formConfig;