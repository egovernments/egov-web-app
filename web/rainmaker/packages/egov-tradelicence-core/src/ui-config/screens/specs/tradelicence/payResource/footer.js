import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";


export const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const footer = getCommonApplyFooter({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: getLabel("Submit"),
      submitButtonIcon:{
        uiFramework:"custom-atoms",
        componentPath:"Icon",
        props:{
          iconName:"keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "page_change",
      path: "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=pay&status=success&number=12345"
    }
  }
});
