const formConfig = {
  name: "propertyTaxPropertyAddress",
  fields: {
    propertyNumber: {
      id: "property-number",
      jsonPath: "",
      required: true,
      floatingLabelText: "PT_PROPERTY_DETAILS_PROPERTY_NUMBER",
      hintText: "PT_PROPERTY_DETAILS_PROPERTY_NUMBER_PLACEHOLDER",
      errorMessage: "PT_PROPERTY_DETAILS_PROPERTY_NUMBER_ERRORMSG",
    },
    colony: {
      id: "property-colony",
      jsonPath: "",
      required: true,
      floatingLabelText: "PT_PROPERTY_DETAILS_COLONY_NAME",
      hintText: "PT_PROPERTY_DETAILS_COLONY_NAME_PLACEHOLDER",
      errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
    },
    street: {
      id: "property-street",
      jsonPath: "",
      required: true,
      floatingLabelText: "PT_PROPERTY_DETAILS_STREET",
      hintText: "PT_PROPERTY_DETAILS_STREET_PLACEHOLDER",
      errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
    },
    location: {
      id: "property-location",
      jsonPath: "",
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "PT_PROPERTY_DETAILS_LOCATION_PLACEHOLDER",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
