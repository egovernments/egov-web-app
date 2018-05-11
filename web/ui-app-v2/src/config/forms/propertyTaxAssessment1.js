const formConfig = {
  name: "propertyTaxAssessment1",
  fields: {
    propertType: {
      id: "assessment-property-type",
      jsonPath: "",
      required: true,
      floatingLabelText: "PT_ASSESMENT1_PROPERTY_TYPE",
      hintText: "PT_COMMON_SELECT_PLACEHOLDER",
    },
    plotSize: {
      id: "assessment-plot-size",
      jsonPath: "",
      floatingLabelText: "PT_ASSESMENT1_PLOT_SIZE",
      hintText: "PT_COMMON_SQFT_PLACEHOLDER",
      errorMessage: "PT_ASSESMENT1_PLOT_SIZE_ERROR_MESSAGE",
    },
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      floatingLabelText: "PT_ASSESMENT1_NUMBER_OF_FLOORS",
      hintText: "PT_COMMON_SQFT_PLACEHOLDER",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
