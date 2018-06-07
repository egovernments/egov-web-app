"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.sendOTP = exports.refreshTokenRequest = exports.searchUser = exports.sendOtpCompleted = exports.sendOtpStarted = exports.authenticationFailed = exports.authenticated = exports.authenticating = exports.searchUserError = exports.searchUserSuccess = exports.userProfileUpdateError = exports.userProfileUpdated = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var authType = _interopRequireWildcard(_actionTypes);

var _actions = require("egov-ui-kit/redux/app/actions");

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// temp fix
var fixUserDob = function fixUserDob() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var dob = user.dob;
  var transformeddob = null;
  if (dob && dob !== null) {
    var date = new Date(dob);
    transformeddob = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    user = (0, _extends3.default)({}, user, { dob: transformeddob });
  }
  return user;
};

var userProfileUpdated = exports.userProfileUpdated = function userProfileUpdated() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var user = fixUserDob(payload.user[0]);
  window.localStorage.setItem("user-info", JSON.stringify(user));
  return { type: authType.USER_PROFILE_UPDATED, user: user };
};

var userProfileUpdateError = exports.userProfileUpdateError = function userProfileUpdateError(error) {
  return { type: authType.USER_PROFILE_UPDATE_ERROR, error: error };
};

//user search success/failure
var searchUserSuccess = exports.searchUserSuccess = function searchUserSuccess() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  user = fixUserDob(user.user[0]);
  //temporary fix for dat of birth format issue in prfile update
  window.localStorage.setItem("user-info", JSON.stringify(user));
  return { type: authType.USER_SEARCH_SUCCESS, user: user };
};

var searchUserError = exports.searchUserError = function searchUserError(error) {
  return { type: authType.USER_SEARCH_ERROR, error: error };
};

var authenticating = exports.authenticating = function authenticating() {
  return { type: authType.AUTHENTICATING };
};

var authenticated = exports.authenticated = function authenticated() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var userInfo = fixUserDob(payload["UserRequest"]);
  var accessToken = payload.access_token;
  var refreshToken = payload.refresh_token;
  var expiresIn = payload.expires_in;
  var lastLoginTime = new Date().getTime();

  localStorage.setItem("user-info", JSON.stringify(userInfo));
  localStorage.setItem("token", accessToken);
  localStorage.setItem("refresh-token", refreshToken);
  localStorage.setItem("expires-in", expiresIn);
  localStorage.setItem("tenant-id", userInfo.tenantId);
  localStorage.setItem("last-login-time", lastLoginTime);

  return { type: authType.AUTHENTICATED, userInfo: userInfo, accessToken: accessToken };
};

var authenticationFailed = exports.authenticationFailed = function authenticationFailed() {
  return { type: authType.AUTHENTICATION_FAILED };
};

// sending otp
var sendOtpStarted = exports.sendOtpStarted = function sendOtpStarted() {
  return { type: authType.SEND_OTP_STARTED };
};

var sendOtpCompleted = exports.sendOtpCompleted = function sendOtpCompleted() {
  return { type: authType.SEND_OTP_COMPLETED };
};

var searchUser = exports.searchUser = function searchUser() {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var state, _ref2, userName, tenantId, user;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              state = getState();
              _ref2 = state.auth.userInfo || {}, userName = _ref2.userName, tenantId = _ref2.tenantId;
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.httpRequest)(_endPoints.USER.SEARCH.URL, _endPoints.USER.SEARCH.ACTION, [], { userName: userName, tenantId: tenantId });

            case 5:
              user = _context.sent;

              delete user.responseInfo;
              dispatch(searchUserSuccess(user));
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);

              dispatch(searchUserError(_context.t0.message));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 10]]);
    }));

    return function (_x5, _x6) {
      return _ref.apply(this, arguments);
    };
  }();
};

var refreshTokenRequest = exports.refreshTokenRequest = function refreshTokenRequest() {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var refreshToken, grantType, response;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              refreshToken = window.localStorage.getItem("refresh-token");
              grantType = "refresh_token";
              _context2.prev = 2;
              _context2.next = 5;
              return (0, _api.loginRequest)(null, null, refreshToken, grantType);

            case 5:
              response = _context2.sent;

              delete response.ResponseInfo;
              dispatch(authenticated(response));
              // only option for the time being!
              window.location.reload();
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](2);

              dispatch(logout());

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 11]]);
    }));

    return function (_x7) {
      return _ref3.apply(this, arguments);
    };
  }();
};

// in future if you want to keep a track the number of times otp is sent
var sendOTP = exports.sendOTP = function sendOTP(intent) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, getState) {
      var state, form, formData, formResponse;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              state = getState();
              form = state.form[intent];
              formData = (0, _commons.prepareFormData)(form);

              dispatch(sendOtpStarted());
              _context3.prev = 4;
              _context3.next = 7;
              return (0, _api.httpRequest)(_endPoints.OTP.RESEND.URL, _endPoints.OTP.RESEND.ACTION, [], formData);

            case 7:
              formResponse = _context3.sent;
              _context3.next = 12;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](4);

            case 12:
              dispatch(sendOtpCompleted());
              dispatch((0, _actions.toggleSnackbarAndSetText)(true, "OTP has been Resent"));

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[4, 10]]);
    }));

    return function (_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var logout = exports.logout = function logout() {
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch, getState) {
      var authToken, response, state, userRole;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              authToken = localStorage.getItem("token");
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.AUTH.LOGOUT.URL, _endPoints.AUTH.LOGOUT.ACTION, [{ key: "access_token", value: authToken }]);

            case 4:
              response = _context4.sent;
              _context4.next = 9;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);

            case 9:
              // whatever happens the client should clear the user details
              state = getState();
              userRole = state.auth.userInfo.roles[0].code.toLowerCase();

              Object.keys(localStorage).forEach(function (key) {
                if (!key.startsWith("localization")) {
                  localStorage.removeItem(key);
                }
              });
              window.location.replace(userRole === "citizen" ? window.basename + "/citizen/user/login" : window.basename + "/employee/user/login");

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 7]]);
    }));

    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }();
};