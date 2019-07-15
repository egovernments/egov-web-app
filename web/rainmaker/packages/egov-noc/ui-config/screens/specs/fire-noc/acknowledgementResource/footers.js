"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSuccessFooter = exports.paymentFailureFooter = exports.approvalSuccessFooter = exports.applicationSuccessFooter = exports.gotoHomeFooter = exports.callPGService = exports.getRedirectionURL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? "/fire-noc/home" : "/inbox";
  return redirectionURL;
};

var callPGService = exports.callPGService = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, callbackUrl, queryObj, billPayload, taxAndPayments, requestBody, goToPaymentGateway, redirectionUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            // let callbackUrl = "/fire-noc/paymentRedirectPage";

            callbackUrl = window.origin + "/egov-ui-framework/fire-noc/paymentRedirectPage";
            _context.prev = 2;
            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
            }, {
              key: "businessService",
              value: "FIRENOC"
            }];
            _context.next = 6;
            return (0, _utils2.getBill)(queryObj);

          case 6:
            billPayload = _context.sent;
            taxAndPayments = (0, _get2.default)(billPayload, "Bill[0].taxAndPayments", []).map(function (item) {
              if (item.businessService === "FIRENOC") {
                item.amountPaid = (0, _get2.default)(billPayload, "Bill[0].billDetails[0].totalAmount");
              }
              return item;
            });
            _context.prev = 8;
            requestBody = {
              Transaction: {
                tenantId: tenantId,
                txnAmount: (0, _get2.default)(billPayload, "Bill[0].billDetails[0].totalAmount"),
                module: "FIRENOC",
                taxAndPayments: taxAndPayments,
                billId: (0, _get2.default)(billPayload, "Bill[0].id"),
                consumerCode: (0, _get2.default)(billPayload, "Bill[0].billDetails[0].consumerCode"),
                productInfo: "Fire NOC Payment",
                gateway: "AXIS",
                callbackUrl: callbackUrl
              }
            };
            _context.next = 12;
            return (0, _api.httpRequest)("post", "pg-service/transaction/v1/_create", "_create", [], requestBody);

          case 12:
            goToPaymentGateway = _context.sent;
            redirectionUrl = (0, _get2.default)(goToPaymentGateway, "Transaction.redirectUrl");

            window.location = redirectionUrl;
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](8);

            console.log(_context.t0);

          case 20:
            _context.next = 25;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](2);

            console.log(_context.t1);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 22], [8, 17]]);
  }));

  return function callPGService(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

//Function for go to home button
var gotoHomeFooter = exports.gotoHomeFooter = getCommonApplyFooter({
  gotoHome: {
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
      //downloadReceiptButtonLabel: getLabel
      goToHomeButtonLabel: (0, _utils.getLabel)({
        labelName: "GO TO HOME",
        labelKey: "NOC_COMMON_BUTTON_HOME"
      })
    },
    // Check this onClickDefinition later again
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

//Function for application success(show those 3 buttons )
var applicationSuccessFooter = exports.applicationSuccessFooter = function applicationSuccessFooter(state, dispatch, applicationNumber, tenant) {
  return getCommonApplyFooter({
    gotoHome: {
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
        //downloadReceiptButtonLabel: getLabel
        goToHomeButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      // Check this onClickDefinition later again
      onClickDefination: {
        action: "page_change",
        path: "" + getRedirectionURL()
      }
    },
    downloadFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "290px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadFormButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_DOWN_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          (0, _receiptPdf2.default)(state, dispatch, "application_download");
        }
      }
    },
    printFormButton: {
      componentPath: "Button",
      props: {
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "250px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        printFormButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT CONFIRMATION FORM",
          labelKey: "NOC_APPLICATION_BUTTON_PRINT_CONF"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack() {
          (0, _receiptPdf2.default)(state, dispatch, "application_print");
        }
      }
    },
    proceedToPaymentButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        proceedToPaymentButtonLabel: (0, _utils.getLabel)({
          labelName: "Proceed to payment",
          labelKey: "NOC_PROCEED_PAYMENT"
        })
      },
      //Add onClickDefination and RoleDefination later
      onClickDefination: {
        action: "page_change",
        path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=FIRENOC" : "/fire-noc/pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=FIRENOC"
      },
      roleDefination: {
        rolePath: "user-info.roles",
        action: "PAY"
        // roles: ["NOC_CEMP", "SUPERUSER"]
      }
    },
    makePayment: {
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
          labelName: "MAKE PAYMENT",
          labelKey: "NOC_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: callPGService
      },
      roleDefination: {
        rolePath: "user-info.roles",
        roles: ["CITIZEN"],
        action: "PAY"
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? true : true
    }
  });
};

//Function for approval footer buttons
var approvalSuccessFooter = exports.approvalSuccessFooter = getCommonApplyFooter({
  //Call gotoHome
  downloadLicenseButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadLicenseButtonLabel: (0, _utils.getLabel)({
        labelName: "DOWNLOAD FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
      }
    }
  },
  printNOCButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        width: "250px",
        height: "48px",
        marginRight: "40px"
      }
    },
    children: {
      printLicenseButtonLabel: (0, _utils.getLabel)({
        labelName: "PRINT FIRE-NOC",
        labelKey: "NOC_APPROVAL_CHECKLIST_PRINT_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        (0, _receiptPdf2.default)(state, dispatch, "certificate_print");
      }
    }
  }
});

//Function for payment failure(retry button)
var paymentFailureFooter = exports.paymentFailureFooter = function paymentFailureFooter(applicationNumber, tenant) {
  return getCommonApplyFooter({
    //Call gotoHome
    retryPayment: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "RETRY",
          labelKey: "NOC_PAYMENT_RETRY"
        })
        //Check this onclick later again
        // onClickDefination: {
        //   action: "page_change",
        //   path: `${getRedirectionURL}/pay?applicationNumber=${applicationNumber}&tenantId=${tenant}&businessService=TL`
        // }
      } }
  });
};

//Function for payment success(Show buttons for download and print receipts)
var paymentSuccessFooter = exports.paymentSuccessFooter = function paymentSuccessFooter() {
  return getCommonApplyFooter({
    //call gotoHome
    downloadReceiptButton: {
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
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "DOWNLOAD RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_DOWNLOAD_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _receiptPdf2.default)(state, dispatch, "receipt_download");
        }
      }
    },
    printReceiptButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "40px"
        }
      },
      children: {
        printReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "PRINT RECEIPT",
          labelKey: "NOC_CONFIRMATION_BUTTON_PRINT_RECEIPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
        }
      }
    },
    gotoHome: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "200px",
          height: "48px",
          marginRight: "16px"
        }
      },
      children: {
        goToHomeButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "NOC_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/search" : "/fire-noc/search"
        // visible: false
      } }
  });
};

//Write a function using map to return buttons