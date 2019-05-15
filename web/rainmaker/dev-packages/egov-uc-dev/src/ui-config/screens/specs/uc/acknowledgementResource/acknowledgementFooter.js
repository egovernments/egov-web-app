import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { generateReciept } from "../../utils/recieptPdf";

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

const redirectionURL = "/egov-ui-framework/uc/search";

export const acknowledgementSuccesFooter = getCommonApplyFooter({
  goToHomeButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: redirectionURL
    }
  },

  viewReceiptButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "VIEW RECEIPT",
        labelKey: "UC_BUTTON_VIEW_RECEIPT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        viewReceipt(state, dispatch);
      }
    }
  }
});
export const acknowledgementFailureFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: redirectionURL
    }
  }
});

const viewReceipt = (state, dispatch) => {
  generateReciept(state, dispatch);
};