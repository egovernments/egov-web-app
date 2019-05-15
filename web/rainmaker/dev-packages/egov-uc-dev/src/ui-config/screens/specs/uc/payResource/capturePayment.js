// import {
//   getBreak,
//   getCommonContainer,
//   getCommonGrayCard,
//   getCommonSubHeader,
//   getSelectField,
//   getTextField,
//   getPattern,
//   getDateField,
//   getLabel,
//   getLabelWithValue
// } from "egov-ui-framework/ui-config/screens/specs/utils";
// //import { gotoApplyWithStep } from "../../utils/index";
// import get from "lodash/get";
// const onIconClick = (state, dispatch, index) => {
//   const ifscCode = get(
//     state.screenConfiguration.preparedFinalObject,
//     "ReceiptTemp[0].instrument.ifscCode"
//   );
// };
// export const capturePayment = getCommonGrayCard({
//   header: {
//     uiFramework: "custom-atoms",
//     componentPath: "Container",
//     props: {
//       style: { marginBottom: "10px" }
//     },
//     children: {
//       header: {
//         gridDefination: {
//           xs: 8
//         },
//         ...getCommonSubHeader({
//           labelName: "capturePayment",
//           labelKey: "UC_CAPTURE_PAYMENT_HEADER"
//         })
//       },
//       paymentoption: getSelectField({
//         label: {
//           labelName: "payment option",
//           labelKey: "UC_PAYMENT_OPTION_LABEL"
//         },
//         placeholder: {
//           labelName: "Select payment option ",
//           labelKey: "UC_SERVICE_OPTION_PLACEHOLDER"
//         },
//         required: true,
//         visible: true,
//         jsonPath: "searchScreen.paymentoption",
//         // sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
//         gridDefination: {
//           xs: 12,
//           sm: 6
//         },
//         data: [
//           {
//             code: "Cheque"
//           }
//         ]
//       }),

//       dummyDiv: {
//         uiFramework: "custom-atoms",
//         componentPath: "Div",
//         gridDefination: {
//           xs: 12,
//           sm: 6
//         },
//         visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
//         props: {
//           disabled: true
//         }
//       },
//       chequeNo: getTextField({
//         label: {
//           labelName: " cheque No",
//           labelKey: "UC_CHEQUE_NO_LABEL"
//         },
//         placeholder: {
//           labelName: "Enter cheque No",
//           labelKey: "UC_CHEQUE_NO_PLACEHOLDER"
//         },

//         required: true,
//         visible: true,
//         pattern: getPattern("chequeNo "),
//         errorMessage: "Invalid cheque No.",
//         jsonPath: "searchScreen.chequeNo "
//       }),
//       chequeDate: getDateField({
//         label: {
//           labelName: "cheque Date",
//           labelKey: "UC_CHEQUE_DATE_LABEL"
//         },
//         placeholder: {
//           labelName: "DD/MM/YY",
//           labelKey: "UC_SELECT_CHEQUE_DATE_PLACEHOLDER"
//         },
//         gridDefination: {
//           xs: 12,
//           sm: 6
//         },
//         required: true,
//         pattern: getPattern("Date"),
//         jsonPath: "Licenses[0]. chequeDate"
//       }),
//       ifscCode: getTextField({
//         label: {
//           labelName: "Ifsc Code",
//           labelKey: "UC_IFSC_CODE_LABEL"
//         },
//         placeholder: {
//           labelName: "enter ifsc code ",
//           labelKey: "UC_IFSC_CODE_PLACEHOLDER"
//         },

//         gridDefination: {
//           xs: 12,
//           sm: 6
//         },
//         required: true,
//         pattern: getPattern("Date"),
//         jsonPath: "Licenses[0].ifscnp,Code",
//         iconObj: {
//           iconName: "search",
//           position: "end",
//           color: "#FE7A51",
//           onClickDefination: {
//             action: "condition",
//             callBack: (state, dispatch) => {
//               onIconClick(state, dispatch, 1);
//             }
//           }
//         }
//       })
//     }
//   }
// });
import {
  getCommonGrayCard,
  getCommonSubHeader
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { cash, demandDraft, cheque, card } from "./paymentMethod";

export const capturePayment = getCommonGrayCard({
  header: getCommonSubHeader(
    { labelName: "Capture Payment", labelKey: "TL_PAYMENT_CAP_PMT" },
    {
      style: {
        marginBottom: "8px"
      }
    }
  ),
  tabSection: {
    uiFramework: "custom-containers",
    moduleName: "egov-uc",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [
        {
          tabButton: { labelName: "CASH", labelKey: "TL_PAYMENT_CASH" },
          tabIcon: "Dashboard",
          tabContent: { cash }
        },
        {
          tabButton: { labelName: "CHEQUE", labelKey: "TL_PAYMENT_CHQ" },
          tabIcon: "Schedule",
          tabContent: { cheque }
        },
        {
          tabButton: { labelName: "DD", labelKey: "TL_PAYMENT_DD" },
          tabIcon: "Schedule",
          tabContent: { demandDraft }
        },
        {
          tabButton: {
            labelName: "Credit/Debit Card",
            labelKey: "TL_PAYMENT_DEBT_CARD"
          },
          tabIcon: "Schedule",
          tabContent: { card }
        }
      ]
    },
    type: "array"
  }
});

export default capturePayment;
