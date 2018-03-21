"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilePicker = function (_Component) {
  _inherits(FilePicker, _Component);

  function FilePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilePicker.__proto__ || Object.getPrototypeOf(FilePicker)).call.apply(_ref, [this].concat(args))), _this), _this.handleFileChange = function (event) {
      var input = event.target;
      if (input.files && input.files.length > 0) {
        var files = input.files;
        Object.keys(files).forEach(function (key, index) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var fileurl = e.target.result;
            _this.props.handleimage(files[key], fileurl);
          };

          reader.readAsDataURL(files[key]);
        });
      }
    }, _this.openFileDialog = function () {
      _this.upload.click();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          inputProps = _props.inputProps,
          children = _props.children;
      var handleFileChange = this.handleFileChange,
          openFileDialog = this.openFileDialog;

      return _react2.default.createElement(
        "div",
        { onClick: openFileDialog },
        _react2.default.createElement("input", _extends({ type: "file" }, inputProps, { ref: function ref(_ref2) {
            return _this2.upload = _ref2;
          }, style: { display: "none" }, onChange: handleFileChange })),
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