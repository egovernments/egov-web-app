"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.getCommonApplyFooter = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _api = require("../../../../../ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils2 = require("../../utils");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getBill } from "../../utils";

// export const callPGService = async (state, dispatch) => {
//   const tenantId = getQueryArg(window.location.href, "tenantId");
//   let callbackUrl = `${window.origin}/${
//     process.env.NODE_ENV === "production" ? "citizen" : ""
//   }/tradelicense-citizen/PaymentRedirectPage`;
//   try {
//     const queryObj = [
//       {
//         key: "tenantId",
//         value: tenantId
//       },
//       {
//         key: "consumerCode",
//         value: getQueryArg(window.location.href, "applicationNumber")
//       },
//       {
//         key: "businessService",
//         value: "TL"
//       }
//     ];
//     const billPayload = await getBill(queryObj);
//     try {
//       const requestBody = {
//         Transaction: {
//           tenantId,
//           txnAmount: get(
//             billPayload,
//             "billResponse.Bill[0].billDetails[0].totalAmount"
//           ),
//           module: "TL",
//           billId: get(billPayload, "billResponse.Bill[0].id"),
//           moduleId: get(
//             billPayload,
//             "billResponse.Bill[0].billDetails[0].consumerCode"
//           ),
//           productInfo: "Trade License Payment",
//           gateway: "AXIS",
//           callbackUrl
//         }
//       };
//       const goToPaymentGateway = await httpRequest(
//         "post",
//         "pg-service/transaction/v1/_create",
//         "_create",
//         [],
//         requestBody
//       );
//       const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl");
//       window.location = redirectionUrl;
//     } catch (e) {
//       console.log(e);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

var moveToSuccess = function moveToSuccess(href, dispatch, receiptNumber) {
  var applicationNo = (0, _commons.getQueryArg)(href, "applicationNumber");
  var tenantId = (0, _commons.getQueryArg)(href, "tenantId");
  var purpose = "pay";
  var status = "success";
  dispatch((0, _actions.setRoute)("/tradelicence/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&secondNumber=" + receiptNumber));
};

var getSelectedTabIndex = function getSelectedTabIndex(paymentType) {
  switch (paymentType) {
    case "Cash":
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
    case "Cheque":
      return {
        selectedPaymentMode: "cheque",
        selectedTabIndex: 1,
        fieldsToValidate: ["payeeDetails", "chequeDetails"]
      };
    case "DD":
      return {
        selectedPaymentMode: "demandDraft",
        selectedTabIndex: 2,
        fieldsToValidate: ["payeeDetails", "demandDraftDetails"]
      };
    case "Card":
      return {
        selectedPaymentMode: "card",
        selectedTabIndex: 3,
        fieldsToValidate: ["payeeDetails", "cardDetails"]
      };
    default:
      return {
        selectedPaymentMode: "cash",
        selectedTabIndex: 0,
        fieldsToValidate: ["payeeDetails"]
      };
  }
};

var convertDateFieldToEpoch = function convertDateFieldToEpoch(finalObj, jsonPath) {
  var dateConvertedToEpoch = (0, _utils2.convertDateToEpoch)((0, _get2.default)(finalObj, jsonPath));
  (0, _set2.default)(finalObj, jsonPath, dateConvertedToEpoch);
};

var allDateToEpoch = function allDateToEpoch(finalObj, jsonPaths) {
  jsonPaths.forEach(function (jsonPath) {
    if ((0, _get2.default)(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

var callBackForPay = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var href, isFormValid, selectedPaymentType, _getSelectedTabIndex, selectedTabIndex, selectedPaymentMode, fieldsToValidate, ReceiptDataTemp, finalReceiptData, ReceiptBody, response, receiptNumber;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            href = window.location.href;
            isFormValid = true;

            // --- Validation related -----//

            selectedPaymentType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0].instrument.instrumentType.name");
            _getSelectedTabIndex = getSelectedTabIndex(selectedPaymentType), selectedTabIndex = _getSelectedTabIndex.selectedTabIndex, selectedPaymentMode = _getSelectedTabIndex.selectedPaymentMode, fieldsToValidate = _getSelectedTabIndex.fieldsToValidate;


            isFormValid = fieldsToValidate.map(function (curr) {
              return (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.capturePaymentDetails.children.cardContent.children.tabSection.props.tabs[" + selectedTabIndex + "].tabContent." + selectedPaymentMode + ".children." + curr + ".children", state, dispatch, "pay");
            }).indexOf(false) === -1;
            if ((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Bill[0].billDetails[0].manualReceiptDate")) {
              isFormValid = (0, _utils2.validateFields)("components.div.children.formwizardFirstStep.children.paymentDetails.children.cardContent.children.g8Details.children.cardContent.children.receiptDetailsCardContainer.children", state, dispatch, "pay");
            }

            //------------ Validation End -------------//

            //------------- Form related ----------------//

            ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ReceiptTemp[0]");
            finalReceiptData = (0, _cloneDeep2.default)(ReceiptDataTemp);


            allDateToEpoch(finalReceiptData, ["Bill[0].billDetails[0].manualReceiptDate", "instrument.transactionDateInput"]);

            // if (get(finalReceiptData, "Bill[0].billDetails[0].manualReceiptDate")) {
            //   convertDateFieldToEpoch(
            //     finalReceiptData,
            //     "Bill[0].billDetails[0].manualReceiptDate"
            //   );
            // }

            // if (get(finalReceiptData, "instrument.transactionDateInput")) {
            //   convertDateFieldToEpoch(
            //     finalReceiptData,
            //     "Bill[0].billDetails[0].manualReceiptDate"
            //   );
            // }
            if ((0, _get2.default)(finalReceiptData, "instrument.transactionDateInput")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentDate", (0, _get2.default)(finalReceiptData, "instrument.transactionDateInput"));
            }

            if ((0, _get2.default)(finalReceiptData, "instrument.transactionNumber")) {
              (0, _set2.default)(finalReceiptData, "instrument.instrumentNumber", (0, _get2.default)(finalReceiptData, "instrument.transactionNumber"));
            }

            if (!(selectedPaymentType === "Card")) {
              _context.next = 15;
              break;
            }

            if (!((0, _get2.default)(finalReceiptData, "instrument.transactionNumber") !== (0, _get2.default)(finalReceiptData, "instrument.transactionNumberConfirm"))) {
              _context.next = 15;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, "Transaction numbers don't match !", "error"));
            return _context.abrupt("return");

          case 15:

            //------------- Form End ----------------//

            ReceiptBody = {
              Receipt: []
            };


            ReceiptBody.Receipt.push(finalReceiptData);

            // console.log(ReceiptBody);

            //---------------- Create Receipt ------------------//

            if (!isFormValid) {
              _context.next = 32;
              break;
            }

            _context.prev = 18;
            _context.next = 21;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_create", "_create", [], ReceiptBody, [], {});

          case 21:
            response = _context.sent;
            receiptNumber = (0, _get2.default)(response, "Receipt[0].Bill[0].billDetails[0].receiptNumber", null);

            moveToSuccess(href, dispatch, receiptNumber);
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](18);

            dispatch((0, _actions2.toggleSnackbar)(true, _context.t0.message, "error"));
            console.log(_context.t0);

          case 30:
            _context.next = 33;
            break;

          case 32:
            dispatch((0, _actions2.toggleSnackbar)(true, "Please fill all the mandatory fields", "warning"));

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 26]]);
  }));

  return function callBackForPay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var footer = exports.footer = getCommonApplyFooter({
  submitButton: {
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
        labelName: "Submit",
        labelKey: "TL_COMMON_BUTTON_SUBMIT"
      }),
      submitButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    roleDefination: {
      rolePath: "user-info.roles",
      //roles: ["TL_CEMP"]
      action: "PAY"
    },
    visible: process.env.REACT_APP_NAME === "Citizen" ? false : true
  },
  downloadConfirmationform: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "DOWNLOAD CONFIRMATION FORM",
        labelKey: "TL_COMMON_BUTTON_DOWNLOAD_CONFIRMATION_FORM"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["CITIZEN"]
    }
  },
  printConfirmationform: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "45px"
      }
    },
    children: {
      submitButtonLabel: (0, _utils.getLabel)({
        labelName: "PRINT CONFIRMATION FORM",
        labelKey: "TL_COMMON_BUTTON_PRINT_CONFIRMATION_FORM"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackForPay
    },
    roleDefination: {
      rolePath: "user-info.roles",
      roles: ["CITIZEN"]
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
        labelKey: "TL_COMMON_BUTTON_CITIZEN_MAKE_PAYMENT"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/fire-noc/acknowledgement?purpose=pay&status=success&applicationNumber=NOC-JLD-2018-09-8786&secondNumber=NOC-RCPT-007652" : "/fire-noc/acknowledgement?purpose=pay&status=success&applicationNumber=NOC-JLD-2018-09-8786&secondNumber=NOC-RCPT-007652"
      // roleDefination: {
      //   rolePath: "user-info.roles",
      //   // roles: ["CITIZEN"]
      //   action: "PAY"
      // },
      // visible: process.env.REACT_APP_NAME === "Citizen" ? true : false
    } }
});