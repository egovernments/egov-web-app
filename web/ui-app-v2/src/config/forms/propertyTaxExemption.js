const formConfig = {
  name: "propertyTaxExemption",
  fields: {
    propertcategoryyNumber: {
      id: "exemption-category",
      jsonPath: "",
      floatingLabelText: "PT_EXEMPTION_EXEMPTION_CATEGORY",
      hintText: "PT_COMMON_SELECT_PLACEHOLDER",
    },
    referenceId: {
      id: "exemption-reference-id",
      jsonPath: "",
      floatingLabelText: "PT_EXEMPTION_REFERENCE_ID",
      hintText: "PT_EXEMPTION_REFERENCE_ID_PLACEHOLDER",
      errorMessage: "PT_EXEMPTION_REFERENCE_ID_ERRORMSG",
    },
    proof: {
      id: "exemption-proof",
      jsonPath: "",
      floatingLabelext: "PT_EXEMPTION_PROOF",
      hintText: "PT_EXEMPTION_PROOF_PLACEHOLDER",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
