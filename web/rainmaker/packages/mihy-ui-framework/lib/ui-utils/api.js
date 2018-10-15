"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logoutRequest = exports.loginRequest = exports.httpRequest = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _commons = require("./commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = _axios2.default.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

var wrapRequestBody = function wrapRequestBody(requestBody, action) {
  var authToken = (0, _commons.fetchFromLocalStorage)("token");
  var RequestInfo = {
    apiId: "Mihy",
    ver: ".01",
    ts: (0, _commons.getDateInEpoch)(),
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|en_IN",
    requesterId: "",
    authToken: authToken
  };
  return Object.assign({}, {
    RequestInfo: RequestInfo
  }, requestBody);
};

var httpRequest = exports.httpRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "get";
    var endPoint = arguments[1];
    var action = arguments[2];
    var queryObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var requestBody = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var headers = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    var apiError, response, responseStatus, _error$response, data, status;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            apiError = "Api Error";


            if (headers) instance.defaults = Object.assign(instance.defaults, {
              headers: headers
            });

            endPoint = (0, _commons.addQueryArg)(endPoint, queryObject);
            _context.prev = 3;
            _context.t0 = method;
            _context.next = _context.t0 === "post" ? 7 : 11;
            break;

          case 7:
            _context.next = 9;
            return instance.post(endPoint, wrapRequestBody(requestBody, action));

          case 9:
            response = _context.sent;
            return _context.abrupt("break", 14);

          case 11:
            _context.next = 13;
            return instance.get(endPoint);

          case 13:
            response = _context.sent;

          case 14:
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", response.data);

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](3);
            _error$response = _context.t1.response, data = _error$response.data, status = _error$response.status;

            if (status === 400 && data === "") {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 23:
            throw new Error(apiError);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 19]]);
  }));

  return function httpRequest() {
    return _ref.apply(this, arguments);
  };
}();

var loginRequest = exports.loginRequest = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var apiError;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            apiError = "Api Error";
            _context2.prev = 1;

            // api call for login
            alert("Logged in");
            return _context2.abrupt("return");

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](1);

            apiError = _context2.t0.message;
            // alert(e.message);

          case 9:
            throw new Error(apiError);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 6]]);
  }));

  return function loginRequest() {
    return _ref2.apply(this, arguments);
  };
}();

var logoutRequest = exports.logoutRequest = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var apiError;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            apiError = "Api Error";
            _context3.prev = 1;

            alert("Logged out");
            return _context3.abrupt("return");

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](1);

            apiError = _context3.t0.message;
            // alert(e.message);

          case 9:
            throw new Error(apiError);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 6]]);
  }));

  return function logoutRequest() {
    return _ref3.apply(this, arguments);
  };
}();