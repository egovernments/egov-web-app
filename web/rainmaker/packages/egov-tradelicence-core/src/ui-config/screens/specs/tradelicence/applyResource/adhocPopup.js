import {
  getCommonHeader,
  getTextField,
  getSelectField,
  getCommonContainer,
  getCommonSubHeader,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { showHideAdhocPopup } from "../../utils";

export const adhocPopup = getCommonContainer({
  header: getCommonHeader("Add Adhoc Penalty/Rebate"),
  adhocPenaltyCard: getCommonContainer(
    {
      subheader: getCommonSubHeader("Adhoc Penalty"),
      penaltyAmountAndReasonContainer: getCommonContainer({
        penaltyAmount: getTextField({
          label: {
            labelName: "Adhoc Penalty Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
          },
          placeholder: {
            labelName: "Enter Adhoc Charge Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
          }
        }),
        penaltyReason: getSelectField({
          label: { labelName: "Reason for Adhoc Penalty" },
          placeholder: { labelName: "Others" }
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
        }
      })
    },
    {
      style: {
        marginTop: "24px"
      }
    }
  ),
  adhocRebateCard: getCommonContainer({
    subHeader: getCommonSubHeader("Adhoc Rebate"),
    rebateAmountAndReasonContainer: getCommonContainer({
      rebateAmount: getTextField({
        label: {
          labelName: "Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
        },
        placeholder: {
          labelName: "Enter Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
        }
      }),
      rebateReason: getSelectField({
        label: { labelName: "Reason for Adhoc Rebate" },
        placeholder: { labelName: "Select Reason for Adhoc Rebate" }
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
          previousButtonLabel: getLabel("CANCEL")
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
          previousButtonLabel: getLabel("ADD")
        }
      }
    }
  }
});
