const formConfig = {
  name: "demandInfo ",
  fields: {
    demandNo: {
      id: "demandNo",
      type: "textfield",
      floatingLabelText: "DD No.",
      hintText: "Enter dd no.",
      jsonPath: "Receipt[0].instrument.transactionNumber",
      pattern: /^([1-9]\d{6,15})(\.\d+)?$/,
      errorMessage: "DD should be minimum 6 digits",
      required: true,
    },
    demandDate: {
      id: "demandDate",
      type: "textfield",
      floatingLabelText: "DD Date",
      hintText: "dd/mm/yy",
      required: true,
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "",
      jsonPath: "Receipt[0].instrument.transactionDateInput",
    },
    BankName: {
      id: "BankName",
      required: true,
      type: "singleValueList",
      floatingLabelText: "Bank Name",
      dropDownData: [{ label: "RBI", value: "10101" }],
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      jsonPath: "Receipt[0].instrument.bank.id",
    },
    BankBranch: {
      id: "BankBranch",
      required: true,
      type: "singleValueList",
      floatingLabelText: "Bank Branch",
      dropDownData: [{ label: "RBIPunjab", value: "RBIPN" }],
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      jsonPath: "Receipt[0].instrument.branchName",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
