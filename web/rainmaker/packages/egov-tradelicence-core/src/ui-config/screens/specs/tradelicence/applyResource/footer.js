import {
  getLabel,
  dispatchMultipleFieldChangeAction
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { applyTradeLicense } from "../../../../../ui-utils/commons";
import get from "lodash/get";
import some from "lodash/some";
import {
  getButtonVisibility,
  getCommonApplyFooter,
  setMultiOwnerForApply,
  setValidToFromVisibilityForApply,
  getDocList,
  setOwnerShipDropDownFieldChange
} from "../../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { setRoute } from "mihy-ui-framework/ui-redux/app/actions";
import {
  createEstimateData,
  validateFields,
  ifUserRoleExists
} from "../../utils";
import { toggleSnackbarAndSetText } from "mihy-ui-framework/ui-redux/app/actions";
import "./index.css";
import generateReceipt from "../../utils/receiptPdf";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
      // clonedDoc.getElementById("custom-atoms-footer")[
      //   "data-html2canvas-ignore"
      // ] = "true";
      clonedDoc.getElementById("custom-atoms-footer").style.display = "none";
    }
  }).then(canvas => {
    var data = canvas.toDataURL("image/jpeg", 1);
    var imgWidth = 200;
    var pageHeight = 295;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var doc = new jsPDF("p", "mm");
    var position = 0;

    doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(data, "PNG", 5, 5 + position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    if (action === "download") {
      doc.save(`preview-${applicationNumber}.pdf`);
    } else if (action === "print") {
      doc.autoPrint();
      window.open(doc.output("bloburl"), "_blank");
    }
  });
};

export const callBackForNext = async (state, dispatch) => {
  let activeStep = get(
    state.screenConfiguration.screenConfig["apply"],
    "components.div.children.stepper.props.activeStep",
    0
  );
  // console.log(activeStep);
  let isFormValid = true;
  let hasFieldToaster = true;
  if (activeStep === 0) {
    const data = get(state.screenConfiguration, "preparedFinalObject");
    setOwnerShipDropDownFieldChange(state, dispatch, data);

    const isTradeDetailsValid = validateFields(
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children",
      state,
      dispatch
    );
    const isTradeLocationValid = validateFields(
      "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children",
      state,
      dispatch
    );
    let accessoriesJsonPath =
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.accessoriesCard.props.items";
    let accessories = get(
      state.screenConfiguration.screenConfig.apply,
      accessoriesJsonPath,
      []
    );
    let isAccessoriesValid = true;
    for (var i = 0; i < accessories.length; i++) {
      if (
        (accessories[i].isDeleted === undefined ||
          accessories[i].isDeleted !== false) &&
        !validateFields(
          `${accessoriesJsonPath}[${i}].item${i}.children.cardContent.children.accessoriesCardContainer.children`,
          state,
          dispatch
        )
      )
        isAccessoriesValid = false;
    }

    let tradeUnitJsonPath =
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items";
    let tradeUnits = get(
      state.screenConfiguration.screenConfig.apply,
      tradeUnitJsonPath,
      []
    );
    let isTradeUnitValid = true;

    for (var j = 0; j < tradeUnits.length; j++) {
      if (
        (tradeUnits[j].isDeleted === undefined ||
          tradeUnits[j].isDeleted !== false) &&
        !validateFields(
          `${tradeUnitJsonPath}[${j}].item${j}.children.cardContent.children.tradeUnitCardContainer.children`,
          state,
          dispatch
        )
      )
        isTradeUnitValid = false;
    }
    if (
      !isTradeDetailsValid ||
      !isTradeLocationValid ||
      !isAccessoriesValid ||
      !isTradeUnitValid
    ) {
      isFormValid = false;
    }
  }

  if (activeStep === 1) {
    getDocList(state, dispatch);

    let isOwnerShipValid = validateFields(
      "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownershipType.children",
      state,
      dispatch
    );
    let ownership = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory",
      "INDIVIDUAL"
    );
    if (ownership === "INDIVIDUAL") {
      let ownersJsonPath =
        "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
      let owners = get(
        state.screenConfiguration.screenConfig.apply,
        ownersJsonPath,
        []
      );
      for (var k = 0; k < owners.length; k++) {
        if (
          (owners[k].isDeleted === undefined ||
            owners[k].isDeleted !== false) &&
          !validateFields(
            `${ownersJsonPath}[${k}].item${k}.children.cardContent.children.tradeUnitCardContainer.children`,
            state,
            dispatch
          )
        )
          isFormValid = false;
      }
    } else {
      let ownersJsonPath =
        "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional.children.cardContent.children.tradeUnitCardContainer.children";
      // let owners = get(
      //   state.screenConfiguration.screenConfig.apply,
      //   ownersJsonPath,
      //   []
      // );
      // for (var x = 0; x < owners.length; x++) {
      //   if (
      //     (owners[x].isDeleted === undefined ||
      //       owners[x].isDeleted !== false) &&
      //     !validateFields(
      //       `${ownersJsonPath}[${x}].item${x}.children.cardContent.children.tradeUnitCardContainer.children`,
      //       state,
      //       dispatch
      //     )
      //   )
      if (!validateFields(ownersJsonPath, state, dispatch)) isFormValid = false;
    }

    // check for multiple owners
    if (
      get(
        state.screenConfiguration.preparedFinalObject,
        "Licenses[0].tradeLicenseDetail.subOwnerShipCategory"
      ) === "INDIVIDUAL.MULTIPLEOWNERS" &&
      get(
        state.screenConfiguration.preparedFinalObject,
        "Licenses[0].tradeLicenseDetail.owners"
      ).length <= 1
    ) {
      dispatch(
        toggleSnackbarAndSetText(true, "Please add multiple owners !", "error")
      );
      return false; // to show the above message
    }
    if (isFormValid && isOwnerShipValid) {
      isFormValid = await applyTradeLicense(state, dispatch, activeStep);
      if (!isFormValid) {
        hasFieldToaster = false;
      }
    } else {
      isFormValid = false;
    }
  }
  if (activeStep === 2) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]",
      {}
    );

    get(LicenseData, "tradeLicenseDetail.subOwnerShipCategory") &&
    get(LicenseData, "tradeLicenseDetail.subOwnerShipCategory").split(
      "."
    )[0] === "INDIVIDUAL"
      ? setMultiOwnerForApply(state, true)
      : setMultiOwnerForApply(state, false);

    if (get(LicenseData, "licenseType")) {
      setValidToFromVisibilityForApply(state, get(LicenseData, "licenseType"));
    }

    const uploadedDocData = get(
      LicenseData,
      "tradeLicenseDetail.applicationDocuments",
      []
    );

    const uploadedTempDocData = get(
      state.screenConfiguration.preparedFinalObject,
      "LicensesTemp[0].applicationDocuments",
      []
    );

    for (var y = 0; y < uploadedTempDocData.length; y++) {
      if (
        uploadedTempDocData[y].required &&
        !some(uploadedDocData, { documentType: uploadedTempDocData[y].name })
      ) {
        isFormValid = false;
      }
    }
    if (isFormValid) {
      const reviewDocData =
        uploadedDocData &&
        uploadedDocData.map(item => {
          return {
            title: item.documentType,
            link: item.fileUrl && item.fileUrl.split(",")[0],
            linkText: "View",
            name: item.fileName
          };
        });
      createEstimateData(
        LicenseData,
        "LicensesTemp[0].estimateCardData",
        dispatch
      ); //get bill and populate estimate card
      dispatch(
        prepareFinalObject("LicensesTemp[0].reviewDocData", reviewDocData)
      );
    }
  }
  if (activeStep === 3) {
    const LicenseData = get(
      state.screenConfiguration.preparedFinalObject,
      "Licenses[0]"
    );
    isFormValid = await applyTradeLicense(state, dispatch);
    if (isFormValid) {
      moveToSuccess(LicenseData, dispatch);
    }
  }
  if (activeStep !== 3) {
    if (isFormValid) {
      changeStep(state, dispatch);
    } else if (hasFieldToaster) {
      let errorMessage =
        "Please fill all mandatory fields and upload the documents !";
      switch (activeStep) {
        case 0:
          errorMessage =
            "Please fill all mandatory fields for Trade Details, then do next !";
          break;
        case 1:
          errorMessage =
            "Please fill all mandatory fields for Owner Details, then do next !";
          break;
        case 2:
          errorMessage = "Please upload all the required documents !";
          break;
      }
      dispatch(toggleSnackbarAndSetText(true, errorMessage, "warning"));
    }
  }
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

export const footer = getCommonApplyFooter({
  previousButton: {
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
        minWidth: "200px",
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
        minWidth: "200px",
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

export const footerReview = (
  action,
  state,
  dispatch,
  status,
  applicationNumber,
  tenantId
) => {
  const roleExists = ifUserRoleExists("CITIZEN");
  const redirectionURL = roleExists
    ? "/mihy-ui-framework/tradelicense-citizen"
    : "/mihy-ui-framework/tradelicence";

  /** MenuButton data based on status */
  let downloadMenu = [];
  let printMenu = [];
  let tlCertificateDownloadObject = {
    label: "TL Certificate",
    link: () => {
      generateReceipt(state, dispatch, "certificate_download");
    },
    leftIcon: "book"
  };
  let tlCertificatePrintObject = {
    label: "TL Certificate",
    link: () => {
      generateReceipt(state, dispatch, "certificate_print");
    },
    leftIcon: "book"
  };
  let receiptDownloadObject = {
    label: "Receipt",
    link: () => {
      generateReceipt(state, dispatch, "receipt_download");
    },
    leftIcon: "receipt"
  };
  let receiptPrintObject = {
    label: "Receipt",
    link: () => {
      generateReceipt(state, dispatch, "receipt_print");
    },
    leftIcon: "receipt"
  };
  let applicationDownloadObject = {
    label: "Application",
    link: () => {
      generatePdfFromDiv("download", applicationNumber);
    },
    leftIcon: "assignment"
  };
  let applicationPrintObject = {
    label: "Application",
    link: () => {
      generatePdfFromDiv("print", applicationNumber);
    },
    leftIcon: "assignment"
  };
  switch (status) {
    case "approved":
      downloadMenu = [
        tlCertificateDownloadObject,
        receiptDownloadObject,
        applicationDownloadObject
      ];
      printMenu = [
        tlCertificatePrintObject,
        receiptPrintObject,
        applicationPrintObject
      ];
      break;
    case "pending_payment":
      downloadMenu = [applicationDownloadObject];
      printMenu = [applicationPrintObject];
      break;
    case "pending_approval":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "cancelled":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    case "rejected":
      downloadMenu = [receiptDownloadObject, applicationDownloadObject];
      printMenu = [receiptPrintObject, applicationPrintObject];
      break;
    default:
      break;
  }
  /** END */

  return getCommonApplyFooter({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        leftdiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: { textAlign: "left", display: "flex" }
          },
          children: {
            downloadMenu: {
              uiFramework: "custom-atoms-local",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Download",
                  leftIcon: "cloud_download",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: downloadMenu
                }
              }
            },
            printMenu: {
              uiFramework: "custom-atoms-local",
              componentPath: "MenuButton",
              props: {
                data: {
                  label: "Print",
                  leftIcon: "print",
                  rightIcon: "arrow_drop_down",
                  props: { variant: "outlined", style: { marginLeft: 10 } },
                  menu: printMenu
                }
              }
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
                  minWidth: "200px",
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
                  minWidth: "200px",
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
                  minWidth: "200px",
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
                path: `${redirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenantId}&businessService=TL`
              },
              visible: getButtonVisibility(status, "PROCEED TO PAYMENT"),
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_CEMP", "CITIZEN"]
              }
            },
            cancelButton: {
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
