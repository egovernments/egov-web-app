const formConfig = {
  name: "chequeInfo ",
  fields: {
    chequeNo: {
      id: "chequeNo",
      type: "textfield",
      floatingLabelText: "Cheque No",
      hintText: "Enter cheque no.",
      required: true
    },
    chequeDate: {
      id: "chequeDate",
      type: "textfield",
      floatingLabelText: "Cheque Date",
      hintText: "dd/mm/yy",
      required: true,
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: ""
    },
    BankName: {
      id: "BankName",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Name",
      dropDownData: [{ label: "SBI", value: "SBI" }, { label: "Other", value: "Other" }]
    },
    BankBranch: {
      id: "BankBranch",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Branch",
      dropDownData: [{ label: "Bengaluru", value: "Bengaluru" }, { label: "Other", value: "Other" }]
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

export default formConfig;
