"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acknowledgementFailureFooter = exports.acknowledgementSuccesFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _recieptPdf = require("../../utils/recieptPdf");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

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
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/uc/search" : "/inbox";

  return redirectionURL;
};
var acknowledgementSuccesFooter = exports.acknowledgementSuccesFooter = getCommonApplyFooter({
  goToHomeButton: {
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
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        goToHome(state, dispatch);
      }
    }
  },

  viewReceiptButton: {
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
        labelName: "VIEW RECEIPT",
        labelKey: "UC_BUTTON_VIEW_RECEIPT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        viewReceipt(state, dispatch);
      }
    }
  }
});
var acknowledgementFailureFooter = exports.acknowledgementFailureFooter = getCommonApplyFooter({
  nextButton: {
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
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

var viewReceipt = function viewReceipt(state, dispatch) {
  (0, _recieptPdf.generateReciept)(state, dispatch);
};

var goToHome = function goToHome(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("Demands", []));
  dispatch((0, _actions.setRoute)("" + getRedirectionURL()));
};