const formConfig = {
  name: "plotInformation",
  fields: {
    plotSize: {
      id: "plotSize",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Plot Size",
      hintText: "Enter Plot Size",
      numCols: 4,
    },
    measuringUnit: {
      id: "measuringUnit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Measuring Unit",
      hintText: "",
      dropDownData: [{ label: "Sq Yards", value: "Sq Yards" }, { label: "Sq Meter", value: "Sq Meter" }, { label: "Sq Feet", value: "Sq Feet" }],
      numCols: 4,
      value: "Sq Yards",
    },
    noOfFloors: {
      id: "noOfFloors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      hintText: "Enter no. of floors",
      numCols: 4,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
