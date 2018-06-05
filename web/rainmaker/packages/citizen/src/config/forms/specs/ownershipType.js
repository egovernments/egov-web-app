const formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Ownership",
      hintText: "Select Ownership Type",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Organization (Govt.)", value: "ORGGov" },
        { label: "Organization (Private)", value: "ORGPvt" },
      ],
      numCols: 6,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
