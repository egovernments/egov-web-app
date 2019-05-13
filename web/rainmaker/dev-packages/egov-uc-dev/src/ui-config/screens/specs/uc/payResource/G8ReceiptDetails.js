import {
  //getBreak,
  //getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  //getSelectField,
  getTextField,
  getPattern,
  getDateField
  //getLabel,
  //getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
//import { gotoApplyWithStep } from "../../utils/index";

export const G8ReceiptDetails = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: {
        gridDefination: {
          xs: 8
        },
        ...getCommonSubHeader({
          labelName: "G8 Receipt Details(optional)",
          labelKey: "UC_G8_RECEIPT_DETAILS_HEADER"
        })
      },
      g8ReceiptNo: getTextField({
        label: {
          labelName: " g8 Receipt No",
          labelKey: "UC_RECEIPT_NO"
        },
        placeholder: {
          labelName: "Enter G8 receipt No",
          labelKey: "UC_G8_RECEIPT_NO_PLACEHOLDER"
        },

        required: true,
        visible: true,
        pattern: getPattern("g8ReceiptNo "),
        errorMessage: "Invalid g8ReceiptNo.",
        jsonPath: "searchScreen.g8ReceiptNo"
      }),
      g8ReceiptIssueDate: getDateField({
        label: {
          labelName: "g8 receipt issue Date",
          labelKey: "UC_RECEIPT_ISSUE_DATE"
        },
        placeholder: {
          labelName: "Enter g8 receipt Issue Date",
          labelKey: "UC_SELECT_RECEIPT_ISSUE_DATE_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "Licenses[0].g8ReceiptIssueDate"
      })
    }
  }
});
