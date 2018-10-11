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
  gotoHome: {
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
      downloadReceiptButtonLabel: getLabel({
        labelName: "GO TO HOME",
        labelKey: "TL_COMMON_BUTTON_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `/mihy-ui-framework/tradelicence/search`
    }
  },
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
      downloadReceiptButtonLabel: getLabel({
        labelName: "DOWNLOAD RECEIPT",
        labelKey: "TL_CONFIRMATION_BUTTON_DOWN_REPT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generateReceipt(state, dispatch, "receipt_download");
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
      printReceiptButtonLabel: getLabel({
        labelName: "PRINT RECEIPT",
        labelKey: "TL_CONFIRMATION_BUTTON_PRT_REPT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generateReceipt(state, dispatch, "receipt_print");
      }
    }
  }
});
