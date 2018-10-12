import {
  getCommonHeader,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonSubHeader,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { showHideAdhocPopup } from "../../utils";
import get from "lodash/get";
import { httpRequest } from "ui-utils/api";
import cloneDeep from "lodash/cloneDeep";
import { createEstimateData } from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

const getEstimateDataAfterAdhoc = async (state, dispatch) => {
  const TLRequestBody = cloneDeep(
    get(state.screenConfiguration.preparedFinalObject, "Licenses")
  );
  const TLpayload = await httpRequest(
    "post",
    "/tl-services/v1/_update",
    "",
    [],
    { Licenses: TLRequestBody }
  );

  // clear data from form

  const billPayload = await createEstimateData(
    [],
    "LicensesTemp[0].estimateCardData",
    dispatch,
    window.location.href
  );

  //get deep copy of bill in redux - merge new bill after adhoc
  const billInRedux = cloneDeep(
    get(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].Bill[0]")
  );
  const mergedBillObj = { ...billInRedux, ...billPayload.Bill[0] };

  //merge bill in Receipt obj
  billPayload &&
    dispatch(prepareFinalObject("ReceiptTemp[0].Bill[0]", mergedBillObj));

  //set amount paid as total amount from bill
  billPayload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].Bill[0].billDetails[0].amountPaid",
        billPayload.Bill[0].billDetails[0].totalAmount
      )
    );

  //set total amount in instrument
  billPayload &&
    dispatch(
      prepareFinalObject(
        "ReceiptTemp[0].instrument.amount",
        billPayload.Bill[0].billDetails[0].totalAmount
      )
    );

  showHideAdhocPopup(state, dispatch);
};

const updateAdhoc = (state, dispatch) => {
  getEstimateDataAfterAdhoc(state, dispatch);
};

export const adhocPopup = getCommonContainer({
  header: getCommonHeader({
    labelName: "Add Adhoc Penalty/Rebate",
    labelKey: "TL_ADD_HOC_CHARGES_POPUP_HEAD"
  }),
  adhocPenaltyCard: getCommonContainer(
    {
      subheader: getCommonSubHeader({
        labelName: "Adhoc Penalty",
        labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_FIRST"
      }),
      penaltyAmountAndReasonContainer: getCommonContainer({
        penaltyAmount: getTextField({
          label: {
            labelName: "Adhoc Penalty Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Adhoc Charge Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocPenalty"
        }),
        penaltyReason: getSelectField({
          label: {
            labelName: "Reason for Adhoc Penalty",
            labelKey: "TL_PAYMENT_PENALTY_REASON"
          },
          placeholder: {
            labelName: "Select reason for Adhoc Penalty",
            labelKey: "TL_PAYMENT_PENALTY_REASON_SELECT"
          },
          data: [
            {
              code: "Pending dues from earlier"
            },
            {
              code: "Miscalculation of earlier assessment"
            },
            {
              code: "One time Penalty"
            },
            {
              code: "Others"
            }
          ],
          jsonPath: "Licenses[0].tradeLicenseDetail.adhocPenaltyReason"
        })
      }),
      commentsField: getTextField({
        label: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.penaltyComments"
      })
    },
    {
      style: {
        marginTop: "24px"
      }
    }
  ),
  adhocRebateCard: getCommonContainer({
    subHeader: getCommonSubHeader({
      labelName: "Adhoc Rebate",
      labelKey: "TL_ADD_HOC_CHARGES_POPUP_SUB_SEC"
    }),
    rebateAmountAndReasonContainer: getCommonContainer({
      rebateAmount: getTextField({
        label: {
          labelName: "Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
        },
        placeholder: {
          labelName: "Enter Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemption"
      }),
      rebateReason: getSelectField({
        label: {
          labelName: "Reason for Adhoc Rebate",
          labelKey: "TL_PAYMENT_REBATE_REASON"
        },
        placeholder: {
          labelName: "Select Reason for Adhoc Rebate",
          labelKey: "TL_PAYMENT_REBATE_REASON_SELECT"
        },
        data: [
          {
            code: "Advanced paid by citizen earlier"
          },
          {
            code: "Rebate provided by commissioner/EO"
          },
          {
            code: "Additional amount charged from the citizen"
          },
          {
            code: "Others"
          }
        ],
        jsonPath: "Licenses[0].tradeLicenseDetail.adhocExemptionReason"
      }),
      rebateCommentsField: getTextField({
        label: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        jsonPath: "Licenses[0].tradeLicenseDetail.rebateComments"
      })
    })
  }),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "right"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            width: "200px",
            height: "48px",
            marginRight: "16px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: showHideAdhocPopup
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            width: "200px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: getLabel({
            labelName: "ADD",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_BUTTON_ADD"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhoc
        }
      }
    }
  }
});
