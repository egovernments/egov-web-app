"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchExternalUrls = exports.setExternalUrls = exports.fetchActionItems = exports.fetchCurrentLocation = exports.addBreadCrumbs = exports.fetchLocalizationLabel = exports.toggleSnackbarAndSetText = exports.setBottomNavigationIndex = exports.setRoute = undefined;

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

var _util = require("util");

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
              return (0, _api.httpRequest)(_endPoints.LOCALATION.GET.URL, _endPoints.LOCALATION.GET.ACTION, [{ key: "module", value: "rainmaker-pgr,rainmaker-pt,rainmaker-tl,finance-erp" }, { key: "locale", value: locale }, { key: "tenantId", value: _common2.default.tenantId }]);

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
var setActionItems = function setActionItems(payload) {
  return {
    type: actionTypes.FETCH_ACTIONMENU,
    payload: payload
  };
};
var setCurrentLocation = function setCurrentLocation(currentLocation) {
  return {
    type: actionTypes.SET_USER_CURRENT_LOCATION,
    currentLocation: currentLocation
  };
};

var addBreadCrumbs = exports.addBreadCrumbs = function addBreadCrumbs(url) {
  return { type: actionTypes.ADD_BREADCRUMB_ITEM, url: url };
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
var fetchActionItems = exports.fetchActionItems = function fetchActionItems(role, ts) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, getState) {
      var payload;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _api.httpRequest)(_endPoints.ACTIONMENU.GET.URL, _endPoints.ACTIONMENU.GET.ACTION, [], role, [], ts);

            case 3:
              payload = _context3.sent;


              dispatch(setActionItems(payload.actions));
              _context3.next = 9;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var setExternalUrls = exports.setExternalUrls = function setExternalUrls(payload) {
  return {
    type: actionTypes.FETCH_EXTERNAL_URLS,
    payload: payload
  };
};
var fetchExternalUrls = exports.fetchExternalUrls = function fetchExternalUrls() {
  _util.debug;
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch) {
      var requestBody, payload, MdmsRes, commonMasters, UiCommonConfig;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: "pb",
                  moduleDetails: [{
                    moduleName: "common-masters",
                    masterDetails: [{
                      name: "Ui-Common-Config"
                    }]
                  }]
                }
              };
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context4.sent;
              MdmsRes = payload.MdmsRes;
              commonMasters = MdmsRes["common-masters"];
              UiCommonConfig = commonMasters["Ui-Common-Config"];
              // const payload = {
              //   tradelicense: {
              //     routes: {
              //       search: {
              //         routePath: "/employee-tradelicence/mihy-ui-framework/tradelicence/search",
              //         isOrigin: false,
              //         domain: "https://egov-micro-dev.egovernments.org",
              //       },
              //     },
              //   },
              //   ws: {
              //     routes: {
              //       dashboard: {
              //         routePath: "",
              //         isOrigin: false,
              //         domain: "https://dashboard-pbuat.egovernments.org/app/kibana#/dashboards?title=W%20%26%20S%20Consumers%20Dashboard&embed=true",
              //       },
              //     },
              //   },
              // };

              dispatch(setExternalUrls(UiCommonConfig[0]));
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](1);

              console.log(_context4.t0);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 11]]);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
};