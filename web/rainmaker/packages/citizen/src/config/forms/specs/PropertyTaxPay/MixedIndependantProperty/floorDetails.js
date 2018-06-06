const formConfig = {
  name: "MixedIndependantfloorDetails",
  fields: {
    floor: {
      id: "assessment-floor",
      jsonPath: "",
      floatingLabelText: "Floor",
      hintText: "Select floor",
      type: "singleValueList",
      required: true,
    },
    UsageType: {
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
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      hintText: "Select",
      required: true,
    },
    AnnualRent: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Annual Rent",
      hintText: "INR",
      ErrorText: "Enter a valid amount",
      required: true,
    },
    subUsage: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Sub-Usage Type",
      hintText: "Select",
      required: true,
    },
  },
};

export default formConfig;
