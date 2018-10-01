import {
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getDateField,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const payeeDetails = getCommonContainer({
  paidBy: getSelectTextField("Paid By", "Paid By", false, ""),
  payerName: getTextField(
    {
      labelName: "Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_LABEL"
    },
    {
      labelName: "Enter Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_PLACEHOLDER"
    },
    false,
    ""
  ),
  payerMobileNo: getTextField(
    {
      labelName: "Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_LABEL"
    },
    {
      labelName: "Enter Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    false,
    getPattern("Date"),
    "",
    {
      position: "start",
      label: "+91 |"
    }
  )
});

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
  chequeDate: getDateField("Cheque Date", "dd/mm/yy", true, "", "", {}),
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
  chequeDetails
});

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
  ddDate: getDateField("DD Date", "dd/mm/yy", true, "", "", {}),
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
  demandDraftDetails
});

export const cardDetails = getCommonContainer({
  last4Digits: getTextField(
    {
      labelName: "Last 4 digits",
      labelKey: "TL_CARD_LAST_DIGITS_LABEL"
    },
    {
      labelName: "Enter Last 4 digits of the card",
      labelKey: "TL_CARD_LAST_DIGITS_LABEL_PLACEHOLDER"
    },
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
  cardDetails
});

export const cash = getCommonContainer({
  payeeDetails
});
