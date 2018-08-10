const formConfig = {
  name: "chequeInfo ",
  fields: {
    chequeNo: {
      id: "chequeNo",
      type: "textfield",
      floatingLabelText: "Cheque No",
      hintText: "Enter cheque no.",
      jsonPath: "Receipt[0].instrument.transactionNumber",
      required: true,
    },
    chequeDate: {
      id: "chequeDate",
      type: "textfield",
      floatingLabelText: "Cheque Date",
      hintText: "dd/mm/yy",
      required: true,
      jsonPath: "Receipt[0].instrument.transactionDateInput",
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "",
    },
    BankName: {
      id: "BankName",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Name",
      dropDownData: [{ label: "RBI", value: "10101" }],
      jsonPath: "Receipt[0].bank.id",
    },
    BankBranch: {
      id: "BankBranch",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Branch",
      dropDownData: [{ label: "RBIPunjab", value: "RBIPN" }],
      jsonPath: "Receipt[0].branchName",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
