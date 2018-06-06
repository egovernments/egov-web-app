"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _FilePicker = require("../FilePicker");

var _FilePicker2 = _interopRequireDefault(_FilePicker);

var _Label = require("../Label");

var _Label2 = _interopRequireDefault(_Label);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  name: "image"
});

var UploadDrawer = function (_Component) {
  (0, _inherits3.default)(UploadDrawer, _Component);

  function UploadDrawer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UploadDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UploadDrawer.__proto__ || Object.getPrototypeOf(UploadDrawer)).call.apply(_ref, [this].concat(args))), _this), _this.onRemoveClick = function () {
      _this.props.removeFile();
      _this.props.closeDrawer(false);
    }, _this.picUpload = function (file, url) {
      _this.props.uploadfile(file, url);
      _this.props.closeDrawer(false);
    }, _this.onOverlayBodyClick = function () {
      _this.props.closeDrawer(false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UploadDrawer, [{
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
                { id: "photo-picker", inputProps: inputProps, handleimage: this.picUpload },
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