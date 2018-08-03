const formConfig = {
  name: "receiptInfo",
  fields: {
    receiptNo: {
      id: "receiptNo",
      type: "textfield",
      floatingLabelText: "G8 receipt No",
      hintText: "Enter G8 receipt No",
      required: true
    },
    receiptDate: {
      id: "receiptDate",
      type: "textfield",
      floatingLabelText: "G8 receipt issue date.",
      hintText: "dd/mm/yy",
      required: true,
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: ""
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

export default formConfig;
