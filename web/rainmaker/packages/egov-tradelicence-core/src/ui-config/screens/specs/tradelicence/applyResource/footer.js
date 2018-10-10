import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import get from "lodash/get";

import { getButtonVisibility, getCommonApplyFooter } from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";
import { createEstimateData } from "../../utils";

const moveToSuccess = (LicenseData, dispatch) => {
  const applicationNo = get(LicenseData, "applicationNumber");
  const tenantId = get(LicenseData, "tenantId");
  const purpose = "apply";
  const status = "success";
  dispatch(
    setRoute(
      `/mihy-ui-framework/tradelicence/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}`
    )
  );
};

export const callBackForNext = (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  console.log(activeStep);
  if (activeStep === 1) applyTradeLicense(state, dispatch);
  if (activeStep === 2) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]"
    );
    const uploadedDocData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0].tradeLicenseDetail.applicationDocuments"
    );
    console.log(uploadedDocData);
    const reviewDocData = uploadedDocData.map(item => {
      return {
        title: item.documentType,
        link: item.fileUrl.split(",")[0],
        linkText: "View",
        name: item.fileName
      };
    });
    createEstimateData(
      LicenseData,
      "LicensesTemp[0].estimateCardData",
      dispatch
    ); //get bill and populate estimate card
    console.log(reviewDocData);
    dispatch(
      prepareFinalObject("LicensesTemp[0].reviewDocData", reviewDocData)
    );
  }
  if (activeStep === 3) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]"
    );
    applyTradeLicense(state, dispatch);
    moveToSuccess(LicenseData, dispatch);
  }
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

// export const getCommonApplyFooter = children => {
//   return {
//     uiFramework: "custom-atoms",
//     componentPath: "Div",
//     props: {
//       className: "apply-wizard-footer"
//     },
//     children
//   };
// };

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
      previousButtonLabel: getLabel({
        labelName: "Previous Step",
        labelKey: "TL_COMMON_BUTTON_PREV_STEP"
      })
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
      nextButtonLabel: getLabel({
        labelName: "Next Step",
        labelKey: "TL_COMMON_BUTTON_NXT_STEP"
      }),
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
      submitButtonLabel: getLabel({
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
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
    },
    visible: false
  }
});

export const footerReview = (status, applicationNumber, tenantId) => {
  return getCommonApplyFooter({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left" }
          },
          children: {
            downloadButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
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
                nextButtonLabel: getLabel({
                  labelName: "Download",
                  labelKey: "TL_COMMON_DOWNLOAD"
                }),
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
                nextButtonLabel: getLabel({
                  labelName: "Print",
                  labelKey: "TL_COMMON_PRINT"
                }),
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
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        },
        rightdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
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
                nextButtonLabel: getLabel({
                  labelName: "Reject",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/mihy-ui-framework/tradelicence/approve?purpose=reject&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "REJECT"),
              rolesDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
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
                nextButtonLabel: getLabel({
                  labelName: "APPROVE",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/mihy-ui-framework/tradelicence/approve?applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "APPROVE"),
              rolesDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
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
                nextButtonLabel: getLabel({
                  labelName: "PROCEED TO PAYMENT",
                  labelKey: "TL_COMMON_BUTTON_PROC_PMT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path:
                  "/pay?applicationNumber=${applicationNumber}&tenantId=pb.amritsar&businessService=TL"
              },
              visible: getButtonVisibility(status, "PROCEED TO PAYMENT"),
              rolesDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_CEMP"]
              }
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
                nextButtonLabel: getLabel({
                  labelName: "CANCEL TRADE LICENSE",
                  labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: `/mihy-ui-framework/tradelicence/approve?purpose=cancel&applicationNumber=${applicationNumber}&tenantId=${tenantId}`
              },
              visible: getButtonVisibility(status, "CANCEL TRADE LICENSE")
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          },
          rolesDefination: {
            rolePath: "user-info.roles",
            roles: ["TL_APPROVER"]
          }
        }
      }
    }
  });
};
