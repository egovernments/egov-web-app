"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("../actionTypes");

var authActionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("../../app/actions");

var _uiUtils = require("../../../ui-utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logout = function logout(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var type, dispatch;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = action.type;

                if (!(type === authActionTypes.LOGOUT)) {
                  _context.next = 15;
                  break;
                }

                dispatch = store.dispatch;
                _context.prev = 3;
                _context.next = 6;
                return (0, _uiUtils.logoutRequest)();

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](3);

                console.log(_context.t0);

              case 11:
                next(action);
                dispatch((0, _actions.setRoute)("/mihy-ui-framework/core/login"));
                _context.next = 16;
                break;

              case 15:
                next(action);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[3, 8]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

exports.default = logout;