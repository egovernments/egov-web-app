"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.getRedirectionURL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _api = require("egov-ui-framework/ui-utils/api");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

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
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL(receiptNumber) {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/uc/acknowledgement?purpose=pay&status=success&receeiptNumber=" + receiptNumber : "/inbox";

  return redirectionURL;
};
var footer = exports.footer = getCommonApplyFooter({
  // prevButton: {
  //   componentPath: "Button",
  //   props: {
  //     variant: "contained",
  //     color: "primary",
  //     style: {
  //       minWidth: "200px",
  //       height: "48px",
  //       marginRight: "16px"
  //     }
  //   },
  //   children: {
  //     downloadReceiptButtonLabel: getLabel({
  //       labelName: "GENERATE RECEIPT",
  //       labelKey: "UC_BUTTON_GENERATE_RECEIPT"
  //     }),
  //     nextButtonIcon: {
  //       uiFramework: "custom-atoms",
  //       componentPath: "Icon",
  //       props: {
  //         iconName: "keyboard_arrow_right"
  //       }
  //     }
  //   },
  //   onClickDefination: {
  //     action: "condition",
  //     callBack: (state, dispatch) => {
  //       goBack(state, dispatch);
  //     }
  //   }
  // },
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
        labelName: "GENERATE RECEIPT",
        labelKey: "UC_BUTTON_GENERATE_RECEIPT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        callBackForPay(state, dispatch);
      }
    }
  }
});

var callBackForPay = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var href, isFormValid, selectedPaymentType, _getSelectedTabIndex, selectedTabIndex, selectedPaymentMode, fieldsToValidate, ReceiptDataTemp, finalReceiptData, ReceiptBody, response, receiptNumber, serviceCategory;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            href = window.location.href;
            isFormValid = true;

            // --- Validation related -----//

            selectedPaymentType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.instrumentType.name");
            _getSelectedTabIndex = (0, _commons.getSelectedTabIndex)(selectedPaymentType), selectedTabIndex = _getSelectedTabIndex.selectedTabIndex, selectedPaymentMode = _getSelectedTabIndex.selectedPaymentMode, fieldsToValidate = _getSelectedTabIndex.fieldsToValidate;


            isFormValid = fieldsToValidate.map(function (curr) {
              return (0, _utils2.validateFields)("components.div.children.body.children.cardContent.children.capturePayment.children.cardContent.children.tabSection.props.tabs[" + selectedTabIndex + "].tabContent." + selectedPaymentMode + ".children." + curr + ".children", state, dispatch, "pay");
            }).indexOf(false) === -1;
            if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Bill[0].billDetails[0].manualReceiptDate")) {
              isFormValid = (0, _utils2.validateFields)("components.div.children.body.children.cardContent.children.G8ReceiptDetails.children.cardContent.children.header.children", state, dispatch, "pay");
            }

            //------------ Validation End -------------//

            //------------- Form related ----------------//

            ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0]");
            finalReceiptData = (0, _cloneDeep2.default)(ReceiptDataTemp);


            allDateToEpoch(finalReceiptData, ["Bill[0].billDetails[0].manualReceiptDate", "instrument.transactionDateInput"]);
            if ((0, _get2.default)(finalReceiptData, "instrument.transactionDateInput")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentDate", (0, _get2.default)(finalReceiptData, "instrument.transactionDateInput"));
            }

            //Add payerName and Mobile no
            (0, _set2.default)(finalReceiptData, "Bill[0].payerName", (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Demands[0].consumerName", ""));
            (0, _set2.default)(finalReceiptData, "Bill[0].mobileNumber", (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Demands[0].mobileNo", ""));

            if ((0, _get2.default)(finalReceiptData, "instrument.transactionNumber")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentNumber", (0, _get2.default)(finalReceiptData, "instrument.transactionNumber"));
            }

            if (!(selectedPaymentType === "Card")) {
              _context.next = 17;
              break;
            }

            if (!((0, _get2.default)(finalReceiptData, "instrument.transactionNumber") !== (0, _get2.default)(finalReceiptData, "instrument.transactionNumberConfirm"))) {
              _context.next = 17;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Transaction numbers don't match !",
              labelKey: "ERR_TRASACTION_NUMBERS_DONT_MATCH"
            }, "error"));
            return _context.abrupt("return");

          case 17:

            //------------- Form End ----------------//

            ReceiptBody = {
              Receipt: []
            };


            ReceiptBody.Receipt.push(finalReceiptData);

            //---------------- Create Receipt ------------------//

            if (!isFormValid) {
              _context.next = 37;
              break;
            }

            _context.prev = 20;
            _context.next = 23;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_create", "_create", [], ReceiptBody, [], {});

          case 23:
            response = _context.sent;
            receiptNumber = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", null);
            serviceCategory = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].businessService", "");

            console.log(receiptNumber, response);
            dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse", response));
            // moveToSuccess(href, dispatch, receiptNumber);
            dispatch((0, _actions2.setRoute)("/uc/acknowledgement?purpose=pay&status=success&receiptNumber=" + receiptNumber + "&serviceCategory=" + serviceCategory));
            _context.next = 35;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](20);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context.t0.message }, "error"));
            console.log(_context.t0);

          case 35:
            _context.next = 38;
            break;

          case 37:
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill all mandatory fields and upload the documents !",
              labelKey: "ERR_FILL_MANDATORY_FIELDS"
            }, "warning"));

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[20, 31]]);
  }));

  return function callBackForPay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var allDateToEpoch = function allDateToEpoch(finalObj, jsonPaths) {
  jsonPaths.forEach(function (jsonPath) {
    if ((0, _get2.default)(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

var convertDateFieldToEpoch = function convertDateFieldToEpoch(finalObj, jsonPath) {
  var dateConvertedToEpoch = (0, _utils2.convertDateToEpoch)((0, _get2.default)(finalObj, jsonPath), "daystart");
  (0, _set2.default)(finalObj, jsonPath, dateConvertedToEpoch);
};

var goBack = function goBack(state, dispatch) {
  dispatch((0, _actions2.setRoute)("/uc/search"));
};