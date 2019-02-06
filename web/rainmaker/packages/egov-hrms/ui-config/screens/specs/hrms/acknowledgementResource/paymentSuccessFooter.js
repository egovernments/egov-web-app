"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentSuccessFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var paymentSuccessFooter = exports.paymentSuccessFooter = function paymentSuccessFooter() {
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  var redirectionURL = roleExists ? "/egov-ui-framework/tradelicense-citizen/home" : "/egov-ui-framework/hrms/search";

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
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "GO TO HOME",
          labelKey: "TL_COMMON_BUTTON_HOME"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: redirectionURL
      }
    },
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
          labelKey: "TL_CONFIRMATION_BUTTON_DOWN_REPT"
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
          labelKey: "TL_CONFIRMATION_BUTTON_PRT_REPT"
        })
      },
      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          (0, _receiptPdf2.default)(state, dispatch, "receipt_print");
        }
      }
    }
  });
};