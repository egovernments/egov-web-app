import { getLabel } from "mihy-ui-framework/ui-config/screens/specs/utils";

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

export const paymentFailureFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "RETRY",
        labelKey: "TL_RETRY"
      })
    },
    onClickDefination: {
    //   action: "page_change",
    //   path: `/mihy-ui-framework/tradelicence/search`
    }
  }
});
