"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchProperties = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _api = require("egov-ui-kit/utils/api");

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

var fetchProperties = exports.fetchProperties = function fetchProperties(queryObjectproperty, queryObjectDraft) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var draftpayload, payloadProperty;
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
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 9], [14, 21]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};