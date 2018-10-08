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

export const approvalSuccessFooter = getCommonApplyFooter({
  downloadLicenseButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadLicenseButtonLabel: getLabel({
        labelName: "DOWNLOAD TRADE LICENSE",
        labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        generateReceipt(state, dispatch, "tlCertificate");
      }
    }
  },
  printLicenseButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      printLicenseButtonLabel: getLabel({
        labelName: "PRINT TRADE LICENSE",
        labelKey: "TL_APPROVAL_CHECKLIST_PRINT_LIC"
      })
    }
  }
});
