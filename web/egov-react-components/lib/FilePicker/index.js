"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _commons = require("utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// pass the index
var FilePicker = function (_Component) {
  _inherits(FilePicker, _Component);

  function FilePicker() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, FilePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).call.apply(_ref, [this].concat(args))), _this), _this.handleFileChange = function (event) {
      var input = event.target;
      var maxFiles = _this.props.inputProps.maxFiles;


      if (input.files && input.files.length > 0) {
        var files = input.files;
        Object.keys(files).slice(0, maxFiles).forEach(function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, index) {
            var file, imageUri;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    file = files[key];
                    _context.next = 3;
                    return (0, _commons.getImageUrlByFile)(file);

                  case 3:
                    imageUri = _context.sent;

                    _this.props.handleimage(file, imageUri);

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    }, _this.openFileDialog = function () {
      _this.upload.click();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilePicker, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          inputProps = _props.inputProps,
          children = _props.children;
      var multiple = inputProps.multiple,
          accept = inputProps.accept;
      var handleFileChange = this.handleFileChange,
          openFileDialog = this.openFileDialog;

      return _react2.default.createElement(
        "div",
        { onClick: openFileDialog },
        _react2.default.createElement("input", {
          type: "file",
          multiple: multiple,
          accept: accept,
          ref: function ref(_ref3) {
            return _this3.upload = _ref3;
          },
          style: { display: "none" },
          onChange: handleFileChange
        }),
        children
      );
    }
  }]);

  return FilePicker;
}(_react.Component);

FilePicker.propTypes = {
  "inputProps.accept": _propTypes2.default.string,
  "inputProps.id": _propTypes2.default.string,
  "inputProps.multiple": _propTypes2.default.bool,
  "labelProps.icon": _propTypes2.default.node
};

exports.default = FilePicker;