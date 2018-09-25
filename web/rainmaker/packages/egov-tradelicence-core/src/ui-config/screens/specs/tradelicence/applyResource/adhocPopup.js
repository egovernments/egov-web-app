import {
  getCommonHeader,
  getTextField,
  getSelectTextField,
  getCommonContainer,
  getCommonSubHeader,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

export const adhocPopup = getCommonContainer({
  header: getCommonHeader("Add Adhoc Penalty/Rebate"),
  adhocPenaltyCard: getCommonContainer(
    {
      subheader: getCommonSubHeader("Adhoc Penalty"),
      penaltyAmountAndReasonContainer: getCommonContainer({
        penaltyAmount: getTextField(
          "Adhoc Penalty Amount",
          "Enter Adhoc Charge Amount",
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
        "Enter Comments",
        "Enter Comments",
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
        "Adhoc Rebate Amount",
        "Enter Adhoc Rebate Amount",
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
