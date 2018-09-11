"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonApiPost = exports.loginRequest = exports.uploadFile = exports.httpRequest = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _commons = require("./commons");

var _some = require("lodash/some");

var _some2 = _interopRequireDefault(_some);

var _common = require("egov-ui-kit/config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response && error.response.data && error.response.data.location) {
    window.location = error.response.data.location;
  } else {
    return Promise.reject(error);
  }
});

var instance = _axios2.default.create({
  baseURL: window.location.origin,
  headers: {
    "Content-Type": "application/json"
  }
});

var wrapRequestBody = function wrapRequestBody(requestBody, action, customRequestInfo) {
  var authToken = (0, _commons.fetchFromLocalStorage)("token");

  var RequestInfo = {
    apiId: "Rainmaker",
    ver: ".01",
    ts: "",
    action: action,
    did: "1",
    key: "",
    msgId: "20170310130900|en_IN",
    // requesterId: "",
    authToken: authToken
  };
  RequestInfo = (0, _extends3.default)({}, RequestInfo, customRequestInfo);
  return Object.assign({}, {
    RequestInfo: RequestInfo
  }, requestBody);
};

var httpRequest = exports.httpRequest = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endPoint, action) {
    var queryObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var requestBody = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var headers = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
    var customRequestInfo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    var ignoreTenantId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

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

            if (!(0, _some2.default)(queryObject, ["key", "tenantId"]) && !ignoreTenantId) {
              queryObject && queryObject.push({
                key: "tenantId",
                value: tenantId
              });
            }

            endPoint = (0, _commons.addQueryArg)(endPoint, queryObject);
            _context.prev = 5;
            _context.next = 8;
            return instance.post(endPoint, wrapRequestBody(requestBody, action, customRequestInfo));

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
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(endPoint, module, file, ulbLevel) {
    var tenantId, uploadInstance, requestParams, requestBody, response, responseStatus, fileStoreIds, responseData, files;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Bad idea to fetch from local storage, change as feasible
            tenantId = (0, _commons.fetchFromLocalStorage)("tenant-id") ? ulbLevel ? (0, _commons.fetchFromLocalStorage)("tenant-id") : (0, _commons.fetchFromLocalStorage)("tenant-id").split(".")[0] : "";
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

  return function uploadFile(_x8, _x9, _x10, _x11) {
    return _ref2.apply(this, arguments);
  };
}();

var loginRequest = exports.loginRequest = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var username = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var refreshToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var grantType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "password";
    var tenantId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var userType = arguments[5];

    var loginInstance, apiError, params, response, responseStatus, _error$response2, data, status;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            tenantId = tenantId ? tenantId : _common2.default.tenantId;
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
            userType && params.append("userType", userType);

            _context3.prev = 11;
            _context3.next = 14;
            return loginInstance.post("/user/oauth/token", params);

          case 14:
            response = _context3.sent;
            responseStatus = parseInt(response.status, 10);

            if (!(responseStatus === 200 || responseStatus === 201)) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", response.data);

          case 18:
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](11);
            _error$response2 = _context3.t0.response, data = _error$response2.data, status = _error$response2.status;

            if (status === 400) {
              apiError = data.hasOwnProperty("error_description") && data.error_description || apiError;
            }

          case 24:
            throw new Error(apiError);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[11, 20]]);
  }));

  return function loginRequest() {
    return _ref3.apply(this, arguments);
  };
}();
var commonApiPost = exports.commonApiPost = function commonApiPost(context) {
  var queryObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var doNotOverride = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isTimeLong = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var noPageSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var authToken = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
  var userInfo = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
  var isStateLevel = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var offset = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

  // const RequestInfo = {
  //   apiId: "Rainmaker",
  //   ver: ".01",
  //   ts: "",
  //   did: "1",
  //   key: "",
  //   msgId: "20170310130900|en_IN",
  //   requesterId: "",
  //   authToken,
  // };
  var RequestInfo = {
    apiId: "emp",
    ver: "1.0",
    ts: "",
    action: "create",
    did: "1",
    key: "abcdkey",
    msgId: "20170310130900",
    requesterId: "",
    authToken: authToken
  };
  var url = context;
  if (url && url[url.length - 1] === "/") url = url.substring(0, url.length - 1);
  if (!doNotOverride) {
    if (url.split("?").length > 1) {
      url += "&tenantId=" + (localStorage.getItem("tenant-id") ? isStateLevel ? localStorage.getItem("tenant-id").split(".")[0] : localStorage.getItem("tenant-id") : "default");
    } else {
      url += "?tenantId=" + (localStorage.getItem("tenant-id") ? isStateLevel ? localStorage.getItem("tenant-id").split(".")[0] : localStorage.getItem("tenant-id") : "default");
    }
  } else {
    url += "?";
  }
  for (var variable in queryObject) {
    if (typeof queryObject[variable] !== "undefined") {
      url += "&" + variable + "=" + queryObject[variable];
    }
  }

  if (/_search/.test(context) && !noPageSize) {
    url += "&pageSize=200";
  } else {
    url += "&pageSize=" + noPageSize;
  }

  url += "&offset=" + offset;

  RequestInfo.authToken = localStorage.getItem("token");
  if (isTimeLong) {
    RequestInfo.ts = new Date().getTime();
  }

  if (authToken) {
    RequestInfo["authToken"] = authToken;
  }

  body["RequestInfo"] = RequestInfo;

  if (userInfo) {
    body["RequestInfo"]["userInfo"] = userInfo;
  }

  return instance.post(url, body).then(function (response) {
    return response.data;
  }).catch(function (response) {
    try {
      if (response && response.response && response.response.data && response.response.data[0] && response.response.data[0].error) {
        var _err = response.response.data[0].error.message || "";
        if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
          for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
            _err += "\n " + response.response.data[0].error.errorFields[i].message + " ";
          }
          throw new Error(_err);
        }
      } else if (response && response.response && response.response.data && response.response.data.error) {
        // let _err = common.translate(response.response.data.error.fields[0].code);
        var _err2 = "";

        _err2 = response.response.data.error.message ? response.response.data.error.fields ? "a) " + extractErrorMsg(response.response.data.error, "message", "description") + " : " : extractErrorMsg(response.response.data.error, "message", "description") : "";
        var fields = response.response.data.error.fields || [];
        for (var i = 0; i < fields.length; i++) {
          _err2 += i + 1 + ") " + extractErrorMsg(fields[i], "code", "message") + ".";
        }
        throw new Error(_err2);
      } else if (response && response.response && response.response.data && response.response.data.Errors) {
        // let _err = common.translate(response.response.data.error.fields[0].code);
        var _err3 = "";
        // _err=response.response.data.error.message?"a) "+extractErrorMsg(response.response.data.error, "message", "description")+" : ":"";
        // let fields=response.response.data.error.fields;
        if (response.response.data.Errors.length == 1) {
          _err3 += common.translate(response.response.data.Errors[0].message) + ".";
        } else {
          for (var i = 0; i < response.response.data.Errors.length; i++) {
            _err3 += i + 1 + ") " + common.translate(response.response.data.Errors[i].message) + ".";
          }
        }

        throw new Error(_err3);
      } else if (response && response.response && response.response.data && response.response.data.hasOwnProperty("Data")) {
        var _err4 = common.translate(response.response.data.Message) + ".";
        throw new Error(_err4);
      } else if (response && response.response && !response.response.data && response.response.status === 400) {
        if (counter == 0) {
          document.title = "eGovernments";
          var locale = localStorage.getItem("locale");
          var _tntId = localStorage.getItem("tenant-id") || "default";
          var lang_response = localStorage.getItem("lang_response");
          localStorage.clear();
          localStorage.setItem("locale", locale);
          localStorage.setItem("tenant-id", _tntId);
          localStorage.setItem("lang_response", lang_response);
          alert("Session expired. Please login again.");
          //localStorage.reload = true;
          throw new Error("");
        }
      } else if (response) {
        throw new Error("Oops! Something isn't right. Please try again later.");
      } else {
        throw new Error("Server returned unexpected error. Please contact system administrator.");
      }
    } catch (e) {
      if (e.message) {
        throw new Error(e.message);
      } else throw new Error("Oops! Something isn't right. Please try again later.");
    }
  });
};