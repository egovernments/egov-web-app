"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var transformType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "viewModelToBusinessModelTransformer";
    var formKey = arguments[1];
    var form = arguments[2];
    var state = arguments[3];
    var recordData = arguments[4];
    var transformer, formData;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transformer = require("./" + transformType).default;
            _context.prev = 1;

            if (/mdms/gi.test(formKey)) {
              formKey = "mdms";
            }
            formData = transformer(formKey, form, state, recordData);

            if (!(formData && typeof formData.then === "function")) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return formData;

          case 7:
            _context.t0 = _context.sent;
            _context.next = 11;
            break;

          case 10:
            _context.t0 = formData;

          case 11:
            return _context.abrupt("return", _context.t0);

          case 14:
            _context.prev = 14;
            _context.t1 = _context["catch"](1);
            throw new Error(_context.t1.message);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 14]]);
  }));

  return function transform() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = transform;