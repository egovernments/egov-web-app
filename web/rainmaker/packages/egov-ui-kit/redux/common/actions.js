"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchMDMSData = exports.fetchCitizens = exports.fetchEmployees = exports.setDropDownData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDropDownData = exports.setDropDownData = function setDropDownData(key, payload) {
  return { type: actionTypes.SET_DROPDOWN_DATA, key: key, payload: payload };
};

var employeeFetchSuccess = function employeeFetchSuccess(payload) {
  return {
    type: actionTypes.EMPLOYEE_FETCH_SUCCESS,
    payload: payload
  };
};

var employeeFetchError = function employeeFetchError(error) {
  return {
    type: actionTypes.EMPLOYEE_FETCH_ERROR,
    error: error
  };
};

var citizenFetchSuccess = function citizenFetchSuccess(payload) {
  return {
    type: actionTypes.CITIZEN_FETCH_SUCCESS,
    payload: payload
  };
};

var citizenFetchError = function citizenFetchError(error) {
  return {
    type: actionTypes.CITIZEN_FETCH_ERROR,
    error: error
  };
};

var MDMSFetchSuccess = function MDMSFetchSuccess(payload) {
  return {
    type: actionTypes.MDMS_FETCH_SUCCESS,
    payload: payload
  };
};

var MDMSFetchError = function MDMSFetchError(error) {
  return {
    type: actionTypes.MDMS_FETCH_ERROR,
    error: error
  };
};

var fetchEmployees = exports.fetchEmployees = function fetchEmployees(requestBody) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _api.httpRequest)(_endPoints.EMPLOYEE.GET.URL, _endPoints.EMPLOYEE.GET.ACTION, requestBody);

            case 3:
              payload = _context.sent;

              dispatch(employeeFetchSuccess(payload));
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);

              dispatch(employeeFetchError(_context.t0.message));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchCitizens = exports.fetchCitizens = function fetchCitizens() {
  var requestBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var requestParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _api.httpRequest)(_endPoints.CITIZEN.GET.URL, _endPoints.CITIZEN.GET.ACTION, requestParams, requestBody);

            case 3:
              payload = _context2.sent;

              dispatch(citizenFetchSuccess(payload));
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);

              dispatch(citizenFetchError(_context2.t0.message));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var fetchMDMSData = exports.fetchMDMSData = function fetchMDMSData(requestBody) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 3:
              payload = _context3.sent;

              dispatch(MDMSFetchSuccess(payload));
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);

              dispatch(MDMSFetchError(_context3.t0.message));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }();
};