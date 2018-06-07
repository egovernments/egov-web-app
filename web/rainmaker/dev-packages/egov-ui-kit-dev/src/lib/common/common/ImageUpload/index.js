"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _components = require("components");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _commons = require("egov-ui-kit/utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var iconStyle = {
  width: "19px",
  height: "19px",
  fontSize: "12px",
};

var labelStyle = {
  letterSpacing: "0.6px",
  lineHeight: 1,
  margin: "0 auto",
  width: "75px",
};

var Placeholder = function Placeholder(_ref) {
  var className = _ref.className,
    onFilePicked = _ref.onFilePicked,
    inputProps = _ref.inputProps,
    hide = _ref.hide;

  return _react2.default.createElement(
    "div",
    { className: className + " upload-placeholder", style: hide ? { visibility: "hidden" } : {} },
    _react2.default.createElement(
      _components.FilePicker,
      { inputProps: (0, _extends3.default)({}, inputProps, { multiple: false }), handleimage: onFilePicked },
      _react2.default.createElement(
        _FloatingActionButton2.default,
        { backgroundColor: "#767676", iconStyle: { height: "40px", width: "40px" }, style: { boxShadow: 0, marginBottom: "4px" } },
        _react2.default.createElement(_components.Icon, {
          id: "image-upload",
          name: "add-a-photo",
          action: "image",
          style: { height: "20px", width: "20px" },
          color: "#ffffff",
        })
      ),
      _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_UPLOAD_PHOTOS", labelStyle: labelStyle, fontSize: "12px" })
    )
  );
};

var ImageUpload = (function(_Component) {
  (0, _inherits3.default)(ImageUpload, _Component);

  function ImageUpload() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ImageUpload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = (0, _possibleConstructorReturn3.default)(
        this,
        (_ref2 = ImageUpload.__proto__ || Object.getPrototypeOf(ImageUpload)).call.apply(_ref2, [this].concat(args))
      )),
      _this)),
      (_this.fillPlaceholder = function(images, onFilePicked, inputProps) {
        var placeholders = [];
        for (var i = 0; i < 3 - images.length; i++) {
          placeholders.push(
            _react2.default.createElement(Placeholder, { key: i, inputProps: inputProps, onFilePicked: onFilePicked, hide: i === 1 ? true : false })
          );
        }
        return placeholders;
      }),
      (_this.removeImage = function(fileIndex) {
        var _this$props = _this.props,
          formKey = _this$props.formKey,
          fieldKey = _this$props.fieldKey,
          removeFile = _this$props.removeFile;

        removeFile(formKey, fieldKey, fileIndex);
      }),
      (_this.onFilePicked = function(file, imageUri) {
        var _this$props2 = _this.props,
          images = _this$props2.images,
          formKey = _this$props2.formKey,
          fieldKey = _this$props2.fieldKey,
          module = _this$props2.module,
          fileUpload = _this$props2.fileUpload,
          toggleSnackbarAndSetText = _this$props2.toggleSnackbarAndSetText;

        var MAX_IMAGE_SIZE = 5000;
        var fileSize = (0, _commons.getFileSize)(file);
        var isImage = (0, _commons.isFileImage)(file);
        if (!isImage) {
          toggleSnackbarAndSetText(true, "The file " + file.name + " is not a valid image", true);
        } else if (fileSize > MAX_IMAGE_SIZE) {
          toggleSnackbarAndSetText(true, "The file " + file.name + " is more than 5mb", true);
        } else {
          if (images.length < 3) {
            fileUpload(formKey, fieldKey, { module: module, file: file, imageUri: imageUri });
          }
        }
      }),
      _temp)),
      (0, _possibleConstructorReturn3.default)(_this, _ret)
    );
  }

  (0, _createClass3.default)(ImageUpload, [
    {
      key: "render",
      value: function render() {
        var onFilePicked = this.onFilePicked,
          removeImage = this.removeImage;
        var _props = this.props,
          images = _props.images,
          loading = _props.loading;
        // file Size in kb

        var inputProps = { accept: "image/*", maxFiles: 3, multiple: true };

        return _react2.default.createElement(
          "div",
          { className: "upload-photo-overlay" },
          loading && _react2.default.createElement(_components.LoadingIndicator, null),
          !images.length
            ? _react2.default.createElement(
                _components.FilePicker,
                { inputProps: inputProps, handleimage: onFilePicked },
                _react2.default.createElement(
                  "div",
                  { className: "upload-icon-cont" },
                  _react2.default.createElement(_components.Icon, {
                    id: "image-upload",
                    action: "image",
                    name: "add-a-photo",
                    style: iconStyle,
                    color: "#ffffff",
                  })
                ),
                _react2.default.createElement(_translationNode2.default, {
                  label: "CS_COMMON_UPLOAD_PHOTOS",
                  labelStyle: labelStyle,
                  fontSize: "12px",
                })
              )
            : _react2.default.createElement(
                "div",
                { className: "upload-images-cont" },
                images.map(function(image, index) {
                  return _react2.default.createElement(
                    "div",
                    { key: index, className: "upload-image-cont" },
                    _react2.default.createElement(_components.Image, { source: image.imageUri, style: { height: "100px" } }),
                    _react2.default.createElement(
                      "div",
                      {
                        className: "image-remove",
                        onClick: function onClick() {
                          return removeImage(index);
                        },
                      },
                      _react2.default.createElement(_components.Icon, {
                        id: "image-close-icon",
                        action: "navigation",
                        name: "close",
                        color: "#ffffff",
                        style: { width: "14px", height: "14px" },
                      })
                    )
                  );
                }),
                this.fillPlaceholder(images, onFilePicked, inputProps)
              )
        );
      },
    },
  ]);
  return ImageUpload;
})(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var images = (state.form[ownProps.formKey] && state.form[ownProps.formKey].files && state.form[ownProps.formKey].files[ownProps.fieldKey]) || [];
  var loading = images.reduce(function(loading, file) {
    return loading || file.loading;
  }, false);
  return { images: images, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    },
    fileUpload: function fileUpload(formKey, fieldKey, module, fileObject) {
      return dispatch((0, _actions.fileUpload)(formKey, fieldKey, module, fileObject));
    },
    removeFile: function removeFile(formKey, fieldKey, index) {
      return dispatch((0, _actions.removeFile)(formKey, fieldKey, index));
    },
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImageUpload);
