"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.authenticationFailed = exports.authenticated = exports.authenticating = undefined;

var _actionTypes = require("./actionTypes");

var authType = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var authenticating = exports.authenticating = function authenticating() {
  return { type: authType.AUTHENTICATING };
};

var authenticated = exports.authenticated = function authenticated() {
  var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  //its depends on where your storing token
  var token = localStorage.getItem("CognitoIdentityServiceProvider.34l3gjbtidmeo10omi969ftoi5.07f4204e-c40e-438a-964e-a0442048e626.accessToken");
  return { type: authType.AUTHENTICATED, token: token };
};

var authenticationFailed = exports.authenticationFailed = function authenticationFailed() {
  return { type: authType.AUTHENTICATION_FAILED };
};

var logout = exports.logout = function logout() {
  return { type: authType.LOGOUT };
};