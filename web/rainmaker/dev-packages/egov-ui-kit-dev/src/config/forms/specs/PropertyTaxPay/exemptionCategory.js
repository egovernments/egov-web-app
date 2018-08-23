const formConfig = {
  name: "exemptionCategory",
  fields: {
    individual: {
      id: "individual",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Individiual Exemption Category (if applicable)",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Organization (Govt.)", value: "ORGGov" },
        { label: "Organization (Private)", value: "ORGPvt" },
      ],
      numcols: 6,
    },
    usage: {
      id: "usage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Usage Exemption Category (if applicable)",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Organization (Govt.)", value: "ORGGov" },
        { label: "Organization (Private)", value: "ORGPvt" },
      ],
      numcols: 6,
    },
  },
  isFormValid: false,
};
export default formConfig;
