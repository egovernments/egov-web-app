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
  TrxNo: getTextField("Transaction No.", "Enter transaction no.", true, ""),
  repeatTrxNo: getTextField(
    "Re-Enter Transaction No.",
    "Enter transaction no.",
    true,
    ""
  )
});

export const card = getCommonContainer({
  payeeDetails,
  header: getCommonSubHeader("Card Details: "),
  cardDetails
});
