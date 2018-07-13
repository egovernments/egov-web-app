"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _utils = require("./utils");

var _fs = require("fs");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale = window.localStorage.getItem("locale") || "en_IN";
var localizationLabels = (0, _utils.initLocalizationLabels)(locale);

var initialState = {
  name: "Mseva",
  showMenu: false,
  showActionMenu: true,
  showDailog: false,
  route: "",
  locale: locale,
  urls: [],
  bottomNavigationIndex: 0,
  previousRoute: "",
  toast: {
    message: "",
    open: false,
    error: true
  },
  localizationLabels: localizationLabels
};

var appReducer = function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.ADD_LOCALIZATION:
      return (0, _extends3.default)({}, state, {
        locale: action.locale,
        localizationLabels: action.localizationLabels
      });
    case actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX:
      return (0, _extends3.default)({}, state, {
        bottomNavigationIndex: action.bottomNavigationIndex
      });
    case actionTypes.SET_ROUTE:
      return (0, _extends3.default)({}, state, { previousRoute: action.route ? window.location.pathname : state.previousRoute, route: action.route });
    case actionTypes.SHOW_TOAST:
      return (0, _extends3.default)({}, state, {
        toast: {
          message: action.message,
          open: action.open,
          error: action.error
        }
      });
    case actionTypes.SET_USER_CURRENT_LOCATION:
      return (0, _extends3.default)({}, state, { currentLocation: action.currentLocation });

    case actionTypes.ADD_BREADCRUM_ITEM:
      var url = window.location.pathname && window.location.pathname.split("/").pop() === "property-tax" ? [] : state.urls && state.urls.indexOf(action.url) > -1 ? state.urls.splice(state.urls.indexOf(action.url), 1) : [].concat((0, _toConsumableArray3.default)(state.urls), [action.url]);

      return (0, _extends3.default)({}, state, { urls: url });

    case actionTypes.REMOVE_BREADCRUM_ITEM:
      if (action.mode == "single") {
        var urls = state.urls;

        return (0, _extends3.default)({}, state, {
          urls: urls.filter(function (item) {
            return item !== action.url;
          })
        });
      } else {
        var _urls = [];
        return (0, _extends3.default)({}, state, {
          urls: _urls
        });
      }

    default:
      return state;
  }
};
exports.default = appReducer;