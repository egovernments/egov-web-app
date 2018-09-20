import {
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getCommonSubHeader,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const payeeDetails = getCommonContainer({
  paidBy: getSelectTextField("Paid By", "Paid By", false, ""),
  payerName: getTextField("Payer Name", "Enter Payer Name", false, ""),
  payerMobileNo: getTextField(
    "Payer Mobile No.",
    "Enter Payer Mobile No.",
    false,
    getPattern("Date"),
    "",
    {
        position:"start",
        label:"+91 |",
     }
  )
});

export const chequeDetails = getCommonContainer({
  chequeNo: getTextField("Cheque No", "Enter Cheque  no.", true, ""),
  chequeDate: getTextField("Cheque Date", "dd/mm/yy", true, "", "", {
    position: "end",
    iconName: "date_range"
  }),
  chequeIFSC: getTextField("IFSC", "Enter bank IFSC", true, "")
});

export const cheque = getCommonContainer({
  payeeDetails,
  chequeDetails
});

export const demandDraftDetails = getCommonContainer({
  ddNo: getTextField("DD No", "Enter DD  no.", true, ""),
  ddDate: getTextField("DD Date", "dd/mm/yy", true, "", "", {
    position: "end",
    iconName: "date_range"
  }),
  ddIFSC: getTextField("IFSC", "Enter bank IFSC", true, "")
});

export const demandDraft = getCommonContainer({
  payeeDetails,
  demandDraftDetails
});

export const cardDetails = getCommonContainer({
  last4Digits: getTextField(
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
  cardDetails
});

export const cash = getCommonContainer({
  payeeDetails
});
