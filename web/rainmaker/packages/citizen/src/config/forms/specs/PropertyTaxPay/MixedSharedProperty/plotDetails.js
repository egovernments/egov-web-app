const formConfig = {
  name: "plotDetails",
  fields: {
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
    superArea: {
      id: "assessment-super-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Super area",
      hintText: "Enter total super area",
      ErrorText: "Enter a valid super area size",
      required: true,
    },
    superAreaUnit: {
      id: "assessment-super-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      value: "Sq yards",
      required: true,
    },
  },
};

export default formConfig;
