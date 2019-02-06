"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footerReview = exports.footer = exports.callBackForPrevious = exports.getActionDefinationForStepper = exports.renderSteps = exports.changeStep = exports.callBackForNext = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moveToReview = function moveToReview(dispatch) {
  dispatch((0, _actions.setRoute)("/egov-ui-framework/hrms/review"));
};

var callBackForNext = exports.callBackForNext = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var activeStep, isFormValid, isEmployeeDetailsValid, isProfessionalDetailsValid, jurisdictionDetailsPath, jurisdictionDetailsItems, isJurisdictionDetailsValid, j, assignmentDetailsPath, assignmentDetailsItems, isAssignmentDetailsValid, errorMessage;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["create"], "components.div.children.stepper.props.activeStep", 0);
            isFormValid = true;

            if (activeStep === 0) {
              isEmployeeDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.employeeDetails.children.cardContent.children.employeeDetailsContainer.children", state, dispatch, "create");
              isProfessionalDetailsValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.professionalDetails.children.cardContent.children.employeeDetailsContainer.children", state, dispatch, "create");

              if (!(isEmployeeDetailsValid && isProfessionalDetailsValid)) {
                isFormValid = false;
              }
            }
            if (activeStep === 1) {
              jurisdictionDetailsPath = "components.div.children.formwizardSecondStep.children.jurisdictionDetails.children.cardContent.children.jurisdictionDetailsCard.props.items";
              jurisdictionDetailsItems = (0, _get2.default)(state.screenConfiguration.screenConfig.create, jurisdictionDetailsPath, []);
              isJurisdictionDetailsValid = true;

              for (j = 0; j < jurisdictionDetailsItems.length; j++) {
                if ((jurisdictionDetailsItems[j].isDeleted === undefined || jurisdictionDetailsItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(jurisdictionDetailsPath + "[" + j + "].item" + j + ".children.cardContent.children.jnDetailsCardContainer.children", state, dispatch, "create")) isJurisdictionDetailsValid = false;
              }
              if (!isJurisdictionDetailsValid) {
                isFormValid = false;
              }
            }
            if (activeStep === 2) {
              assignmentDetailsPath = "components.div.children.formwizardThirdStep.children.assignmentDetails.children.cardContent.children.assignmentDetailsCard.props.items";
              assignmentDetailsItems = (0, _get2.default)(state.screenConfiguration.screenConfig.create, assignmentDetailsPath, []);
              isAssignmentDetailsValid = true;

              for (j = 0; j < assignmentDetailsItems.length; j++) {
                if ((assignmentDetailsItems[j].isDeleted === undefined || assignmentDetailsItems[j].isDeleted !== false) && !(0, _utils2.validateFields)(assignmentDetailsPath + "[" + j + "].item" + j + ".children.cardContent.children.asmtDetailsCardContainer.children", state, dispatch, "create")) isAssignmentDetailsValid = false;
              }
              if (!isAssignmentDetailsValid) {
                isFormValid = false;
              }
            }
            if (activeStep === 4) {
              moveToReview(dispatch);
            }
            if (activeStep !== 4) {
              if (isFormValid) {
                changeStep(state, dispatch);
              } else {
                errorMessage = "Please fill all fields";

                dispatch((0, _actions.toggleSnackbarAndSetText)(true, errorMessage, "warning"));
              }
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function callBackForNext(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var changeStep = exports.changeStep = function changeStep(state, dispatch) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "next";
  var defaultActiveStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;

  var activeStep = (0, _get2.default)(state.screenConfiguration.screenConfig["create"], "components.div.children.stepper.props.activeStep", 0);
  if (defaultActiveStep === -1) {
    activeStep = mode === "next" ? activeStep + 1 : activeStep - 1;
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
  (0, _utils.dispatchMultipleFieldChangeAction)("create", actionDefination, dispatch);
  renderSteps(activeStep, dispatch);
};

var renderSteps = exports.renderSteps = function renderSteps(activeStep, dispatch) {
  switch (activeStep) {
    case 0:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFirstStep"), dispatch);
      break;
    case 1:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardSecondStep"), dispatch);
      break;
    case 2:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardThirdStep"), dispatch);
      break;
    case 3:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFourthStep"), dispatch);
      break;
    default:
      (0, _utils.dispatchMultipleFieldChangeAction)("create", getActionDefinationForStepper("components.div.children.formwizardFifthStep"), dispatch);
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
  }, {
    path: "components.div.children.formwizardFifthStep",
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
      nextButtonLabel: (0, _utils.getLabel)({
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
      submitButtonLabel: (0, _utils.getLabel)({
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

var footerReview = exports.footerReview = function footerReview(action, state, dispatch, status, applicationNumber, tenantId) {
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  var redirectionURL = roleExists ? "/egov-ui-framework/tradelicense-citizen" : "/egov-ui-framework/hrms";

  return (0, _utils2.getCommonApplyFooter)({
    container: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
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
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "Reject",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_REJECT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/egov-ui-framework/hrms/approve?purpose=reject&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "REJECT"),
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
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "APPROVE",
                  labelKey: "TL_APPROVER_TRADE_APP_BUTTON_APPROVE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/egov-ui-framework/hrms/approve?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "APPROVE"),
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
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "PROCEED TO PAYMENT",
                  labelKey: "TL_COMMON_BUTTON_PROC_PMT"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: redirectionURL + "/pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId + "&businessService=TL"
              },
              visible: (0, _utils2.getButtonVisibility)(status, "PROCEED TO PAYMENT"),
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
                nextButtonLabel: (0, _utils.getLabel)({
                  labelName: "CANCEL TRADE LICENSE",
                  labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
                })
              },
              onClickDefination: {
                action: "page_change",
                path: "/egov-ui-framework/hrms/approve?purpose=cancel&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId
              },
              visible: (0, _utils2.getButtonVisibility)(status, "CANCEL TRADE LICENSE"),
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