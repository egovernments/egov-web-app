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
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      errorMessage: "Enter 4 digits",
    },
    receiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Transaction No.",
      hintText: "Enter transaction no.",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      jsonPath: "Receipt[0].instrument.transactionNumber",
    },
    confirmReceiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Re-Enter Transaction No.",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
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
