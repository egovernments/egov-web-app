const formConfig = {
  name: "paymentModes",
  fields: {
    mode: {
      id: "mode",
      jsonPath: "Receipt[0].instrument.instrumentType.name",
      required: true,
      type: "singleValueList",
      floatingLabelText: "Mode of payment",
      hintText: "Select payment mode",
      dropDownData: [
        { label: "Cash", value: "Cash" },
        { label: "DD", value: "DD" },
        { label: "Cheque", value: "Cheque" },
        { label: "Credit/Debit", value: "Credit/Debit" },
      ],
      value: "Cash",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
