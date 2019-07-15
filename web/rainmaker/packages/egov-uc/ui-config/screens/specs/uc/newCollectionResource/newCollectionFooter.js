"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCollectionFooter = exports.getRedirectionURL = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("egov-ui-framework/ui-utils/api");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

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

var newCollectionFooter = exports.newCollectionFooter = getCommonApplyFooter({
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
        labelName: "NEXT",
        labelKey: "UC_BUTTON_NEXT"
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
        processDemand(state, dispatch);
      }
    }
  }
});

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

var processDemand = function processDemand(state, dispatch) {
  var isFormValid = (0, _utils2.validateFields)("components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", state, dispatch, "newCollection");
  if (isFormValid) {
    createDemand(state, dispatch);
    allDateToEpoch(state.screenConfiguration.preparedFinalObject, ["Demands[0].taxPeriodFrom", "Demands[0].taxPeriodTo"]);
  } else {
    dispatch((0, _actions2.toggleSnackbar)(true, {
      labelName: "Please fill the required fields.",
      labelKey: "UC_REQUIRED_FIELDS_ERROR_MSG"
    }, "error"));
  }
};

var createDemand = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var demands, taxHeadsFilled, taxPeriodValid, payload, consumerCode, businessService;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            demands = JSON.parse(JSON.stringify((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Demands")));

            (0, _set2.default)(demands[0], "consumerType", demands[0].businessService);
            taxHeadsFilled = demands[0].demandDetails && demands[0].demandDetails.filter(function (item) {
              return item.taxAmount >= 0;
            });

            (0, _set2.default)(demands[0], "demandDetails", taxHeadsFilled);
            demands[0].serviceType && (0, _set2.default)(demands[0], "businessService", demands[0].serviceType);
            (0, _set2.default)(demands[0], "taxPeriodFrom", (0, _utils2.convertDateToEpoch)(demands[0].taxPeriodFrom));
            (0, _set2.default)(demands[0], "taxPeriodTo", (0, _utils2.convertDateToEpoch)(demands[0].taxPeriodTo));

            //Check if tax period fall between the tax periods coming from MDMS -- Not required as of now
            taxPeriodValid = isTaxPeriodValid(dispatch, demands[0], state);

            if (!taxHeadsFilled.length) {
              _context.next = 30;
              break;
            }

            if (!taxPeriodValid) {
              _context.next = 28;
              break;
            }

            _context.prev = 10;
            _context.next = 13;
            return (0, _api.httpRequest)("post", "/billing-service/demand/_create", "", [], {
              Demands: demands
            });

          case 13:
            payload = _context.sent;

            if (!(payload.Demands.length > 0)) {
              _context.next = 21;
              break;
            }

            consumerCode = (0, _get2.default)(payload, "Demands[0].consumerCode");
            businessService = (0, _get2.default)(payload, "Demands[0].businessService");
            _context.next = 19;
            return generateBill(consumerCode, tenantId, businessService, dispatch);

          case 19:
            _context.next = 22;
            break;

          case 21:
            alert("Empty response!!");

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](10);

            console.log(_context.t0.message);
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: _context.t0.message,
              labelKey: _context.t0.message
            }, "error"));

          case 28:
            _context.next = 31;
            break;

          case 30:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please fill atleast one tax amount",
              labelKey: "UC_NEW_COLLECTION_ATLEAST_ONE_TAX_MSG"
            }, "warning"));

          case 31:
            console.log("Demands:", demands);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[10, 24]]);
  }));

  return function createDemand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var generateBill = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(consumerCode, tenantId, businessService, dispatch) {
    var payload, estimateData;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/_generate?consumerCode=" + consumerCode + "&businessService=" + businessService + "&tenantId=" + tenantId, "", [], {});

          case 3:
            payload = _context2.sent;

            if (payload && payload.Bill[0]) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createEstimateData(payload.Bill[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.consumerCode", consumerCode));
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.businessService", businessService));
              dispatch((0, _actions.setRoute)("/uc/pay?tenantId=" + tenantId));
            }
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function generateBill(_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var createEstimateData = function createEstimateData(billObject) {
  var billDetails = billObject && billObject.billDetails;
  var fees = billDetails && billDetails[0].billAccountDetails && billDetails[0].billAccountDetails.map(function (item) {
    return {
      name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
      value: item.amount,
      info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
    };
  });
  return fees;
};

var isTaxPeriodValid = function isTaxPeriodValid(dispatch, demand, state) {
  var taxPeriods = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.BillingService.TaxPeriod", []);
  var selectedFrom = new Date(demand.taxPeriodFrom);
  var selectedTo = new Date(demand.taxPeriodTo);
  if (selectedFrom < selectedTo) {
    return true;
  } else {
    dispatch((0, _actions2.toggleSnackbar)(true, {
      labelName: "Please select the right tax period",
      labelKey: "UC_NEW_COLLECTION_WRONG_TAX_PERIOD_MSG"
    }, "warning"));
    return false;
  }

  //Validation against MDMS Tax periods not required as of now.
  var found = taxPeriods.length > 0 && taxPeriods.find(function (item) {
    var fromDate = new Date(item.fromDate);
    var toDate = new Date(item.toDate);
    return item.service === demand.businessService && fromDate <= selectedFrom && toDate >= selectedTo;
  });
  if (found) return true;else {
    dispatch((0, _actions2.toggleSnackbar)(true, {
      labelName: "Please select the right tax period",
      labelKey: "UC_NEW_COLLECTION_WRONG_TAX_PERIOD_MSG"
    }, "warning"));
    return false;
  }
};