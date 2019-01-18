"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("../actionTypes");

var screenActionTypes = _interopRequireWildcard(_actionTypes);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var beforeInitScreen = function beforeInitScreen(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var _action, type, dispatch, state;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _action = action, type = _action.type;

                if (!(type === screenActionTypes.INIT_SCREEN)) {
                  _context.next = 15;
                  break;
                }

                dispatch = store.dispatch;
                state = store.getState();

                if (!(typeof (0, _get2.default)(action, "screenConfig.beforeInitScreen") === "function")) {
                  _context.next = 12;
                  break;
                }

                if (!action.screenConfig.hasBeforeInitAsync) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return action.screenConfig.beforeInitScreen(action, state, dispatch);

              case 8:
                action = _context.sent;
                _context.next = 12;
                break;

              case 11:
                action = action.screenConfig.beforeInitScreen(action, state, dispatch);

              case 12:
                next(action);
                _context.next = 16;
                break;

              case 15:
                next(action);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

exports.default = beforeInitScreen;