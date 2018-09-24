import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";
import generateReceipt from "../../utils/receiptPdf";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const paymentSuccessFooter = getCommonApplyFooter({
  downloadReceiptButton: {
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
      downloadReceiptButtonLabel: getLabel("DOWNLOAD RECEIPT")
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generateReceipt(state, dispatch, "receipt");
      }
    }
  },
  printReceiptButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      printReceiptButtonLabel: getLabel("PRINT RECEIPT")
    }
  }
});
