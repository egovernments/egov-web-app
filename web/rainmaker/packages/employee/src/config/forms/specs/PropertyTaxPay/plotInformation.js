const formConfig = {
  name: "plotInformation",
  fields: {
    plotSize: {
      id: "plotSize",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Plot Size",
      hintText: "Enter Plot Size",
      numcols: 4,
    },
    measuringUnit: {
      id: "measuringUnit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring Unit",
      hintText: "",
      dropDownData: [{ label: "Sq Yards", value: "S_Yards" }, { label: "Sq Meter", value: "Sq Meter" }, { label: "Sq Feet", value: "Sq Feet" }],
      numcols: 4,
      value: "sq yards",
    },
    noOfFloors: {
      id: "noOfFloors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "PT_FORM2_NUMBER_OF_FLOORS",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 4,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
