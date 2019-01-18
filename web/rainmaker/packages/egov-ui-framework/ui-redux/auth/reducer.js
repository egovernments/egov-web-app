"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var token = localStorage.getItem("CognitoIdentityServiceProvider.34l3gjbtidmeo10omi969ftoi5.07f4204e-c40e-438a-964e-a0442048e626.accessToken");

var intialState = {
  authenticated: false,
  authenticationFailed: false,
  token: token
};

var auth = function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];
  var type = action.type;


  switch (type) {
    case actionTypes.AUTHENTICATING:
      return (0, _extends3.default)({}, state, { authenticated: false, authenticationFailed: true });
    case actionTypes.AUTHENTICATED:
      return (0, _extends3.default)({}, state, {
        authenticated: true,
        authenticationFailed: false,
        token: action.accessToken
      });
    case actionTypes.AUTHENTICATION_FAILED:
      return (0, _extends3.default)({}, state, { authenticated: false, authenticationFailed: true });
    case actionTypes.LOGOUT:
      return (0, _extends3.default)({}, state, {
        authenticated: false,
        authenticationFailed: false,
        token: ""
      });
    default:
      return state;
  }
};

exports.default = auth;