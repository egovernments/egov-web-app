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

var afterInitScreen = function afterInitScreen(store) {
  return function (next) {
    return function (action) {
      var _action = action,
          type = _action.type;

      if (type === screenActionTypes.INIT_SCREEN) {
        next(action);
        var dispatch = store.dispatch;
        var state = store.getState();
        if (typeof (0, _get2.default)(action, "screenConfig.afterInitScreen") === "function") {
          action = action.screenConfig.afterInitScreen(action, state, dispatch);
        }
      } else {
        next(action);
      }
    };
  };
};

exports.default = afterInitScreen;