"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSingleAssesmentandStatus = exports.getAssesmentsandStatus = exports.fetchReceipts = exports.fetchProperties = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

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

var mohallaFetchComplete = function mohallaFetchComplete(payload) {
  return {
    type: actionTypes.MOHALLA_FETCH_COMPLETE,
    payload: payload
  };
};

var fetchMohalla = function fetchMohalla(queryObj) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var mergedMohallas, i, payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              mergedMohallas = [];
              i = 0;

            case 3:
              if (!(i < queryObj.length)) {
                _context.next = 11;
                break;
              }

              _context.next = 6;
              return (0, _api.httpRequest)(_endPoints.BOUNDARY.GET.URL, _endPoints.BOUNDARY.GET.ACTION, queryObj[i]);

            case 6:
              payload = _context.sent;

              if (payload && payload.TenantBoundary) {
                mergedMohallas.push.apply(mergedMohallas, (0, _toConsumableArray3.default)(payload.TenantBoundary[0].boundary));
              }

            case 8:
              i++;
              _context.next = 3;
              break;

            case 11:
              dispatch(mohallaFetchComplete(mergedMohallas));
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);

              console.log(_context.t0);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 14]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var setMohallaInRedux = function setMohallaInRedux(dispatch, state, draftResponse) {
  var tenantId = (0, _get2.default)(draftResponse, "drafts[0].tenantId");

  var _ref2 = draftResponse || {},
      drafts = _ref2.drafts;

  var mohallaCodes = drafts && drafts.reduce(function (result, current) {
    if (current.draftRecord && current.draftRecord.prepareFormData) {
      if (!result[current.tenantId]) result[current.tenantId] = [];
      if ((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code") && result[current.tenantId].indexOf((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code")) === -1) {
        result[current.tenantId].push((0, _get2.default)(current, "draftRecord.prepareFormData.Properties[0].address.locality.code"));
      }
    }
    return result;
  }, {});
  var queryObj = Object.keys(mohallaCodes).map(function (item) {
    return [{
      key: "tenantId",
      value: item
    }, { key: "hierarchyTypeCode", value: "REVENUE" }, { key: "boundaryType", value: "Locality" }, { key: "codes", value: mohallaCodes[item].join(",") }];
  });
  dispatch(fetchMohalla(queryObj));
};

var fetchProperties = exports.fetchProperties = function fetchProperties(queryObjectproperty, queryObjectDraft, queryObjectFailedPayments, queryObjectSuccessPayments) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, getState) {
      var draftpayload, payloadProperty, payloadFailedPayments, payloadSuccessPayments;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!queryObjectDraft) {
                _context2.next = 13;
                break;
              }

              dispatch(draftFetchPending());
              _context2.prev = 2;
              _context2.next = 5;
              return (0, _api.httpRequest)(_endPoints.DRAFT.GET.URL, _endPoints.DRAFT.GET.ACTION, queryObjectDraft);

            case 5:
              draftpayload = _context2.sent;

              setMohallaInRedux(dispatch, getState(), draftpayload);
              dispatch(draftFetchComplete(draftpayload));
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](2);

              dispatch(draftFetchError(_context2.t0.message));

            case 13:
              if (!queryObjectproperty) {
                _context2.next = 25;
                break;
              }

              dispatch(propertyFetchPending());
              _context2.prev = 15;
              _context2.next = 18;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 18:
              payloadProperty = _context2.sent;

              dispatch(propertyFetchComplete(payloadProperty));
              _context2.next = 25;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t1 = _context2["catch"](15);

              dispatch(propertyFetchError(_context2.t1.message));

            case 25:
              if (!queryObjectFailedPayments) {
                _context2.next = 37;
                break;
              }

              dispatch(failedTransactionFetchPending());
              _context2.prev = 27;
              _context2.next = 30;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectFailedPayments, {}, [], {}, true);

            case 30:
              payloadFailedPayments = _context2.sent;

              dispatch(failedTransactionFetchComplete(payloadFailedPayments));
              _context2.next = 37;
              break;

            case 34:
              _context2.prev = 34;
              _context2.t2 = _context2["catch"](27);

              dispatch(failedTransactionFetchError(_context2.t2.message));

            case 37:
              if (!queryObjectSuccessPayments) {
                _context2.next = 49;
                break;
              }

              dispatch(successTransactionFetchPending());
              _context2.prev = 39;
              _context2.next = 42;
              return (0, _api.httpRequest)(_endPoints.PGService.GET.URL, _endPoints.PGService.GET.ACTION, queryObjectSuccessPayments, {}, [], {}, true);

            case 42:
              payloadSuccessPayments = _context2.sent;

              dispatch(successTransactionFetchComplete(payloadSuccessPayments));
              _context2.next = 49;
              break;

            case 46:
              _context2.prev = 46;
              _context2.t3 = _context2["catch"](39);

              dispatch(successTransactionFetchError(_context2.t3.message));

            case 49:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 10], [15, 22], [27, 34], [39, 46]]);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var fetchReceipts = exports.fetchReceipts = function fetchReceipts(queryObj) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payloadReceipts;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              dispatch(ReceiptFetchPending());
              _context3.prev = 1;
              _context3.next = 4;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, queryObj, {}, [], { ts: 0 });

            case 4:
              payloadReceipts = _context3.sent;

              dispatch(ReceiptFetchComplete(payloadReceipts));
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);

              dispatch(ReceiptFetchError(_context3.t0.message));

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[1, 8]]);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
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

      // if (assessmentByDate.findIndex((item) => item.receiptInfo.status === "Paid") > -1) {
      // Group by year -> Set status as completed/paid-disable to hide/show re-assess option
      for (var i = 0; i < assessmentByDate.length; i++) {
        if (i !== assessmentByDate.length - 1) {
          if (assessmentByDate[i].receiptInfo.status === "Partially Paid") {
            assessmentByDate[i].receiptInfo.status = "Completed";
          } else {
            assessmentByDate[i].receiptInfo.status = "Paid-Disable";
          }
        }
      }
      // }
    }
  }
  return mergedReceiptsProperties;
};

var getAssesmentsandStatus = exports.getAssesmentsandStatus = function getAssesmentsandStatus(queryObjectproperty) {
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch) {
      var payloadProperty, propertybyId, consumerCodes, finalcc, commaSeperatedCC, payloadReceipts, receiptbyId, receiptDetails;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch(AssessmentStatusFetchPending());
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObjectproperty);

            case 4:
              payloadProperty = _context4.sent;
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
              _context4.next = 11;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: commaSeperatedCC }], {}, [], {
                ts: 0
              }, true);

            case 11:
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


              dispatch(AssessmentStatusFetchComplete(mergeReceiptsInProperty(receiptDetails, finalcc)));
              _context4.next = 20;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](1);

              dispatch(AssessmentStatusFetchError(_context4.t0.message));

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 17]]);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var getSingleAssesmentandStatus = exports.getSingleAssesmentandStatus = function getSingleAssesmentandStatus(queryObjectproperty) {
  return function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch) {
      var latestPropertyDetails, consumerCodes, finalcc, payloadReceipts, payloadWithReceiptAsId, receiptbyId, receiptDetails;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              dispatch(SingleAssessmentStatusFetchPending());
              _context5.prev = 1;
              latestPropertyDetails = queryObjectproperty && queryObjectproperty.propertyDetails && (0, _PTCommon.getLatestPropertyDetails)(queryObjectproperty.propertyDetails);
              consumerCodes = queryObjectproperty && queryObjectproperty.propertyDetails && queryObjectproperty.propertyDetails.reduce(function (acc, item) {
                acc[queryObjectproperty.propertyId + ":" + item.assessmentNumber] = (0, _extends3.default)({}, item, {
                  propertyId: queryObjectproperty.propertyId,
                  address: queryObjectproperty.address,
                  tenantId: queryObjectproperty.tenantId,
                  property: queryObjectproperty,
                  latestAssessmentNumber: latestPropertyDetails.assessmentNumber
                });
                return acc;
              }, {});
              finalcc = Object.keys(consumerCodes).join(",");
              _context5.next = 7;
              return (0, _api.httpRequest)(_endPoints.RECEIPT.GET.URL, _endPoints.RECEIPT.GET.ACTION, [{ key: "consumerCode", value: finalcc }], {}, [], {
                ts: 0
              }, true);

            case 7:
              payloadReceipts = _context5.sent;
              payloadWithReceiptAsId = (0, _cloneDeep2.default)(payloadReceipts["Receipt"]).map(function (item) {
                item.receiptNumber = (0, _get2.default)(item, "Bill[0].billDetails[0].receiptNumber", "");
                return item;
              });
              receiptbyId = (0, _commons.transformById)(payloadWithReceiptAsId, "receiptNumber");
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
              _context5.next = 17;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](1);

              dispatch(SingleAssessmentStatusFetchError(_context5.t0.message));

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[1, 14]]);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
};