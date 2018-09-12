"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleAssesmentandStatus = exports.getAssesmentsandStatus = exports.fetchReceipts = exports.fetchProperties = undefined;

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

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _groupBy = require("lodash/groupBy");

var _groupBy2 = _interopRequireDefault(_groupBy);

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

var SingleAssessmentStatusFetchPending = function SingleAssessmentStatusFetchPending() {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_PENDING
  };
};
var SingleAssessmentStatusFetchError = function SingleAssessmentStatusFetchError(error) {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_ERROR,
    error: error
  };
};
var SingleAssessmentStatusFetchComplete = function SingleAssessmentStatusFetchComplete(payload) {
  return {
    type: actionTypes.SINGLE_ASSESSMENT_STATUS_COMPLETE,
    payload: payload
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

var getStatusAndAmount = function getStatusAndAmount(receiptArrayItem) {
  var receiptTransformed = receiptArrayItem.reduce(function (result, current) {
    if (!result.totalAmount) result.totalAmount = 0;
    result.totalAmount += current.amountPaid;
    result.totalAmountToPay = receiptArrayItem[receiptArrayItem.length - 1].totalAmount;
    return result;
  }, {});
  if (receiptTransformed.totalAmount === receiptTransformed.totalAmountToPay) {
    receiptTransformed["status"] = "Paid";
  } else {
    receiptTransformed["status"] = "Partially Paid";
  }
  return receiptTransformed;
};

var mergeReceiptsInProperty = function mergeReceiptsInProperty(receiptsArray, propertyObj) {
  var transformedPropertyObj = (0, _extends3.default)({}, propertyObj);
  Object.keys(receiptsArray).forEach(function (item) {
    if (transformedPropertyObj.hasOwnProperty(item)) {
      transformedPropertyObj[item].receiptInfo = getStatusAndAmount((0, _orderBy2.default)(receiptsArray[item], "totalAmount", "asc"));
    }
  });
  var mergedReceiptsProperties = Object.values(transformedPropertyObj).filter(function (property) {
    return property.receiptInfo;
  });
  var groupByPropertyId = mergedReceiptsProperties.reduce(function (res, item) {
    if (!res[item.propertyId]) res[item.propertyId] = {};
    if (!res[item.propertyId][item.financialYear]) res[item.propertyId][item.financialYear] = [];
    res[item.propertyId][item.financialYear].push(item);
    return res;
  }, {});
  for (var propertyId in groupByPropertyId) {
    for (var year in groupByPropertyId[propertyId]) {
      var assessmentByDate = (0, _orderBy2.default)(groupByPropertyId[propertyId][year], "assessmentDate", "asc");

      if (assessmentByDate.findIndex(function (item) {
        return item.receiptInfo.status === "Paid";
      }) > -1) {
        for (var i = 0; i < assessmentByDate.length; i++) {
          if (i !== assessmentByDate.length - 1) {
            // if (assessmentByDate[i].receiptInfo.status === "Partially Paid") {
            assessmentByDate[i].receiptInfo.status = "Completed";
            // } else {
            //   assessmentByDate[i].receiptInfo.status = "Paid";
            // }
          }
        }
      }
    }
  }
  return mergedReceiptsProperties;
};

var getAssesmentsandStatus = exports.getAssesmentsandStatus = function getAssesmentsandStatus(queryObjectproperty) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payloadProperty, propertybyId, consumerCodes, finalcc, commaSeperatedCC, payloadReceipts, receiptbyId, receiptDetails;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch(AssessmentStatusFetchPending());
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 4:
              payloadProperty = _context3.sent;
              propertybyId = (0, _commons.transformById)(payloadProperty["Properties"], "propertyId");
              consumerCodes = propertybyId && Object.values(propertybyId).reduce(function (result, curr) {
                var propertyDetail = curr && curr.propertyDetails && curr.propertyDetails.reduce(function (consumerCodes, item) {
                  consumerCodes[curr.propertyId + ":" + item.assessmentNumber] = (0, _extends3.default)({}, item, {
                    propertyId: curr.propertyId,
                    address: curr.address,
                    tenantId: curr.tenantId,
                    property: curr
                  });
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
              commaSeperatedCC = Object.keys(finalcc).join(",");
              _context3.next = 11;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: commaSeperatedCC }], {}, [], {
                ts: 0
              }, true);

            case 11:
              payloadReceipts = _context3.sent;
              receiptbyId = (0, _commons.transformById)(payloadReceipts["Receipt"], "transactionId");
              receiptDetails = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount
                });
                return acc;
              }, {});


              dispatch(AssessmentStatusFetchComplete(mergeReceiptsInProperty(receiptDetails, finalcc)));
              _context3.next = 20;
              break;

            case 17:
              _context3.prev = 17;
              _context3.t0 = _context3["catch"](1);

              dispatch(AssessmentStatusFetchError(_context3.t0.message));

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 17]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var getSingleAssesmentandStatus = exports.getSingleAssesmentandStatus = function getSingleAssesmentandStatus(queryObjectproperty) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch) {
      var consumerCodes, finalcc, payloadReceipts, receiptbyId, receiptDetails;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch(SingleAssessmentStatusFetchPending());
              _context4.prev = 1;
              consumerCodes = queryObjectproperty && queryObjectproperty.propertyDetails && queryObjectproperty.propertyDetails.reduce(function (acc, item) {
                acc[queryObjectproperty.propertyId + ":" + item.assessmentNumber] = (0, _extends3.default)({}, item, {
                  propertyId: queryObjectproperty.propertyId,
                  address: queryObjectproperty.address,
                  tenantId: queryObjectproperty.tenantId,
                  property: queryObjectproperty
                });
                return acc;
              }, {});
              finalcc = Object.keys(consumerCodes).join(",");
              _context4.next = 6;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: finalcc }], {}, [], {
                ts: 0
              }, true);

            case 6:
              payloadReceipts = _context4.sent;
              receiptbyId = (0, _commons.transformById)(payloadReceipts["Receipt"], "transactionId");
              receiptDetails = receiptbyId && Object.values(receiptbyId).reduce(function (acc, curr) {
                if (!acc[curr.Bill[0].billDetails[0].consumerCode]) acc[curr.Bill[0].billDetails[0].consumerCode] = [];
                acc[curr.Bill[0].billDetails[0].consumerCode].push({
                  amountPaid: curr.Bill[0].billDetails[0].amountPaid,
                  consumerCode: curr.Bill[0].billDetails[0].consumerCode,
                  totalAmount: curr.Bill[0].billDetails[0].totalAmount
                });
                return acc;
              }, {});

              dispatch(SingleAssessmentStatusFetchComplete(mergeReceiptsInProperty(receiptDetails, consumerCodes)));
              _context4.next = 15;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](1);

              dispatch(SingleAssessmentStatusFetchError(_context4.t0.message));

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 12]]);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
};