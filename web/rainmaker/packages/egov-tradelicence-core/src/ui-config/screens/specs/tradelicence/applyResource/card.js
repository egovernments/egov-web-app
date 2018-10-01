import {
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { payeeDetails } from "./payeeDetails";

export const cardDetails = getCommonContainer({
  last4Digits: getSelectTextField(
    "Last 4 digits",
    "Enter Last 4 digits of the card",
    true,
    ""
  ),
  TrxNo: getTextField(
    {
      labelName: "Transaction No.",
      labelKey: "TL_PAYMENT_TRANS_NO_LABEL"
    },
    {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    true,
    ""
  ),
  repeatTrxNo: getTextField(
    {
      labelName: "Re-Enter Transaction No.",
      labelKey: "TL_PAYMENT_RENTR_TRANS_LABEL"
    },
    {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    true,
    ""
  )
});

export const card = getCommonContainer({
  payeeDetails,
  header: getCommonSubHeader("Card Details: "),
  cardDetails
});
