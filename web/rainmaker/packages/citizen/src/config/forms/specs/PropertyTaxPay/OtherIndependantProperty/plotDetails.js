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
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      value: "SQ_YARDS",
      dropDownData: [{ label: "sq ft", value: "SQ_FT" }, { label: "sq yards", value: "SQ_YARDS" }],
      required: true,
      numCols: 4,
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      numCols: 4,
      hintText: "Select",
    },
  },
};

export default formConfig;
