"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _paymentMethods = require("./payment-methods");

var capturePaymentDetails = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelName: "Capture Payment", labelKey: "TL_PAYMENT_CAP_PMT" }, {
    style: {
      marginBottom: "8px"
    }
  }),
  tabSection: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-noc",
    componentPath: "CustomTabContainer",
    props: {
      // horizontal: {
      //   tabsGrid: { xs: 4, sm: 2, md: 2 },
      //   contentGrid: { xs: 8, sm: 10, md: 10 }
      // },
      tabs: [{
        tabButton: "CASH",
        tabIcon: "Dashboard",
        tabContent: { cash: _paymentMethods.cash }
      }, {
        tabButton: "CHEQUE",
        tabIcon: "Schedule",
        tabContent: { cheque: _paymentMethods.cheque }
      }, {
        tabButton: "DD",
        tabIcon: "Schedule",
        tabContent: { demandDraft: _paymentMethods.demandDraft }
      }, {
        tabButton: "Credit/Debit Card",
        tabIcon: "Schedule",
        tabContent: { card: _paymentMethods.card }
      }]
    },
    type: "array"
  }
});

exports.default = capturePaymentDetails;