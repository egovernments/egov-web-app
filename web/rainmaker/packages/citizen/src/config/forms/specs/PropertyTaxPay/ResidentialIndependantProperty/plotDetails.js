const formConfig = {
  name: "ResidentialIndependantPlotDetails",
  fields: {
    plotSize: {
      id: "assessment-plot-size",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Plot Size",
      hintText: "Enter plot size",
      errorMessage: "Enter a valid plot size",
      required: true,
    },
    MeasuringUnit: {
      id: "assessment-plot-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      hintText: "Sq yards",
      required: true,
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      value: "1",
    },
  },
};

export default formConfig;
