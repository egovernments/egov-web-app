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
      numcols: 4,
    },
    measuringUnit: {
      id: "assessment-plot-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      required: true,
      numcols: 4,
      value: "sq yards",
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      value: "1",
      numcols: 4,
    },
  },
  isFormValid: false,
};

export default formConfig;
