"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("../actionTypes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateFormMiddleware = function updateFormMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var type, state;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = action.type;
                state = store.getState();

                if (!(type === _actionTypes.UPDATE_FORM)) {
                  _context.next = 7;
                  break;
                }

                next(action);
                console.log(state);
                if (window.appOverrides) {
                  window.appOverrides.updateForms(state.common.prepareFormData);
                }
                return _context.abrupt("return");

              case 7:

                next(action);

              case 8:
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

exports.default = updateFormMiddleware;