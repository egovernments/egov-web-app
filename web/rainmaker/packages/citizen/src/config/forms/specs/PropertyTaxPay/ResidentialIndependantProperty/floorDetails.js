const formConfig = {
  name: "ResidentialIndependantfloorDetails",
  fields: {
    floor: {
      id: "assessment-floor",
      jsonPath: "",
      floatingLabelText: "Floor",
      hintText: "Select floor",
      type: "singleValueList",
      required: true,
    },
    Occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      hintText: "Select Occupancy",
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
  },
};

export default formConfig;
