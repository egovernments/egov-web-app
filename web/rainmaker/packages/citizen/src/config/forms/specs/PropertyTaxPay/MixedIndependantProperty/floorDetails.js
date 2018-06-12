const formConfig = {
  name: "floorDetails",
  fields: {
    floor: {
      id: "assessment-floor",
      jsonPath: "",
      type: "singleValueList",
      value: "Ground Floor",
    },
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      required: true,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      value: "Self-Occupied",
      required: true,
    },
    builtArea: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area(sq yards)",
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      required: true,
    },
    annualRent: {
      id: "assessment-annual-rent",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Annual Rent",
      hintText: "Enter annual rent",
      ErrorText: "Enter a valid amount",
      required: true,
    },
  },
};

export default formConfig;
