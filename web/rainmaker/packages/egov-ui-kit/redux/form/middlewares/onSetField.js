"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("../actionTypes");

var _actions = require("egov-ui-kit/redux/app/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setFieldPropertyMiddleware = function setFieldPropertyMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var _action, type, dispatch, state, _action2, fieldKey, formKey, _get, updateOnSetField, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _action = action, type = _action.type;
                dispatch = store.dispatch;
                state = store.getState();

                if (!(type === _actionTypes.SET_FIELD_PROPERTY)) {
                  _context.next = 15;
                  break;
                }

                _action2 = action, fieldKey = _action2.fieldKey, formKey = _action2.formKey;
                _context.prev = 5;
                _get = (0, _get3.default)(state, "form." + formKey + ".fields." + fieldKey, {}), updateOnSetField = _get.updateOnSetField;

                if (updateOnSetField) {
                  action = updateOnSetField(store, action);
                }
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](5);
                message = _context.t0.message;

                dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));
                return _context.abrupt("return");

              case 15:
                next(action);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[5, 10]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

exports.default = setFieldPropertyMiddleware;