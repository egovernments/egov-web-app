import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";

import { getFooterButtons } from "../../utils";
const queryValue = getQueryArg(window.location.href, "purpose");

export const callBackForNext = (state, dispatch) => {
  changeStep(state, dispatch);
};

export const changeStep = (
  state,
  dispatch,
  mode = "next",
  defaultActiveStep = -1
) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
  } else {
    activeStep = defaultActiveStep;
  }

  const isPreviousButtonVisible = activeStep > 0 ? true : false;
  const isNextButtonVisible = activeStep < 3 ? true : false;
  const isPayButtonVisible = activeStep === 3 ? true : false;
  const actionDefination = [
    {
      path: "components.div.children.stepper.props",
      property: "activeStep",
      value: activeStep
    },
    {
      path: "components.div.children.footer.children.previousButton",
      property: "visible",
      value: isPreviousButtonVisible
    },
    {
      path: "components.div.children.footer.children.nextButton",
      property: "visible",
      value: isNextButtonVisible
    },
    {
      path: "components.div.children.footer.children.payButton",
      property: "visible",
      value: isPayButtonVisible
    }
  ];
  dispatchMultipleFieldChangeAction("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

export const renderSteps = (activeStep, dispatch) => {
  switch (activeStep) {
    case 0:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFirstStep"
        ),
        dispatch
      );
      break;
    case 1:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardSecondStep"
        ),
        dispatch
      );
      break;
    case 2:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardThirdStep"
        ),
        dispatch
      );
      break;
    default:
      dispatchMultipleFieldChangeAction(
        "apply",
        getActionDefinationForStepper(
          "components.div.children.formwizardFourthStep"
        ),
        dispatch
      );
  }
};

export const getActionDefinationForStepper = path => {
  const actionDefination = [
    {
      path: "components.div.children.formwizardFirstStep",
      property: "visible",
      value: true
    },
    {
      path: "components.div.children.formwizardSecondStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardThirdStep",
      property: "visible",
      value: false
    },
    {
      path: "components.div.children.formwizardFourthStep",
      property: "visible",
      value: false
    }
  ];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = {
      ...actionDefination[i],
      value: false
    };
    if (path === actionDefination[i].path) {
      actionDefination[i] = {
        ...actionDefination[i],
        value: true
      };
    }
  }
  return actionDefination;
};

export const callBackForPrevious = (state, dispatch) => {
  changeStep(state, dispatch, "previous");
};

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
  previousButton: {
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
      previousButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_left"
        }
      },
      previousButtonLabel: getLabel("Previous Step")
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: false
  },
  nextButton: {
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
      nextButtonLabel: getLabel("Next Step"),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  },
  payButton: {
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
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "page_change",
      path: "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=apply&status=success&number=12345"
    },
    visible: false
  }
});

export const footerApprove = getCommonApplyFooter({
  previousButton: {
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
      nextButtonLabel: getLabel("BACK")
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    }
  },

  nextButton: {
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
      nextButtonLabel: getFooterButtons()
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForNext
    }
  }
});

export const footerReview = getCommonApplyFooter({
  downloadButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "#F2F2F2",
      style: {
        width: "200px",
        height: "48px",
        marginLeft: "24px"
      }
    },
    children: {
      downloadIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "cloud_download"
        }
      },
      nextButtonLabel: getLabel("Download"),
      dropdown: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          style: {
            float: "right"
          },
          iconName: "arrow_drop_down"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: true
  },
  printButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "#F2F2F2",
      style: {
        width: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "print"
        }
      },
      nextButtonLabel: getLabel("Print"),
      dropdown: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "arrow_drop_down"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: true
  },
  rejectButton: {
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
      nextButtonLabel: getLabel("Reject")
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPrevious
    },
    visible: true
  },
  approveButton: {
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
      nextButtonLabel: getLabel("APPROVE")
    },
    onClickDefination: {
      action: "page_change",
      path: "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=approve&status=success&number=12345"
    },
    visible: true
  },
  proceedPayButton: {
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
      nextButtonLabel: getLabel("PROCEED TO PAYMENT")
    },
    onClickDefination: {
      action: "page_change",
      path: "./pay"
    },
    visible: true
  },
  cancelButton: {
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
      nextButtonLabel: getLabel("CANCEL")
    },
    onClickDefination: {
      action: "page_change",
      path: "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=cancelled&number=12345"
    },
    visible: true
  }
});
