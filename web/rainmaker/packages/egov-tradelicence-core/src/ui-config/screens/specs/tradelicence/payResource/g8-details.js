import {
  getCommonGrayCard,
  getCommonSubHeader,
  getTextField,
  getCommonContainer
} from "mihy-ui-framework/ui-config/screens/specs/utils";

const g8Details = getCommonGrayCard({
  header: getCommonSubHeader("G8 Receipt Details (Optional)"),
  receiptDetailsCardContainer: getCommonContainer({
    receiptNo: getTextField(
      "G8 Receipt No.",
      "Enter G8 Receipt No.",
      false,
      ""
    ),
    receiptIssueDate: getTextField(
      "G8 Receipt Issue Date",
      "Enter G8 Receipt Issue Date",
      false,
      "",
      "",
      {
        position: "end",
        iconName: "date_range"
      }
    )
  })
});

export default g8Details;
