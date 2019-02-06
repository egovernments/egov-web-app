"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _applicationSuccessFooter = require("./acknowledgementResource/applicationSuccessFooter");

var _paymentSuccessFooter = require("./acknowledgementResource/paymentSuccessFooter");

var _approvalSuccessFooter = require("./acknowledgementResource/approvalSuccessFooter");

var _gotoHomeFooter = require("./acknowledgementResource/gotoHomeFooter");

var _paymentFailureFooter = require("./acknowledgementResource/paymentFailureFooter");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _receiptTransformer = require("../utils/receiptTransformer");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var goToHome = (0, _gotoHomeFooter.gotoHomeFooter)();
var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant) {
  if (purpose === "apply" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "Application for New Trade License (" + (0, _utils2.getCurrentFinancialYear)() + ")"
        // labelKey: "TL_COMMON_APPL_NEW_LIC"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: (0, _applicationSuccessFooter.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "pay" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Payment for New Trade License (" + (0, _utils2.getCurrentFinancialYear)() + ")"
          // labelKey: "TL_COMMON_PAYMENT_NEW_LIC"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-hrms",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "TL_CONFIRMATION_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_CONFIRMATION_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "TL_PMT_RCPT_NO"
            },
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter: (0, _paymentSuccessFooter.paymentSuccessFooter)()
    };
  } else if (purpose === "create" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Create New Employee"
          // labelKey: "TL_TRADE_APPLICATION"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Created Successfully",
              labelKey: "HR_CREATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the created Employee at registered Mobile No.",
              labelKey: "HR_CREATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
    };
  } else if (purpose === "update" && status === "success") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Update Employee"
          // labelKey: "TL_TRADE_APPLICATION"
        })
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Employee Updated Successfully",
              labelKey: "HR_UPDATE_SUCCESS_MESSAGE"
            },
            body: {
              labelName: "A notification has been sent to the updated Employee at registered Mobile No.",
              labelKey: "HR_UPDATE_SUCCESS_SUBHEADER"
            },
            tailText: {
              labelName: "Employee ID",
              labelKey: "HR_EMP_ID_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      goToHome: goToHome
    };
  } else if (purpose === "approve" && status === "success") {
    (0, _receiptTransformer.loadReceiptGenerationData)(applicationNumber, tenant);
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application (" + (0, _utils2.getCurrentFinancialYear)() + ")"
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-hrms",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Trade License Approved Successfully",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Approval has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _approvalSuccessFooter.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application (" + (0, _utils2.getCurrentFinancialYear)() + ")"
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-hrms",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Application Rejected",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License Rejection has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application (" + (0, _utils2.getCurrentFinancialYear)() + ")"
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Trade License Cancelled",
              labelKey: "TL_TL_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Trade License cancellation has been sent to trade owner at registered Mobile No.",
              labelKey: "TL_TL_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Trade License No.",
              labelKey: "TL_HOME_SEARCH_RESULTS_TL_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter: _gotoHomeFooter.gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: (0, _utils.getCommonContainer)({
        header: (0, _utils.getCommonHeader)({
          labelName: "Trade License Application (" + (0, _utils2.getCurrentFinancialYear)() + ")"
          // labelKey: "TL_TRADE_APPLICATION"
        }),
        applicationNumber: {
          uiFramework: "custom-atoms-local",
          moduleName: "egov-hrms",
          componentPath: "ApplicationNoContainer",
          props: {
            number: applicationNumber
          }
        }
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: "Payment has failed!",
            body: "A notification regarding payment failure has been sent to the trade owner and applicant."
          })
        }
      },
      paymentFailureFooter: (0, _paymentFailureFooter.paymentFailureFooter)(applicationNumber, tenant)
    };
  }
};

var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var data = getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;