"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionTypes = require("../actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var beforeInitScreen = function beforeInitScreen(store) {
  return function (next) {
    return function (action) {
      var _action = action,
          type = _action.type;

      if (type === screenActionTypes.INIT_SCREEN) {
        var dispatch = store.dispatch;
        var state = store.getState();
        if (typeof (0, _get2.default)(action, "screenConfig.beforeInitScreen") === "function") {
          action = action.screenConfig.beforeInitScreen(action, store, dispatch);
        }
        next(action);
      } else {
        next(action);
      }
    };
  };
};

exports.default = beforeInitScreen;