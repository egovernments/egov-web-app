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
    },
    measuringUnit: {
      id: "assessment-plot-unit",
      dropDownData: [{ label: "sq ft", value: "SQ_FT" }, { label: "sq yards", value: "SQ_YARDS" }],
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring unit",
      required: true,
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      hintText: "Select",
    },
  },
};

export default formConfig;
