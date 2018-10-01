import {
  getTextField,
  getSelectField,
  getCommonContainer,
  getDateField,
  getPattern
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const payeeDetails = getCommonContainer({
  paidBy: getSelectField("Paid By", "Paid By", false, ""),
  payerName: getTextField({
    label: {
      labelName: "Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Name",
      labelKey: "TL_PAYMENT_PAYER_NAME_PLACEHOLDER"
    }
  }),
  payerMobileNo: getTextField({
    label: {
      labelName: "Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_LABEL"
    },
    placeholder: {
      labelName: "Enter Payer Mobile No.",
      labelKey: "TL_PAYMENT_PAYER_MOB_PLACEHOLDER"
    },
    pattern: getPattern("Date"),
    iconObj: {
      position: "start",
      label: "+91 |"
    }
  })
});

export const chequeDetails = getCommonContainer({
  chequeNo: getTextField({
    label: {
      labelName: "Cheque No",
      labelKey: "TL_PAYMENT_CHQ_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter Cheque  no.",
      labelKey: "TL_PAYMENT_CHQ_NO_PLACEHOLDER"
    },
    required: true
  }),
  chequeDate: getDateField({
    label: { labelName: "Cheque Date" },
    placeholder: { labelName: "dd/mm/yy" },
    required: true
  }),
  chequeIFSC: getTextField({
    label: {
      labelName: "IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true
  })
});

export const cheque = getCommonContainer({
  payeeDetails,
  chequeDetails
});

export const demandDraftDetails = getCommonContainer({
  ddNo: getTextField({
    label: {
      labelName: "DD No",
      labelKey: "TL_PAYMENT_DD_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter DD  no.",
      labelKey: "TL_PAYMENT_DD_NO_PLACEHOLDER"
    },
    required: true
  }),
  ddDate: getDateField({
    label: { labelName: "DD Date" },
    placeholder: { labelName: "dd/mm/yy" },
    required: true
  }),
  ddIFSC: getTextField({
    label: {
      labelName: "IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_LABEL"
    },
    placeholder: {
      labelName: "Enter bank IFSC",
      labelKey: "TL_PAYMENT_IFSC_CODE_PLACEHOLDER"
    },
    required: true
  })
});

export const demandDraft = getCommonContainer({
  payeeDetails,
  demandDraftDetails
});

export const cardDetails = getCommonContainer({
  last4Digits: getTextField({
    label: {
      labelName: "Last 4 digits",
      labelKey: "TL_CARD_LAST_DIGITS_LABEL"
    },
    placeholder: {
      labelName: "Enter Last 4 digits of the card",
      labelKey: "TL_CARD_LAST_DIGITS_LABEL_PLACEHOLDER"
    },
    required: true
  }),
  TrxNo: getTextField({
    label: {
      labelName: "Transaction No.",
      labelKey: "TL_PAYMENT_TRANS_NO_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    required: true
  }),
  repeatTrxNo: getTextField({
    label: {
      labelName: "Re-Enter Transaction No.",
      labelKey: "TL_PAYMENT_RENTR_TRANS_LABEL"
    },
    placeholder: {
      labelName: "Enter transaction no.",
      labelKey: "TL_PAYMENT_TRANS_NO_PLACEHOLDER"
    },
    required: true
  })
});

export const card = getCommonContainer({
  payeeDetails,
  cardDetails
});

export const cash = getCommonContainer({
  payeeDetails
});
