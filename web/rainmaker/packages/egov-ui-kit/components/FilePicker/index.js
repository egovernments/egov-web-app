"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pass the index
var FilePicker = function (_Component) {
  (0, _inherits3.default)(FilePicker, _Component);

  function FilePicker() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FilePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).call.apply(_ref, [this].concat(args))), _this), _this.handleFileChange = function (event) {
      var input = event.target;
      var maxFiles = _this.props.inputProps.maxFiles;


      if (input.files && input.files.length > 0) {
        var files = input.files;
        Object.keys(files).slice(0, maxFiles).forEach(function () {
          var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key, index) {
            var file, imageUri;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    file = files[key];

                    if (!file.type.match(/^image\//)) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 4;
                    return (0, _utils.getImageUrlByFile)(file);

                  case 4:
                    imageUri = _context.sent;

                    _this.props.handleimage(file, imageUri);

                  case 6:
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FilePicker, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          inputProps = _props.inputProps,
          children = _props.children,
          id = _props.id;
      var multiple = inputProps.multiple,
          accept = inputProps.accept;
      var handleFileChange = this.handleFileChange,
          openFileDialog = this.openFileDialog;

      return _react2.default.createElement(
        "div",
        { onClick: openFileDialog },
        _react2.default.createElement("input", {
          id: id,
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