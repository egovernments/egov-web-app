const formConfig = {
  name: "demandInfo ",
  fields: {
    demandNo: {
      id: "demandNo",
      type: "textfield",
      floatingLabelText: "Demand draft No",
      hintText: "Enter cheque no.",
      required: true,
    },
    demandDate: {
      id: "demandDate",
      type: "textfield",
      floatingLabelText: "Issue Date",
      hintText: "dd/mm/yy",
      required: true,
      // pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "",
    },
    BankName: {
      id: "BankName",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Name",
      dropDownData: [{ label: "SBI", value: "SBI" }, { label: "Other", value: "Other" }],
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    },
    BankBranch: {
      id: "BankBranch",
      required: true,
      value: "Select",
      type: "singleValueList",
      floatingLabelText: "Bank Branch",
      dropDownData: [{ label: "Bengaluru", value: "Bengaluru" }, { label: "Other", value: "Other" }],
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
