"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRequest = exports.uploadFile = exports.httpRequest = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _commons = require("./commons");

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

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
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
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
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endPoint, action) {
    var queryObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

    var tenantId, apiError, response, responseStatus, _error$response, data, status;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons.fetchFromLocalStorage)("tenant-id") || _common2.default.tenantId;
            apiError = "Api Error";


            if (headers) instance.defaults = Object.assign(instance.defaults, {
              headers: headers
            });

            if (!(0, _some2.default)(queryObject, ["key", "tenantId"])) {
              queryObject.push({
                key: "tenantId",
                value: tenantId
              });
            }

            endPoint = (0, _commons.addQueryArg)(endPoint, queryObject);
            _context.prev = 5;
            _context.next = 8;
            return instance.post(endPoint, wrapRequestBody(requestBody, action));

          case 8:
            response = _context.sent;
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", response.data);

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);
            _error$response = _context.t0.response, data = _error$response.data, status = _error$response.status;

            if (status == 400 && data == "") {
              apiError = "INVALID_TOKEN";
            } else {
              apiError = data.hasOwnProperty("Errors") && data.Errors && data.Errors.length && data.Errors[0].message || data.hasOwnProperty("error") && data.error.fields && data.error.fields.length && data.error.fields[0].message || data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 18:
            throw new Error(apiError);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 14]]);
  }));

  return function httpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var uploadFile = exports.uploadFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endPoint, module, file) {
    var tenantId, uploadInstance, requestParams, requestBody, response, responseStatus, fileStoreIds, responseData, files;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = (0, _commons.fetchFromLocalStorage)("tenant-id");
            uploadInstance = _axios2.default.create({
              baseURL: window.location.origin,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            requestParams = {
              tenantId: tenantId,
              module: module,
              file: file
            };
            requestBody = (0, _commons.prepareForm)(requestParams);
            _context2.prev = 4;
            _context2.next = 7;
            return uploadInstance.post(endPoint, requestBody);

          case 7:
            response = _context2.sent;
            responseStatus = parseInt(response.status, 10);
            fileStoreIds = [];

            if (!(responseStatus === 201)) {
              _context2.next = 15;
              break;
            }

            responseData = response.data;
            files = responseData.files || [];

            fileStoreIds = files.map(function (f) {
              return f.fileStoreId;
            });
            return _context2.abrupt("return", fileStoreIds[0]);

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](4);
            throw new Error(_context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[4, 17]]);
  }));

  return function uploadFile(_x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var loginRequest = exports.loginRequest = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var refreshToken = arguments[2];
    var grantType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "password";

    var tenantId, loginInstance, apiError, params, response, responseStatus, _error$response2, data, status;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tenantId = (0, _commons.fetchFromLocalStorage)("tenant-id") || _common2.default.tenantId;
            loginInstance = _axios2.default.create({
              baseURL: window.location.origin,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic ZWdvdi11c2VyLWNsaWVudDplZ292LXVzZXItc2VjcmV0"
              }
            });
            apiError = "Api Error";
            params = new URLSearchParams();

            username && params.append("username", username);
            password && params.append("password", password);
            refreshToken && params.append("refresh_token", refreshToken);
            params.append("grant_type", grantType);
            params.append("scope", "read");
            params.append("tenantId", tenantId);

            _context3.prev = 10;
            _context3.next = 13;
            return loginInstance.post("/user/oauth/token", params);

          case 13:
            response = _context3.sent;
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context3.next = 17;
              break;
            }

            return _context3.abrupt("return", response.data);

          case 17:
            _context3.next = 23;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](10);
            _error$response2 = _context3.t0.response, data = _error$response2.data, status = _error$response2.status;

            if (status === 400) {
              apiError = data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 23:
            throw new Error(apiError);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[10, 19]]);
  }));

  return function loginRequest() {
    return _ref3.apply(this, arguments);
  };
}();