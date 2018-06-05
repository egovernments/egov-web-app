"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("../actionTypes");

var _actions = require("redux/app/actions");

var _transformers = require("config/forms/transformers");

var _transformers2 = _interopRequireDefault(_transformers);

var _actions2 = require("redux/form/actions");

var _api = require("egov-ui-kit/utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fieldInitFormMiddleware = function fieldInitFormMiddleware(store) {
  return function (next) {
    return function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action) {
        var type, dispatch, state, form, formKey, fields, formData, message;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                type = action.type;
                dispatch = store.dispatch;
                state = store.getState();

                if (!(type === _actionTypes.INIT_FORM)) {
                  _context.next = 16;
                  break;
                }

                form = action.form;
                formKey = form.name, fields = form.fields;
                formData = null;
                _context.prev = 7;

                Object.keys(fields).map(function (key) {
                  var item = fields[key];
                  if (item.dataFetchConfig) {
                    switch (item.type) {
                      case "singleValueList":
                        var dropDownData = fetchDropdownData(dispatch, item.dataFetchConfig, formKey, key);
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

              case 17:
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

var fetchDropdownData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, dataFetchConfig, formKey, fieldKey) {
    var url, action, requestBody, payloadSpec, dropdownData, ddData, message;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = dataFetchConfig.url, action = dataFetchConfig.action, requestBody = dataFetchConfig.requestBody;
            _context2.prev = 1;
            _context2.next = 4;
            return (0, _api.httpRequest)(url, action, [], requestBody);

          case 4:
            payloadSpec = _context2.sent;
            dropdownData = (0, _get2.default)(payloadSpec, dataFetchConfig.dataPath);
            ddData = dropdownData.reduce(function (ddData, item) {
              ddData.push({ label: item.name, value: item.code });
              return ddData;
            }, []);

            dispatch((0, _actions2.setFieldProperty)(formKey, fieldKey, "dropDownData", ddData));
            _context2.next = 15;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](1);
            message = _context2.t0.message;

            dispatch((0, _actions.toggleSnackbarAndSetText)(true, message, true));
            return _context2.abrupt("return");

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 10]]);
  }));

  return function fetchDropdownData(_x2, _x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = fieldInitFormMiddleware;