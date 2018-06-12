const formConfig = {
  name: "exemptionCategory",
  fields: {
    individual: {
      id: "individual",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Individiual Exemption Category (if applicable)",
      hintText: "Select",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Organization (Govt.)", value: "ORGGov" },
        { label: "Organization (Private)", value: "ORGPvt" },
      ],
      numCols: 6,
    },
    usage: {
      id: "usage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Usage Exemption Category (if applicable)",
      hintText: "Select",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Organization (Govt.)", value: "ORGGov" },
        { label: "Organization (Private)", value: "ORGPvt" },
      ],
      numCols: 6,
    },
  },
};
export default formConfig;
