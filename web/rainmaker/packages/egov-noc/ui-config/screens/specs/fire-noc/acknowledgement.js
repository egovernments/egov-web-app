"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footers = require("./acknowledgementResource/footers");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _receiptTransformer = require("../utils/receiptTransformer");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Application for Fire NOC (" + (0, _utils2.getCurrentFinancialYear)() + ")", //later use getFinancialYearDates
    labelKey: "NOC_COMMON_APPLY_FIRE_NOC_HEADER_LABEL"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-noc",
    componentPath: "ApplicationNoContainer",
    props: {
      number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
    },
    visible: true
  }
});
// import { loadReceiptGenerationData } from "../utils/receiptTransformer";


var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, applicationNumber, secondNumber, tenant) {
  if (purpose === "apply" && status === "success") {
    (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenant);
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Submitted Successfully",
              labelKey: "NOC_APPLICATION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Application Submission has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_APPLICATION_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: (0, _footers.applicationSuccessFooter)(state, dispatch, applicationNumber, tenant)
    };
  } else if (purpose === "pay" && status === "success") {
    (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenant);
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "NOC_PAYMENT_COLLECTION_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_PAYMENT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Payment Receipt No.",
              labelKey: "NOC_PMT_RCPT_NO"
            },
            number: secondNumber
          })
        }
      },
      paymentSuccessFooter: (0, _footers.paymentSuccessFooter)()
    };
  } else if (purpose === "approve" && status === "success") {
    (0, _receiptTransformer.loadPdfGenerationData)(applicationNumber, tenant);
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Fire NOC Approved Successfully",
              labelKey: "NOC_APPROVAL_CHECKLIST_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Fire NOC Approval has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_APPROVAL_CHECKLIST_MESSAGE_SUB"
            },
            tailText: {
              labelName: "Fire NOC No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      approvalSuccessFooter: _footers.approvalSuccessFooter
    };
  } else if (purpose === "application" && status === "rejected") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Fire NOC Application Rejected",
              labelKey: "NOC_APPROVAL_REJ_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Fire NOC Rejection has been sent to building owner at registered Mobile No.",
              labelKey: "NOC_APPROVAL_REJ_MESSAGE_SUBHEAD"
            }
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "application" && status === "cancelled") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Fire NOC Cancelled",
              labelKey: "Fire_NOC_CANCELLED_MESSAGE_HEAD"
            },
            body: {
              labelName: "A notification regarding Fire NOC cancellation has been sent to building owner at registered Mobile No.",
              labelKey: "Fire_NOC_CANCELLED_MESSAGE_SUBHEAD"
            },
            tailText: {
              labelName: "Fire NOC No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_NOC_NO_LABEL"
            },
            number: secondNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment has failed!",
              labelKey: "NOC_PAYMENT_FAILURE_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding payment failure has been sent to the building owner and applicant.",
              labelKey: "NOC_PAYMENT_FAILURE_MESSAGE_SUB"
            }
          })
        }
      },
      paymentFailureFooter: (0, _footers.paymentFailureFooter)(applicationNumber, tenant)
    };
  } else if (purpose === "mark" && status === "success") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Marked Successfully",
              labelKey: "NOC_MARK_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "NOC_APPLICATION_MARKED_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  } else if (purpose === "forward" && status === "success") {
    return {
      header: header,
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Application Forwarded Successfully",
              labelKey: "NOC_FORWARD_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "Application has been marked successfully",
              labelKey: "NOC_APPLICATION_FORWARD_SUCCESS"
            },
            tailText: {
              labelName: "Application No.",
              labelKey: "NOC_HOME_SEARCH_RESULTS_APP_NO_LABEL"
            },
            number: applicationNumber
          })
        }
      },
      gotoHomeFooter: _footers.gotoHomeFooter
    };
  }
};

var setApplicationData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, applicationNumber, tenant) {
    var queryObject, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObject = [{
              key: "tenantId",
              value: tenant
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }];
            _context.next = 3;
            return (0, _commons2.getSearchResults)(queryObject);

          case 3:
            response = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("FireNOCs", (0, _get2.default)(response, "FireNOCs", [])));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setApplicationData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

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
    setApplicationData(dispatch, applicationNumber, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;