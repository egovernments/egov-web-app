const formConfig = {
  name: "plotDetails",
  fields: {
    plotSize: {
      id: "assessment-plot-size",
      jsonPath: "Properties[0].propertyDetails[0].landArea",
      type: "textfield",
      floatingLabelText: "Plot Size",
      hintText: "Enter plot size",
      errorMessage: "Enter a valid plot size",
      required: true,
    },
    measuringUnit: {
      id: "assessment-plot-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      required: true,
      value: "sq yards",
    },
  },
  isFormValid: false,
};

export default formConfig;
