"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capturePayment = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _paymentMethod = require("./paymentMethod");

var capturePayment = exports.capturePayment = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelName: "Capture Payment", labelKey: "TL_PAYMENT_CAP_PMT" }, {
    style: {
      marginBottom: "8px"
    }
  }),
  tabSection: {
    uiFramework: "custom-containers",
    moduleName: "egov-uc",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [{
        tabButton: { labelName: "CASH", labelKey: "TL_PAYMENT_CASH" },
        tabIcon: "Dashboard",
        tabContent: { cash: _paymentMethod.cash }
      }, {
        tabButton: { labelName: "CHEQUE", labelKey: "TL_PAYMENT_CHQ" },
        tabIcon: "Schedule",
        tabContent: { cheque: _paymentMethod.cheque }
      }, {
        tabButton: { labelName: "DD", labelKey: "TL_PAYMENT_DD" },
        tabIcon: "Schedule",
        tabContent: { demandDraft: _paymentMethod.demandDraft }
      }, {
        tabButton: {
          labelName: "Credit/Debit Card",
          labelKey: "TL_PAYMENT_DEBT_CARD"
        },
        tabIcon: "Schedule",
        tabContent: { card: _paymentMethod.card }
      }]
    },
    type: "array"
  }
});

exports.default = capturePayment;