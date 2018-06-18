const formConfig = {
  name: "plotDetails",
  fields: {
    plotSize: {
      id: "assessment-plot-size",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Plot Size",
      hintText: "Enter plot size",
      errorMessage: "Enter a valid plot size",
      numCols: 4,
    },
    measuringUnit: {
      id: "assessment-plot-unit",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      required: true,
      numCols: 4,
      value: "sq yards",
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      hintText: "Select",
      numCols: 4,
    },
  },
};

export default formConfig;
