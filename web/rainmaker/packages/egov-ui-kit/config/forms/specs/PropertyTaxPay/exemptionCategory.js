"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formConfig = {
  name: "exemptionCategory",
  fields: {
    individual: {
      id: "individual",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "PT_INDIVIDUAL_EXCEMPTION",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [{ label: "Individual Owner", value: "IND" }, { label: "Multiple Owners", value: "MUL" }, { label: "Organization (Govt.)", value: "ORGGov" }, { label: "Organization (Private)", value: "ORGPvt" }],
      numcols: 6
    },
    usage: {
      id: "usage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "PT_USAGE_EXCEMPTION",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [{ label: "Individual Owner", value: "IND" }, { label: "Multiple Owners", value: "MUL" }, { label: "Organization (Govt.)", value: "ORGGov" }, { label: "Organization (Private)", value: "ORGPvt" }],
      numcols: 6
    }
  },
  isFormValid: false
};
exports.default = formConfig;