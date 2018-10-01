import {
  getTextField,
  getCommonContainer,
  getCommonSubHeader,
  getDateField
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { payeeDetails } from "./payeeDetails";

export const chequeDetails = getCommonContainer({
  chequeNo: getTextField(
    {
      labelName: "Cheque No",
      labelKey: "TL_PAYMENT_CHQ_NO_LABEL"
    },
    {
      labelName: "Enter Cheque  no.",
      labelKey: "TL_PAYMENT_CHQ_NO_PLACEHOLDER"
    },
    true,
    ""
  ),
  chequeDate: getDateField("Cheque Date", "dd/mm/yy", true, ""),
  chequeIFSC: getTextField(
    {
      labelName: "IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_LABEL"
    },
    {
      labelName: "Enter bank IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    true,
    ""
  )
});

export const cheque = getCommonContainer({
  payeeDetails,
  header: getCommonSubHeader("Cheque Details: "),
  chequeDetails
});
