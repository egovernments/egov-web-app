import {
  getLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import "./index.css";

export const footer = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  props: {
    className: "apply-wizard-footer",
    style: {
      textAlign: "center"
    }
  },
  children: {
    printButton: {
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
        printButtonLabel: getLabel({
          labelName: "Print",
          labelKey: "NOC_COMMON_BUTTON_PRINT"
        })
      },
      visible: true
      //Add onClickDefinition:
    },
    applyButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "45px"
        }
      },
      children: {
        applyButtonLabel: getLabel({
          labelName: "Apply",
          labelKey: "NOC_COMMON_BUTTON_APPLY"
        })
      },
      visible: true
      //Add onClickDefinition:
    }
  }
};
