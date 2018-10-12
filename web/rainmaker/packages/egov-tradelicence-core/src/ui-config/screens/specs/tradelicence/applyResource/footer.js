import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import get from "lodash/get";
import some from "lodash/some";


import { getButtonVisibility, getCommonApplyFooter } from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { validate } from "mihy-ui-framework/ui-redux/screen-configuration/utils";
import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";
import { createEstimateData } from "../../utils";
import "./index.css"

import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";

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

const generatePdfFromDiv = (action, applicationNumber) => {
  let target = document.querySelector("#custom-atoms-div");
  html2canvas(target, {
    onclone: function(clonedDoc) {
      // clonedDoc.getElementById("custom-atoms-footer").style = "width: 900px"; //Not Working
      clonedDoc.getElementById("custom-atoms-footer")[
        "data-html2canvas-ignore"
      ] = "true";
    }
  }).then(canvas => {
    var data = canvas.toDataURL();
    var docDefinition = {
      content: [
        {
          image: data,
          width: 500
        }
      ]
    };
    if (action === "download") {
      pdfMake
        .createPdf(docDefinition)
        .download(`preview-${applicationNumber}.pdf`);
    } else if (action === "print") {
      pdfMake.createPdf(docDefinition).print();
    }
  });
};

export const callBackForNext = (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  // console.log(activeStep);
  let isFormValid = true;
  if (activeStep === 0) {
    const isTradeDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children",
      state,
      dispatch
    );
    const isTradeLocationValid=validateFields("components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children",state,dispatch);
    let accessoriesJsonPath="components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.accessoriesCard.props.items";
    let accessories=get(state.screenConfiguration.screenConfig.apply,accessoriesJsonPath,[]);
    let isAccessoriesValid=true;
    for (var i = 0; i < accessories.length; i++) {
      if(!validateFields(`${accessoriesJsonPath}[${i}].item${i}.children.cardContent.children.accessoriesCardContainer.children`,state,dispatch)) isAccessoriesValid=false;
    }
    const isTradeUnitValid=validateFields("components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.multipleTradeUnitCard.children.cardContent.children.tradeUnitCardContainer.children",state,dispatch);
    if (!isTradeDetailsValid || !isTradeLocationValid || !isAccessoriesValid || !isTradeUnitValid) {
      isFormValid=false;
    }
  }
  if (activeStep === 1) {
    let ownership=get(state.screenConfiguration.preparedFinalObject,"LicensesTemp[0].tradeLicenseDetail.ownerShipCategory","INDIVIDUAL");
    if (ownership==="INDIVIDUAL") {
      let ownersJsonPath="components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
      let owners=get(state.screenConfiguration.screenConfig.apply,ownersJsonPath,[])
      for (var i = 0; i < owners.length; i++) {
        if(!validateFields(`${ownersJsonPath}[${i}].item${i}.children.cardContent.children.tradeUnitCardContainer.children`,state,dispatch)) isFormValid=false;
      }
    } else {
      let ownersJsonPath="components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional.props.items";
      let owners=get(state.screenConfiguration.screenConfig.apply,ownersJsonPath,[])
      for (var i = 0; i < owners.length; i++) {
        if(!validateFields(`${ownersJsonPath}[${i}].item${i}.children.cardContent.children.tradeUnitCardContainer.children`,state,dispatch)) isFormValid=false;
      }
    }
    if (isFormValid) {
      applyTradeLicense(state, dispatch);
    }
  }
  if (activeStep === 2) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]",{}
    );

    const uploadedDocData = get(
      LicenseData,
      "tradeLicenseDetail.applicationDocuments",[]
    );

    const uploadedTempDocData= get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].applicationDocuments",[]
    );

    for (var i = 0; i < uploadedTempDocData.length; i++) {
      if (uploadedTempDocData[i].required && !some(uploadedDocData,{documentType:uploadedTempDocData[i].name})) {
        isFormValid=false;
      }
    }
    // console.log(uploadedDocData);
    if (isFormValid) {
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
    else {
      alert("please upload requied documents");
    }
  }
  if (activeStep === 3) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]"
    );
    applyTradeLicense(state, dispatch);
    moveToSuccess(LicenseData, dispatch);
  }
  if (isFormValid) {
    changeStep(state, dispatch);
  }
};

export const validateFields = (objectJsonPath, state, dispatch) => {
  console.log(
    get(state.screenConfiguration.screenConfig.apply, objectJsonPath,{})
  );
  const fields = get(
    state.screenConfiguration.screenConfig.apply,
    objectJsonPath,{}
  );
  let isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled===undefined || !fields[variable].props.disabled) && !validate("apply", {...fields[variable],value:fields[variable].props.value}, dispatch)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
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
                  height: "40px",
                  marginLeft: "24px",
                  border: "none",
                  backgroundColor: "#F2F2F2"
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
                  labelKey: "TL_COMMON_DOWNLOAD",
                  style: {
                    marginLeft: "10px",
                    marginRight: "10px"
                  }
                })
                // dropdown: {
                //   uiFramework: "custom-atoms",
                //   componentPath: "Icon",
                //   props: {
                //     style: {
                //       float: "right"
                //     },
                //     iconName: "arrow_drop_down"
                //   }
                // }
              },
              onClickDefination: {
                action: "condition",
                callBack: () => {
                  generatePdfFromDiv("download", applicationNumber);
                }
              },
              visible: true
            },
            printButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                style: {
                  width: "200px",
                  height: "40px",
                  marginLeft: "16px",
                  border: "none",
                  backgroundColor: "#F2F2F2"
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
                  labelKey: "TL_COMMON_PRINT",
                  style: {
                    marginLeft: "10px",
                    marginRight: "10px"
                  }
                })
                // dropdown: {
                //   uiFramework: "custom-atoms",
                //   componentPath: "Icon",
                //   props: {
                //     iconName: "arrow_drop_down"
                //   }
                // }
              },
              onClickDefination: {
                action: "condition",
                callBack: () => {
                  generatePdfFromDiv("print", applicationNumber);
                }
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
              roleDefination: {
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
              roleDefination: {
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
                path: `/mihy-ui-framework/tradelicence/pay?applicationNumber=${applicationNumber}&tenantId=${tenantId}&businessService=TL`
              },
              visible: getButtonVisibility(status, "PROCEED TO PAYMENT"),
              roleDefination: {
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
              visible: getButtonVisibility(status, "CANCEL TRADE LICENSE"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_APPROVER"]
              }
            }
          },
          gridDefination: {
            xs: 12,
            sm: 6
          }
        }
      }
    }
  });
};
