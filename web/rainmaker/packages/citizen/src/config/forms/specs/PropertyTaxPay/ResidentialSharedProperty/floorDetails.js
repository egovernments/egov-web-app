const formConfig = {
  name: "ResidentialSharedfloorDetails",
  fields: {
    floor: {
      id: "assessment-floor",
      jsonPath: "",
      floatingLabelText: "Floor",
      hintText: "Select floor",
      type: "singleValueList",
      required: true,
    },
    BuiltArea: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area",
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      required: true,
    },
    BuiltAreaUnit: {
      id: "assessment-built-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      hintText: "Sq yards",
      required: true,
    },
  },
};

export default formConfig;
