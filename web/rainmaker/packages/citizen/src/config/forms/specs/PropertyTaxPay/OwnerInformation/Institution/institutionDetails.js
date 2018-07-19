const formConfig = {
  name: "institutionDetails",
  fields: {
    name: {
      id: "institution-name",
      jsonPath: "propertyDetails[0].institution.name",
      type: "textfield",
      floatingLabelText: "Name of Institution",
      hintText: "Enter Institute's name",
      errorMessage: "Enter a valid name",
      numcols: 6,
    },
    type: {
      id: "institution-type",
      jsonPath: "propertyDetails[0].institution.type",
      type: "singleValueList",
      floatingLabelText: "Type of Institution",
      required: true,
      numcols: 6,
      hintText: "Select",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
