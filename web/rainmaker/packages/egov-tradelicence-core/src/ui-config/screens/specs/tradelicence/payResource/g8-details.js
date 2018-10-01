import {
  getCommonGrayCard,
  getCommonSubHeader,
  getTextField,
  getDateField,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const g8Details = getCommonGrayCard({
  header: getCommonSubHeader("G8 Receipt Details (Optional)"),
  receiptDetailsCardContainer: getCommonContainer({
    receiptNo: getTextField(
      { labelName: "G8 Receipt No.", labelKey: "TL_PAYMENT_RCPT_NO_LABEL" },
      {
        labelName: "Enter G8 Receipt No.",
        labelKey: "TL_PAYMENT_RCPT_NO_PLACEHOLDER"
      },
      false,
      ""
    ),
    receiptIssueDate: getDateField(
      "G8 Receipt Issue Date",
      "Enter G8 Receipt Issue Date",
      false,
      "",
      "",
      {}
    )
  })
});

export default g8Details;
