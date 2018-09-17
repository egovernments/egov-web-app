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

var _actions2 = require("egov-ui-kit/redux/common/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeFormMiddleware = function removeFormMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var type, formKey, dispatch, state, form, unitForm, fields, jsonPath, unitIndex, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = action.type, formKey = action.formKey;
                dispatch = store.dispatch;
                state = store.getState();
                form = state.form;

                if (!(type === _actionTypes.REMOVE_FORM)) {
                  _context.next = 15;
                  break;
                }

                _context.prev = 5;

                //To remove unit from prepareFormData
                if (formKey.startsWith("floorDetails_")) {
                  unitForm = form[formKey] || {};
                  fields = unitForm && unitForm.fields;
                  jsonPath = Object.values(fields)[0].jsonPath;
                  unitIndex = jsonPath.split("units[")[1].split("].")[0];

                  dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[" + unitIndex + "]", null));
                }

                if (window.appOverrides) {
                  window.appOverrides.resetForm(formKey);
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

exports.default = removeFormMiddleware;