"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCurrentLocation = exports.fetchLocalizationLabel = exports.toggleSnackbarAndSetText = exports.setBottomNavigationIndex = exports.setRoute = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _common = require("config/common");

var _common2 = _interopRequireDefault(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setRoute = exports.setRoute = function setRoute(route) {
  return { type: actionTypes.SET_ROUTE, route: route };
};

var setBottomNavigationIndex = exports.setBottomNavigationIndex = function setBottomNavigationIndex(bottomNavigationIndex) {
  return { type: actionTypes.CHANGE_BOTTOM_NAVIGATION_INDEX, bottomNavigationIndex: bottomNavigationIndex };
};

var setLocalizationLabels = function setLocalizationLabels(locale, localizationLabels) {
  window.localStorage.setItem("localization_" + locale, JSON.stringify(localizationLabels));
  window.localStorage.setItem("locale", locale);
  return { type: actionTypes.ADD_LOCALIZATION, locale: locale, localizationLabels: localizationLabels };
};

var toggleSnackbarAndSetText = exports.toggleSnackbarAndSetText = function toggleSnackbarAndSetText(open, message, error) {
  return {
    type: actionTypes.SHOW_TOAST,
    open: open,
    message: message,
    error: error
  };
};

var fetchLocalizationLabel = exports.fetchLocalizationLabel = function fetchLocalizationLabel(locale) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _api.httpRequest)(_endPoints.LOCALATION.GET.URL, _endPoints.LOCALATION.GET.ACTION, [{ key: "module", value: "rainmaker-pgr" }, { key: "locale", value: locale }, { key: "tenantId", value: _common2.default.tenantId }]);

            case 3:
              payload = _context.sent;

              //}
              dispatch(setLocalizationLabels(locale, payload.messages));
              _context.next = 9;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);

            case 9:
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

var setCurrentLocation = function setCurrentLocation(currentLocation) {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation: currentLocation
  };
};

var fetchCurrentLocation = exports.fetchCurrentLocation = function fetchCurrentLocation() {
  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var currAddress;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _commons.getCurrentAddress)();

            case 2:
              currAddress = _context2.sent;

              dispatch(setCurrentLocation(currAddress));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};