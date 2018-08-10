const formConfig = {
  name: "cashInfo",
  fields: {
    payerName: {
      id: "payerName",
      type: "textfield",
      floatingLabelText: "Payer Name",
      hintText: "Enter payer Name",
      jsonPath: "Receipt[0].Bill[0].paidBy",
      required: true,
    },
    payerMobile: {
      id: "ownerMobile",
      type: "textfield",
      floatingLabelText: "Payer Mobile No.",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      jsonPath: "Receipt[0].Bill[0].mobileNumber",
      required: true,
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    paidBy: {
      id: "paidBy",
      required: true,
      value: "Select",
      hintText: "Please Select",
      type: "singleValueList",
      floatingLabelText: "Paid By",
      jsonPath: "Receipt[0].Bill[0].payer",
      dropDownData: [{ label: "Owner", value: "Owner" }, { label: "Other", value: "Other" }],
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
