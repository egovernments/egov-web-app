const formConfig = {
  name: "cardInfo",
  fields: {
    cardDigits: {
      id: "demandNo",
      type: "textfield",
      floatingLabelText: "Last 4 digits",
      hintText: "Enter last 4 digits of the card",
      required: true,
      pattern: "^([0-9]){4}$",
      jsonPath: "Receipt[0].instrument.instrumentNumber",
      errorMessage: "Enter 4 digits",
    },
    receiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Transaction No.",
      hintText: "Enter transaction no.",
      jsonPath: "Receipt[0].instrument.transactionNumber",
    },
    confirmReceiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Re-Enter Transaction No.",
      hintText: "Enter transaction no.",
      jsonPath: "Receipt[0].instrument.transactionNumberConfirm",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
