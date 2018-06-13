const formConfig = {
  name: "floorDetails",
  fields: {
    // floor: {
    //   id: "assessment-floor",
    //   jsonPath: "",
    //   type: "singleValueList",
    //   floatingLabelText: "Usage Type",
    //   value: "Ground Floor",
    // },
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
      numCols: 4,
      disabled: true,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      numCols: 4,
      required: true,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      value: "Self-Occupied",
      numCols: 4,
      required: true,
    },
    builtArea: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area(sq yards)",
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      numCols: 4,
      required: true,
    },
  },
};

export default formConfig;
