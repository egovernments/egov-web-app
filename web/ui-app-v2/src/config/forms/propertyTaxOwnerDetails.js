const formConfig = {
  name: "propertyTaxOwnerDetails",
  fields: {
    name: {
      id: "owner-name",
      jsonPath: "",
      required: true,
      floatingLabelText: "CORE_COMMON_NAME",
      hintText: "CORE_COMMON_NAME_PLACEHOLDER",
      errorMessage: "CORE_COMMON_NAME_VALIDMSG",
    },
    fatherHusbandName: {
      id: "owner-husband-or-father-name",
      jsonPath: "",
      floatingLabelText: "PT_OWNER_DETAILS_FATHER_OR_HUSBAND_NAME",
      hintText: "PT_OWNER_DETAILS_FATHER_OR_HUSBAND_NAME_PLACEHOLDER",
      errorMessage: "CORE_COMMON_NAME_VALIDMSG",
    },
    aadharNumber: {
      id: "owner-aadhar-number",
      jsonPath: "",
      floatingLabelText: "PT_OWNER_DETAILS_AADHAR_NUMBER",
      hintText: "PT_OWNER_DETAILS_AADHAR_PLACEHOLDER",
      errorMessage: "PT_OWNER_DETAILS_AADHAR_ERRORMSG",
    },
    mobileNumber: {
      id: "owner-mobile-number",
      jsonPath: "",
      required: true,
      floatingLabelText: "CORE_COMMON_MOBILE_NUMBER",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
    },
    address: {
      id: "owner-corresspondance-address",
      jsonPath: "",
      floatingLabelText: "PT_OWNER_DETAILS_ADDRESS",
      hintText: "PT_OWNER_DETAILS_ADDRESS_PLACEHOLDER",
      errorMessage: "PT_OWNER_DETAILS_ADDRESS_ERRORMSG",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
