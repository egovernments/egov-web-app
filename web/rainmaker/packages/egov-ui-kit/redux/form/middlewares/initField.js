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

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fieldInitFormMiddleware = function fieldInitFormMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var _action, type, dispatch, _action2, form, formKey, fields, formData, message;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _action = action, type = _action.type;
                dispatch = store.dispatch;
                // const state = store.getState();

                if (!(type === _actionTypes.INIT_FORM)) {
                  _context.next = 20;
                  break;
                }

                if (typeof (0, _get2.default)(action, "form.beforeInitForm") === "function") {
                  action = action.form.beforeInitForm(action, store, dispatch);
                }
                _action2 = action, form = _action2.form;
                formKey = form.name, fields = form.fields;
                formData = null;
                _context.prev = 7;

                Object.keys(fields).map(function (key) {
                  var item = fields[key];
                  if (item.dataFetchConfig && !item.dataFetchConfig.isDependent) {
                    switch (item.type) {
                      case "singleValueList":
                        (0, _commons.fetchDropdownData)(dispatch, item.dataFetchConfig, formKey, key);
                    }
                  }
                });
                _context.next = 16;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](7);
                message = _context.t0.message;

                dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));
                return _context.abrupt("return");

              case 16:
                next(action);
                if (typeof (0, _get2.default)(action, "form.afterInitForm") === "function") {
                  action = action.form.afterInitForm(action, store, dispatch);
                }
                _context.next = 21;
                break;

              case 20:
                next(action);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined, [[7, 11]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

exports.default = fieldInitFormMiddleware;