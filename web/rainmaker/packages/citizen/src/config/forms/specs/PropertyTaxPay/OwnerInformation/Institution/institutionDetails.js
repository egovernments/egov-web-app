const formConfig = {
  name: "institutionDetails",
  fields: {
    name: {
      id: "institution-name",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Name of Institution",
      hintText: "Enter Institute's name",
      errorMessage: "Enter a valid name",
      numCols: 6,
    },
    type: {
      id: "institution-type",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Institution",
      required: true,
      numCols: 6,
      hintText: "Select",
    },
    authorizedPerson: {
      id: "institution-authorized-person",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Name of Authorized Person",
      hintText: "Enter name",
      errorMessage: "Enter a valid name",
      required: true,
      numCols: 6,
    },
    designation: {
      id: "institution-authorized-person-designation",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Designation",
      hintText: "Enter designation",
      errorMessage: "Enter a valid designation",
      required: true,
      numCols: 6,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
