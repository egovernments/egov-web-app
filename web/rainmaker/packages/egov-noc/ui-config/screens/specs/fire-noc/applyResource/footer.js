"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _uiUtils = require("../../../../../ui-utils");

var _commons2 = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveToReview = function moveToReview(state, dispatch) {
  var tenantId = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.propertyDetails.address.city");
  var applicationNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicationNumber");
  var appendUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework" : "";
  var reviewUrl = appendUrl + "/fire-noc/summary?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  dispatch((0, _actions2.setRoute)(reviewUrl));
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.propertyDetails.address.city");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{ moduleName: "FireNoc", masterDetails: [{ name: "Documents" }] }]
              }
            };
            _context.prev = 2;
            _context.next = 5;
            return (0, _uiUtils.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 5:
            payload = _context.sent;


            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.firenoc.Documents", payload.MdmsRes.FireNoc.Documents));
            (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function getMdmsData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var callBackForNext = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var activeStep, isFormValid, hasFieldToaster, isPropertyLocationCardValid, isSinglePropertyCardValid, multiplePropertyCardPath, multiplePropertyCardItems, isMultiplePropertyCardValid, j, noOfBuildings, isApplicantTypeCardValid, isSingleApplicantCardValid, isInstitutionCardValid, multipleApplicantCardPath, multipleApplicantCardItems, isMultipleApplicantCardValid, selectedApplicantType, responseStatus, response, errorMessage;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
            // console.log(activeStep);

            isFormValid = true;
            hasFieldToaster = false;


            if (activeStep === 1) {
              isPropertyLocationCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.propertyLocationDetails.children.cardContent.children.propertyDetailsConatiner.children", state, dispatch);
              isSinglePropertyCardValid = (0, _utils2.validateFields)("components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children", state, dispatch);

              // Multiple buildings cards validations

              multiplePropertyCardPath = "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.children.multipleBuilding.props.items";
              multiplePropertyCardItems = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, multiplePropertyCardPath, []);
              isMultiplePropertyCardValid = true;

              for (j = 0; j < multiplePropertyCardItems.length; j++) {
                if ((multiplePropertyCardItems[j].isDeleted === undefined || multiplePropertyCardItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(multiplePropertyCardPath + "[" + j + "].item" + j + ".children.cardContent.children.multipleBuildingCard.children", state, dispatch, "apply")) isMultiplePropertyCardValid = false;
              }

              noOfBuildings = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings");

              if (noOfBuildings === "SINGLE") {
                isMultiplePropertyCardValid = true;
              } else {
                isSinglePropertyCardValid = true;
              }

              if (!isSinglePropertyCardValid || !isPropertyLocationCardValid || !isMultiplePropertyCardValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
            }

            if (activeStep === 2) {
              isApplicantTypeCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantTypeSelection.children", state, dispatch);
              isSingleApplicantCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.children.individualApplicantInfo.children.cardContent.children.applicantCard.children", state, dispatch);
              isInstitutionCardValid = (0, _utils2.validateFields)("components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.children.institutionInfo.children.cardContent.children.applicantCard.children", state, dispatch);

              // Multiple applicants cards validations

              multipleApplicantCardPath = "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items";
              // "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.children.multipleApplicantInfo.props.items[0].item0.children.cardContent.children.applicantCard"

              multipleApplicantCardItems = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, multipleApplicantCardPath, []);
              isMultipleApplicantCardValid = true;

              for (j = 0; j < multipleApplicantCardItems.length; j++) {
                if ((multipleApplicantCardItems[j].isDeleted === undefined || multipleApplicantCardItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(multipleApplicantCardPath + "[" + j + "].item" + j + ".children.cardContent.children.applicantCard.children", state, dispatch, "apply")) isMultipleApplicantCardValid = false;
              }

              selectedApplicantType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType", "SINGLE");

              if (selectedApplicantType.includes("INSTITUTIONAL")) {
                isSingleApplicantCardValid = true;
                isMultipleApplicantCardValid = true;
              } else if (selectedApplicantType.includes("MULTIPLEOWNERS")) {
                isSingleApplicantCardValid = true;
                isInstitutionCardValid = true;
              } else {
                isMultipleApplicantCardValid = true;
                isInstitutionCardValid = true;
              }

              if (!isApplicantTypeCardValid || !isSingleApplicantCardValid || !isInstitutionCardValid || !isMultipleApplicantCardValid) {
                isFormValid = false;
                hasFieldToaster = true;
              }
            }

            if (activeStep === 3) {
              moveToReview(state, dispatch);
            }

            if (!(activeStep !== 3)) {
              _context2.next = 29;
              break;
            }

            if (!isFormValid) {
              _context2.next = 19;
              break;
            }

            responseStatus = "success";

            if (activeStep === 1) {
              (0, _commons2.prepareDocumentsUploadData)(state, dispatch);
            }

            if (!(activeStep === 2)) {
              _context2.next = 16;
              break;
            }

            getMdmsData(state, dispatch);
            _context2.next = 14;
            return (0, _commons2.createUpdateNocApplication)(state, dispatch, "INITIATE");

          case 14:
            response = _context2.sent;

            responseStatus = (0, _get2.default)(response, "status", "");

          case 16:
            responseStatus === "success" && changeStep(state, dispatch);
            _context2.next = 29;
            break;

          case 19:
            if (!hasFieldToaster) {
              _context2.next = 29;
              break;
            }

            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_UPLOAD_MANDATORY_DOCUMENTS_TOAST"
            };
            _context2.t0 = activeStep;
            _context2.next = _context2.t0 === 1 ? 24 : _context2.t0 === 2 ? 26 : 28;
            break;

          case 24:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Property Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_PROPERTY_TOAST"
            };
            return _context2.abrupt("break", 28);

          case 26:
            errorMessage = {
              labelName: "Please fill all mandatory fields for Applicant Details, then proceed!",
              labelKey: "ERR_FILL_ALL_MANDATORY_FIELDS_APPLICANT_TOAST"
            };
            return _context2.abrupt("break", 28);

          case 28:
            dispatch((0, _actions.toggleSnackbar)(true, errorMessage, "warning"));

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function callBackForNext(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    // if (activeStep === 2 && mode === "next") {
    //   const isDocsUploaded = get(
    //     state.screenConfiguration.preparedFinalObject,
    //     "LicensesTemp[0].reviewDocData",
    //     null
    //   );
    //   activeStep = isDocsUploaded ? 3 : 2;
    // } else {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
    // }
  } else {
    activeStep = defaultActiveStep;
  }

  var isPreviousButtonVisible = activeStep > 0 ? true : false;
  var isNextButtonVisible = activeStep < 4 ? true : false;
  var isPayButtonVisible = activeStep === 4 ? true : false;
  var actionDefination = [{
    path: "components.div.children.stepper.props",
    property: "activeStep",
    value: activeStep
  }, {
    path: "components.div.children.footer.children.previousButton",
    property: "visible",
    value: isPreviousButtonVisible
  }, {
    path: "components.div.children.footer.children.nextButton",
    property: "visible",
    value: isNextButtonVisible
  }, {
    path: "components.div.children.footer.children.payButton",
    property: "visible",
    value: isPayButtonVisible
  }];
  (0, _utils.dispatchMultipleFieldChangeAction)("apply", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

var renderSteps = exports.renderSteps = function renderSteps(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardSecondStep"), dispatch);
      break;
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("apply", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
  }
};

var getActionDefinationForStepper = exports.getActionDefinationForStepper = function getActionDefinationForStepper(path) {
  var actionDefination = [{
    path: "components.div.children.formwizardFirstStep",
    property: "visible",
    value: true
  }, {
    path: "components.div.children.formwizardSecondStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardThirdStep",
    property: "visible",
    value: false
  }, {
    path: "components.div.children.formwizardFourthStep",
    property: "visible",
    value: false
  }];
  for (var i = 0; i < actionDefination.length; i++) {
    actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
      value: false
    });
    if (path === actionDefination[i].path) {
      actionDefination[i] = (0, _extends3.default)({}, actionDefination[i], {
        value: true
      });
    }
  }
  return actionDefination;
};

var callBackForPrevious = exports.callBackForPrevious = function callBackForPrevious(state, dispatch) {
  changeStep(state, dispatch, "previous");
};

var footer = exports.footer = (0, _utils2.getCommonApplyFooter)({
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
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "NOC_COMMON_BUTTON_PREV_STEP"
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
      nextButtonLabel: (0, _utils.getLabel)({
        labelName: "Next Step",
        labelKey: "NOC_COMMON_BUTTON_NXT_STEP"
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
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "Submit",
        labelKey: "NOC_COMMON_BUTTON_SUBMIT"
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