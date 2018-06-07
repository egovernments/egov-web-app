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

var _transformers = require("config/forms/transformers");

var _transformers2 = _interopRequireDefault(_transformers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initFormMiddleware = function initFormMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var type, dispatch, state, form, recordData, formKey, formData, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = action.type;
                dispatch = store.dispatch;
                state = store.getState();

                if (!(type === _actionTypes.INIT_FORM)) {
                  _context.next = 19;
                  break;
                }

                form = action.form, recordData = action.recordData;
                formKey = form.name;
                formData = null;
                _context.prev = 7;
                _context.next = 10;
                return (0, _transformers2.default)("businessModelToViewModelTransformer", formKey, form, state, recordData);

              case 10:
                formData = _context.sent;

                action.form = formData;
                _context.next = 19;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](7);
                message = _context.t0.message;

                dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));
                return _context.abrupt("return");

              case 19:

                next(action);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[7, 14]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

exports.default = initFormMiddleware;