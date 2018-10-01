import {
  getCommonHeader,
  getTextField,
  getSelectTextField,
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
        penaltyAmount: getTextField(
          {
            labelName: "Adhoc Penalty Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
          },
          {
            labelName: "Enter Adhoc Charge Amount",
            labelKey: "TL_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
          },
          false,
          ""
        ),
        penaltyReason: getSelectTextField(
          "Reason for Adhoc Penalty",
          "Others",
          false,
          ""
        )
      }),
      commentsField: getTextField(
        {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        {
          labelName: "Enter Comments",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        false,
        "",
        "",
        {},
        {
          xs: 12,
          sm: 12
        }
      )
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
      rebateAmount: getTextField(
        {
          labelName: "Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
        },
        {
          labelName: "Enter Adhoc Rebate Amount",
          labelKey: "TL_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
        },
        false,
        ""
      ),
      rebateReason: getSelectTextField(
        "Reason for Adhoc Rebate",
        "Select Reason for Adhoc Rebate",
        false,
        ""
      )
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
