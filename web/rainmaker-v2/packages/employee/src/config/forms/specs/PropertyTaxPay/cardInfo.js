const formConfig = {
  name: "cardInfo",
  fields: {
    cardDigits: {
      id: "demandNo",
      type: "textfield",
      floatingLabelText: "Last 4 digits",
      hintText: "Enter last 4 digits of the card",
      required: true
    },
    receiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Transaction No.",
      hintText: "Enter transaction no."
    },
    confirmReceiptNo: {
      id: "receiptNo",
      required: true,
      type: "textfield",
      floatingLabelText: "Re-Enter Transaction No.",
      hintText: "Enter transaction no."
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

export default formConfig;
