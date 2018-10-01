import {
  getTextField,
  getCommonContainer,
  getDateField,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { payeeDetails } from "./payeeDetails";

export const demandDraftDetails = getCommonContainer({
  ddNo: getTextField(
    {
      labelName: "DD No",
      labelKey: "TL_PAYMENT_DD_NO_LABEL"
    },
    {
      labelName: "Enter DD  no.",
      labelKey: "TL_PAYMENT_DD_NO_PLACEHOLDER"
    },
    true,
    ""
  ),
  ddDate: getDateField("DD Date", "dd/mm/yy", true, ""),
  ddIFSC: getTextField(
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

export const demandDraft = getCommonContainer({
  payeeDetails,
  header: getCommonSubHeader("Demand Draft Details: "),
  demandDraftDetails
});
