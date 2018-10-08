import {
  getCommonGrayCard,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const g8Details = getCommonGrayCard({
  header: getCommonSubHeader({
    labelName: "G8 Receipt Details (Optional)",
    labelKey: "TL_PAYMENT_RCPT_DETAILS"
  }),
  receiptDetailsCardContainer: getCommonContainer({
    receiptNo: getTextField({
      label: {
        labelName: "G8 Receipt No.",
        labelKey: "TL_PAYMENT_RCPT_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter G8 Receipt No.",
        labelKey: "TL_PAYMENT_RCPT_NO_PLACEHOLDER"
      }
    }),
    receiptIssueDate: getDateField({
      label: { labelName: "G8 Receipt Issue Date" },
      placeholder: { labelName: "Enter G8 Receipt Issue Date" }
    })
  })
});

export default g8Details;
