const formConfig = {
  name: "cashInfo",
  fields: {
    paidBy: {
      id: "paidBy",
      required: true,
      hintText: "Please Select",
      type: "singleValueList",
      floatingLabelText: "Paid By",
      jsonPath: "Receipt[0].Bill[0].payer",
      dropDownData: [{ label: "Owner", value: "Owner" }, { label: "Other", value: "Other" }],
      value: "",
    },
    payerName: {
      id: "payerName",
      type: "textfield",
      floatingLabelText: "Payer Name",
      hintText: "Enter payer Name",
      jsonPath: "Receipt[0].Bill[0].paidBy",
      required: true,
      value: "",
    },
    payerMobile: {
      id: "ownerMobile",
      type: "textfield",
      floatingLabelText: "Payer Mobile No.",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      jsonPath: "Receipt[0].Bill[0].mobileNumber",
      required: true,
      pattern: /^([0]|((\+\d{1,2}[-]{0,1})))?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
      value: "",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
