"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _estimateSummary = require("./payResource/estimateSummary");

var _capturePayment = require("./payResource/capturePayment");

var _G8ReceiptDetails = require("./payResource/G8ReceiptDetails");

var _footer = require("./payResource/footer");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "New universal Collection",
    labelKey: "UC_PAY_HEADER"
  })
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "pay",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var amount = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.ReceiptTemp[0].Bill[0].billDetails[0].totalAmount", null);
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument", {
      amount: amount,
      instrumentType: { name: "Cash" },
      tenantId: tenantId
    }));
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", amount));
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].amountPaid", amount));
    dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", tenantId));
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        body: (0, _utils.getCommonCard)({
          estimateSummary: _estimateSummary.estimateSummary,
          capturePayment: _capturePayment.capturePayment,
          G8ReceiptDetails: _G8ReceiptDetails.G8ReceiptDetails
          //   applicantSummary: applicantSummary,
          //   documentsSummary: documentsSummary
        }),
        footer: _footer.footer
      }
    }
  }
};

exports.default = screenConfig;