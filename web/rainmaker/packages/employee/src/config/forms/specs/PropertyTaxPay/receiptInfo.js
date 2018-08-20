const formConfig = {
  name: "receiptInfo",
  fields: {
    receiptNo: {
      id: "receiptNo",
      type: "textfield",
      floatingLabelText: "G8 receipt No",
      hintText: "Enter G8 receipt No",
      jsonPath: "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber",
    },
    receiptDate: {
      id: "receiptDate",
      type: "textfield",
      floatingLabelText: "G8 receipt issue date",
      hintText: "dd/mm/yy",
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "",
      jsonPath: "Receipt[0].Bill[0].billDetails[0].receiptDate",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
