import { removeForm, setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";

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
      beforeFieldChange: ({ dispatch, state, action }) => {
        const allFormkeys = ["demandInfo", "chequeInfo", "cardInfo", "cashInfo"];
        const formKeysInRedux = state && state.form && Object.keys(state.form);
        let formsToRemove = [];
        switch (action.value) {
          case "Cash":
            formsToRemove.push("demandInfo", "chequeInfo", "cardInfo");
            break;
          case "DD":
            formsToRemove.push("chequeInfo", "cardInfo");
            break;
          case "Cheque":
            formsToRemove.push("demandInfo", "cardInfo");
            break;
          case "Card":
            formsToRemove.push("demandInfo", "chequeInfo");
            break;
          default:
            formsToRemove.push("demandInfo", "chequeInfo", "cardInfo");
            break;
        }
        formsToRemove.forEach((item) => {
          if (formKeysInRedux.indexOf(item) > -1) {
            dispatch(removeForm(item));
          }
        });
        dispatch(toggleSnackbarAndSetText(false, "", false));
        return action;
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
