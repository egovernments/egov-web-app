"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentFailureFooter = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

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

var paymentFailureFooter = exports.paymentFailureFooter = function paymentFailureFooter(applicationNumber, tenant) {
  var roleExists = (0, _utils2.ifUserRoleExists)("CITIZEN");
  var redirectionURL = roleExists ? "/egov-ui-framework/tradelicense-citizen" : "/egov-ui-framework/hrms";

  return getCommonApplyFooter({
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
        downloadReceiptButtonLabel: (0, _utils.getLabel)({
          labelName: "RETRY",
          labelKey: "TL_RETRY"
        })
      },
      onClickDefination: {
        action: "page_change",
        path: redirectionURL + "/pay?applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=TL"
      }
    }
  });
};