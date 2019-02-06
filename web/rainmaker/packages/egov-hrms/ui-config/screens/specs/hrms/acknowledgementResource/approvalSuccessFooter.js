"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.approvalSuccessFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _receiptPdf = require("../../utils/receiptPdf");

var _receiptPdf2 = _interopRequireDefault(_receiptPdf);

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

var approvalSuccessFooter = exports.approvalSuccessFooter = getCommonApplyFooter({
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
      path: "/egov-ui-framework/hrms/search"
    }
  },
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
        labelName: "DOWNLOAD TRADE LICENSE",
        labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_DOWN_LIC"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        (0, _receiptPdf2.default)(state, dispatch, "certificate_download");
      }
    }
  },
  printLicenseButton: {
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
        labelName: "PRINT TRADE LICENSE",
        labelKey: "TL_APPROVAL_CHECKLIST_PRINT_LIC"
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