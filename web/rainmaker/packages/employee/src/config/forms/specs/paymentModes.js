import { removeForm } from "egov-ui-kit/redux/form/actions";

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
        { label: "Credit/Debit Card", value: "Card" },
      ],
      value: "Cash",
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        const allFormkeys = ["demandInfo", "chequeInfo", "cardInfo", "cashInfo"];
        allFormkeys.forEach((item) => {
          dispatch(removeForm(item));
        });
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
