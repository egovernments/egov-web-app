import { MDMS } from "egov-ui-kit/utils/endPoints";
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
      dropDownData: [{ label: "sq ft", value: "SQ_FT" }, { label: "sq yards", value: "SQ_YARDS" }],
      required: true,
      value: "SQ_YARDS",
    },
  },
};

export default formConfig;
