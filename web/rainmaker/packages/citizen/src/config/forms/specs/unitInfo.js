const formConfig = {
  name: "unitInfo",
  fields: {
    floor: {
      id: "floor",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Floor",
      hintText: "",
      dropDownData: [],
      numCols: 4,
      value: "",
    },
    floor: {
      id: "occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      hintText: "",
      dropDownData: [],
      numCols: 4,
      value: "",
    },
    builtArea: {
      id: "builtArea",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area",
      hintText: "Enter built area size",
      numCols: 4,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
