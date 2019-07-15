"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _acknowledgementUtils = require("./acknowledgementResource/acknowledgementUtils");

var _acknowledgementUtils2 = _interopRequireDefault(_acknowledgementUtils);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _acknowledgementFooter = require("./acknowledgementResource/acknowledgementFooter");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons2 = require("../../../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAcknowledgementCard = function getAcknowledgementCard(state, dispatch, purpose, status, receiptNumber, secondNumber, tenant) {
  if (purpose === "pay" && status === "success") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "New Collection",
        labelKey: "UC_COMMON_HEADER"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            position: "absolute",
            width: "95%"
          }
        },
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "done",
            backgroundColor: "#39CB74",
            header: {
              labelName: "Payment has been collected successfully!",
              labelKey: "UC_PAYMENT_COLLECTED_SUCCESS_MESSAGE_MAIN"
            },
            body: {
              labelName: "A notification regarding Payment Collection has been sent to the consumer at registered Mobile No.",
              labelKey: "UC_PAYMENT_SUCCESS_MESSAGE_SUB"
            },
            tailText: {
              labelName: "payment receipt no.",
              labelKey: "UC_PAYMENT_NO_LABEL"
            },
            number: receiptNumber
          })
        }
      },
      iframeForPdf: {
        uiFramework: "custom-atoms",
        componentPath: "Div"
      },
      applicationSuccessFooter: _acknowledgementFooter.acknowledgementSuccesFooter
    };
  } else if (purpose === "pay" && status === "failure") {
    return {
      header: (0, _utils.getCommonHeader)({
        labelName: "New collection",
        labelKey: "new collection"
      }),
      applicationSuccessCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          card: (0, _acknowledgementUtils2.default)({
            icon: "close",
            backgroundColor: "#E54D42",
            header: {
              labelName: "Payment Collection failed!",
              labelKey: "UC_PAYMENT_FAILED"
            },
            body: {
              labelName: "Payment Collection has been failed!",
              labelKey: "UC_PAYMENT_NOTIFICATION"
            }
          })
        }
      },
      paymentFailureFooter: _acknowledgementFooter.acknowledgementFailureFooter
    };
  }
};

var getSearchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, queryObj) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _commons2.getSearchResults)(queryObj);

          case 2:
            response = _context.sent;

            response && response.Receipt && response.Receipt.length > 0 && dispatch((0, _actions.prepareFinalObject)("receiptSearchResponse.Receipt", response.Receipt));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getSearchData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "acknowledgement",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var purpose = (0, _commons.getQueryArg)(window.location.href, "purpose");
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var receiptNumber = (0, _commons.getQueryArg)(window.location.href, "receiptNumber");
    var secondNumber = (0, _commons.getQueryArg)(window.location.href, "secondNumber");
    var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var serviceCategory = (0, _commons.getQueryArg)(window.location.href, "serviceCategory");
    var tenantId = (0, _localStorageUtils.getTenantId)();
    var queryObject = [{
      key: "tenantId",
      value: tenantId
    }, { key: "offset", value: "0" }, {
      key: "receiptNumbers",
      value: receiptNumber
    }, {
      key: "businessCodes",
      value: serviceCategory
    }];

    getSearchData(dispatch, queryObject);

    var data = getAcknowledgementCard(state, dispatch, purpose, status, receiptNumber, secondNumber, tenant);
    (0, _set2.default)(action, "screenConfig.components.div.children", data);
    return action;
  }
};

exports.default = screenConfig;