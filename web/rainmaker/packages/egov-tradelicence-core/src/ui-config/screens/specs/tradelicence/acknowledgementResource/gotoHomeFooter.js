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

export const gotoHomeFooter = getCommonApplyFooter({
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
      downloadReceiptButtonLabel: getLabel("GO TO HOME")
    }
    // onClickDefination: {
    //   action: "condition",
    //   callBack: (state, dispatch) => {
    //     generateReceipt(state, dispatch, "receipt");
    //   }
    // }
  }
});
