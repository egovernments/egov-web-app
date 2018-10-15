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

var initialState = {
  name: "MIHY",
  route: "",
  previousRoute: "",
  toast: {
    message: "",
    open: false,
    error: true
  },
  spinner: false
};

var appReducer = function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.SET_ROUTE:
      return (0, _extends3.default)({}, state, {
        previousRoute: action.route ? window.location.pathname : state.previousRoute,
        route: action.route
      });
    case actionTypes.SHOW_TOAST:
      return (0, _extends3.default)({}, state, {
        toast: {
          message: action.message,
          open: action.open,
          error: action.error
        }
      });
    case actionTypes.TOGGLE_SPINNER:
      return (0, _extends3.default)({}, state, {
        spinner: !state.spinner
      });
    default:
      return state;
  }
};
exports.default = appReducer;