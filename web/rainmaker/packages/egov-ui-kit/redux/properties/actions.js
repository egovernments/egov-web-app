"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssesmentsandStatus = exports.fetchReceipts = exports.fetchProperties = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyFetchPending = function propertyFetchPending() {
  return {
    type: actionTypes.PROPERTY_FETCH_PENDING
  };
};

var draftFetchPending = function draftFetchPending() {
  return {
    type: actionTypes.DRAFT_FETCH_PENDING
  };
};

var propertyFetchComplete = function propertyFetchComplete(payload, overWrite) {
  return {
    type: actionTypes.PROPERTY_FETCH_COMPLETE,
    payload: payload
  };
};

var draftFetchComplete = function draftFetchComplete(payload) {
  return {
    type: actionTypes.DRAFT_FETCH_COMPLETE,
    payload: payload
  };
};

var propertyFetchError = function propertyFetchError(error) {
  return {
    type: actionTypes.PROPERTY_FETCH_ERROR,
    error: error
  };
};
var draftFetchError = function draftFetchError(error) {
  return {
    type: actionTypes.DRAFT_FETCH_ERROR,
    error: error
  };
};

var failedTransactionFetchError = function failedTransactionFetchError(error) {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_ERROR,
    error: error
  };
};
var failedTransactionFetchComplete = function failedTransactionFetchComplete(payload) {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_COMPLETE,
    payload: payload
  };
};
var failedTransactionFetchPending = function failedTransactionFetchPending() {
  return {
    type: actionTypes.FAILED_TRANSACTION_FETCH_PENDING
  };
};
var successTransactionFetchError = function successTransactionFetchError(error) {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_ERROR,
    error: error
  };
};
var successTransactionFetchComplete = function successTransactionFetchComplete(payload) {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_COMPLETE,
    payload: payload
  };
};
var successTransactionFetchPending = function successTransactionFetchPending() {
  return {
    type: actionTypes.SUCCESS_TRANSACTION_FETCH_PENDING
  };
};

var ReceiptFetchError = function ReceiptFetchError(error) {
  return {
    type: actionTypes.RECEIPT_FETCH_ERROR,
    error: error
  };
};
var ReceiptFetchComplete = function ReceiptFetchComplete(payload) {
  return {
    type: actionTypes.RECEIPT_FETCH_COMPLETE,
    payload: payload
  };
};
var ReceiptFetchPending = function ReceiptFetchPending() {
  return {
    type: actionTypes.RECEIPT_FETCH_PENDING
  };
};

var AssessmentStatusFetchError = function AssessmentStatusFetchError(error) {
  return {
    type: actionTypes.ASSESSMENT_STATUS_ERROR,
    error: error
  };
};
var AssessmentStatusFetchComplete = function AssessmentStatusFetchComplete(payload) {
  return {
    type: actionTypes.ASSESSMENT_STATUS_COMPLETE,
    payload: payload
  };
};
var AssessmentStatusFetchPending = function AssessmentStatusFetchPending() {
  return {
    type: actionTypes.ASSESSMENT_STATUS_PENDING
  };
};

var fetchProperties = exports.fetchProperties = function fetchProperties(queryObjectproperty, queryObjectDraft, queryObjectFailedPayments, queryObjectSuccessPayments) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var draftpayload, payloadProperty, payloadFailedPayments, payloadSuccessPayments;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!queryObjectDraft) {
                _context.next = 12;
                break;
              }

              dispatch(draftFetchPending());
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.httpRequest)(_endPoints.DRAFT.GET.URL, _endPoints.DRAFT.GET.ACTION, queryObjectDraft);

            case 5:
              draftpayload = _context.sent;

              dispatch(draftFetchComplete(draftpayload));
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](2);

              dispatch(draftFetchError(_context.t0.message));

            case 12:
              if (!queryObjectproperty) {
                _context.next = 24;
                break;
              }

              dispatch(propertyFetchPending());
              _context.prev = 14;
              _context.next = 17;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 17:
              payloadProperty = _context.sent;

              dispatch(propertyFetchComplete(payloadProperty));
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t1 = _context["catch"](14);

              dispatch(propertyFetchError(_context.t1.message));

            case 24:
              if (!queryObjectFailedPayments) {
                _context.next = 36;
                break;
              }

              dispatch(failedTransactionFetchPending());
              _context.prev = 26;
              _context.next = 29;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectFailedPayments, {}, [], {}, true);

            case 29:
              payloadFailedPayments = _context.sent;

              dispatch(failedTransactionFetchComplete(payloadFailedPayments));
              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t2 = _context["catch"](26);

              dispatch(failedTransactionFetchError(_context.t2.message));

            case 36:
              if (!queryObjectSuccessPayments) {
                _context.next = 48;
                break;
              }

              dispatch(successTransactionFetchPending());
              _context.prev = 38;
              _context.next = 41;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectSuccessPayments, {}, [], {}, true);

            case 41:
              payloadSuccessPayments = _context.sent;

              dispatch(successTransactionFetchComplete(payloadSuccessPayments));
              _context.next = 48;
              break;

            case 45:
              _context.prev = 45;
              _context.t3 = _context["catch"](38);

              dispatch(successTransactionFetchError(_context.t3.message));

            case 48:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 9], [14, 21], [26, 33], [38, 45]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchReceipts = exports.fetchReceipts = function fetchReceipts(queryObj) {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var payloadReceipts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch(ReceiptFetchPending());
              _context2.prev = 1;
              _context2.next = 4;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, queryObj, {}, [], { ts: 0 });

            case 4:
              payloadReceipts = _context2.sent;

              dispatch(ReceiptFetchComplete(payloadReceipts));
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);

              dispatch(ReceiptFetchError(_context2.t0.message));

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[1, 8]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var getAssesmentsandStatus = exports.getAssesmentsandStatus = function getAssesmentsandStatus(queryObjectproperty) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payloadProperty, propertybyId, consumerCodes, finalcc, commaSeperatedCC, payloadReceipts, receiptbyId, receiptDetails;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("inside status.....");
              dispatch(AssessmentStatusFetchPending());
              _context3.prev = 2;
              _context3.next = 5;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 5:
              payloadProperty = _context3.sent;
              propertybyId = (0, _commons.transformById)(payloadProperty["Properties"], "propertyId");
              consumerCodes = propertybyId && Object.values(propertybyId).reduce(function (result, curr) {
                var propertyDetail = curr && curr.propertyDetails && curr.propertyDetails.reduce(function (consumerCodes, item) {
                  consumerCodes[curr.propertyId + ":" + item.assessmentNumber] = (0, _extends3.default)({}, item, { propertyId: curr.propertyId, address: curr.address });
                  return consumerCodes;
                }, []);

                result.push(propertyDetail);
                return result;
              }, []);
              finalcc = consumerCodes && consumerCodes.reduce(function (acc, curr) {
                Object.keys(curr).map(function (item) {
                  acc[item] = curr[item];
                });
                return acc;
              }, {});

              console.log(finalcc);
              commaSeperatedCC = Object.keys(finalcc).join(",");
              _context3.next = 13;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: commaSeperatedCC }], {}, [], {
                ts: 0
              });

            case 13:
              payloadReceipts = _context3.sent;
              receiptbyId = (0, _commons.transformById)(payloadReceipts["Receipt"], "transactionId");
              receiptDetails = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode] = {
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount
                };
                return acc;
              }, {});

              console.log(receiptDetails);
              // dispatch(AssessmentStatusFetchComplete(result));
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](2);

              dispatch(AssessmentStatusFetchError(_context3.t0.message));

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[2, 19]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};