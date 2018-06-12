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
      required: true,
    },
    measuringUnit: {
      id: "assessment-plot-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      value: "Sq yards",
      required: true,
    },
  },
};

export default formConfig;
