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

var fetchProperties = exports.fetchProperties = function fetchProperties(queryObject) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var payload, draftpayload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(propertyFetchPending());
              dispatch(draftFetchPending());
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.httpRequest)(_endPoints.PROPERTY.GET.URL, _endPoints.PROPERTY.GET.ACTION, queryObject);

            case 5:
              payload = _context.sent;

              dispatch(propertyFetchComplete(payload));
              _context.prev = 7;
              _context.next = 10;
              return (0, _api.httpRequest)(_endPoints.DRAFT.GET.URL, _endPoints.DRAFT.GET.ACTION, queryObject);

            case 10:
              draftpayload = _context.sent;

              dispatch(draftFetchComplete(draftpayload));
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](7);

              dispatch(draftFetchError(_context.t0.message));

            case 17:
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t1 = _context["catch"](2);

              dispatch(propertyFetchError(_context.t1.message));

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 19], [7, 14]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};