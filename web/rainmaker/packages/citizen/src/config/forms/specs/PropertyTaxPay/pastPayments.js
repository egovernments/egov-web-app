const formConfig = {
  name: "pastPayments",
  fields: {
    receipt: {
      id: "receipt-no",
      type: "textfield",
      jsonPath: "",
      required: true,
      floatingLabelText: "Receipt No.",
      errorMessage: "",
      hintText: "Enter receipt no.",
    },
    amount: {
      id: "amount-paid",
      type: "textfield",
      jsonPath: "",
      required: true,
      floatingLabelText: "Amount Paid",
      hintText: "Enter the amount paid",
      errorMessage: "Enter valid details",
      pattern: "^[0-9]+$",
    },
    misplacedReceipt: {
      id: "rcpt",
      type: "checkbox",
      jsonPath: "",
      errorMessage: "",
      floatingLabelText: "Misplaced Receipt",
      value: "misplaced Receipt",
    },
  },
  submit: {
    label: "NEXT",
    id: "payment-submit-action",
    type: "submit",
  },
  extraDetails: [
    {
      name: "year",
      jsonPath: "res.",
      opitions: "abc[1].xyzz",
    },
  ],
  action: "_send",
  saveUrl: "/user-otp/v1/_send",
  redirectionRoute: "/citizen/user/otp",
  isFormValid: false,
  formatConfig: ({ config, index }) => {
    const updatedConfig = {
      ...config,
      fields: {
        ...config.fields,
        year: {
          ...config.fields.year,
          jsonPath: `abc[${index}].xyzz`
        },
      },
    };
    return updatedConfig;
  },
};

export default formConfig;
