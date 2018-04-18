"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _FilePicker = require("../FilePicker");

var _FilePicker2 = _interopRequireDefault(_FilePicker);

var _Label = require("../Label");

var _Label2 = _interopRequireDefault(_Label);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iconStyle = {
  background: "#00bbd3",
  marginLeft: "15px",
  color: "rgb(255, 255, 255)",
  borderRadius: "50%",
  padding: "12px",
  height: 48,
  width: 48
};
var inputProps = {
  accept: "image/*",
  multiple: false //for selecting single or multiple files
};
var galleryIconBtn = _react2.default.createElement(_Icon2.default, {
  className: "gallery-upload-drawer",
  id: "uploadDrawerGallaryIcon",
  style: iconStyle,
  action: "image",
  name: "image",
  onClick: undefined.onGalleryClick
});

var UploadDrawer = function (_Component) {
  _inherits(UploadDrawer, _Component);

  function UploadDrawer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, UploadDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadDrawer.__proto__ || Object.getPrototypeOf(UploadDrawer)).call.apply(_ref, [this].concat(args))), _this), _this.onRemoveClick = function () {
      _this.props.removeFile();
      _this.props.closeDrawer(false);
    }, _this.picUpload = function (file, url) {
      _this.props.uploadfile(file, url);
      _this.props.closeDrawer(false);
    }, _this.onOverlayBodyClick = function () {
      _this.props.closeDrawer(false);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(UploadDrawer, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement("div", { className: "overlayBody", onClick: this.onOverlayBodyClick }),
        _react2.default.createElement(
          "div",
          { className: "drawerContainer" },
          _react2.default.createElement(
            "div",
            { className: "iconContainer col-xs-12" },
            this.props.galleryIcon && _react2.default.createElement(
              "div",
              { className: "labelIconBox col-xs-6 text-center" },
              _react2.default.createElement(
                _FilePicker2.default,
                { inputProps: inputProps, handleimage: this.picUpload },
                galleryIconBtn
              ),
              _react2.default.createElement(_Label2.default, { className: "galleryUploadlabel", label: "Gallery", color: "#484848", labelStyle: this.props.labelStyle })
            ),
            this.props.removeIcon && _react2.default.createElement(
              "div",
              { className: "labelIconBox col-xs-6 text-center" },
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_Icon2.default, {
                  className: "remove-upload-drawer",
                  id: "uploadDrawerRemoveIcon",
                  style: iconStyle,
                  action: "action",
                  name: "delete",
                  onClick: this.onRemoveClick
                })
              ),
              _react2.default.createElement(_Label2.default, { className: "removeUploadlabel", label: "Remove", color: "#484848", labelStyle: this.props.labelStyle })
            )
          )
        )
      );
    }
  }]);

  return UploadDrawer;
}(_react.Component);

UploadDrawer.propTypes = {
  cameraIcon: _propTypes2.default.bool,
  videoCamIcon: _propTypes2.default.bool,
  galleryIcon: _propTypes2.default.bool,
  removeIcon: _propTypes2.default.bool,
  openUploadSlide: _propTypes2.default.bool,
  labelStyle: _propTypes2.default.object,
  uploadfile: _propTypes2.default.func,
  closeDrawer: _propTypes2.default.func
};
exports.default = UploadDrawer;