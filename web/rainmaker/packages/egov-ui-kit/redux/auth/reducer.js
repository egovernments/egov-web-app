"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userInfo = (0, _commons.getUserInfo)();
var authenticated = userInfo ? true : false;
var tenantId = localStorage.getItem("tenant-id");
var token = localStorage.getItem("token");

var intialState = {
  authenticating: false,
  authenticated: authenticated,
  authenticationFailed: !authenticated,
  userInfo: userInfo,
  token: token,
  tenantId: tenantId
};

var auth = function auth() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];
  var type = action.type;


  switch (type) {
    case actionTypes.USER_SEARCH_SUCCESS:
      return (0, _extends3.default)({}, state, { userInfo: action.user });
    case actionTypes.AUTHENTICATING:
      return (0, _extends3.default)({}, state, { authenticated: false, authenticationFailed: true, authenticating: true });
    case actionTypes.AUTHENTICATED:
      return (0, _extends3.default)({}, state, {
        authenticated: true,
        authenticationFailed: false,
        authenticating: false,
        userInfo: action.userInfo,
        token: action.accessToken
      });
    case actionTypes.AUTHENTICATION_FAILED:
      return (0, _extends3.default)({}, state, { authenticated: false, authenticationFailed: true, authenticating: false });
    case actionTypes.USER_PROFILE_UPDATED:
      return (0, _extends3.default)({}, state, { userInfo: action.user });
    case actionTypes.LOGOUT:
      return (0, _extends3.default)({}, state, {
        authenticated: false,
        authenticationFailed: false,
        authenticating: false,
        userInfo: {},
        token: ""
      });
    case actionTypes.SEND_OTP_STARTED:
      return (0, _extends3.default)({}, state, { authenticating: true });
    case actionTypes.SEND_OTP_COMPLETED:
      return (0, _extends3.default)({}, state, { authenticating: false });
    default:
      return state;
  }
};

exports.default = auth;