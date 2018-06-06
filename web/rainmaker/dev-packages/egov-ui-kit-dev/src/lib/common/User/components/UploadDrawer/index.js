"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadDrawerLabelStyle = {
  fontFamily: "Roboto",
  fontSize: "14px",
  letterSpacing: "0.3px"
};

var UploadDrawerView = function UploadDrawerView(_ref) {
  var setProfilePic = _ref.setProfilePic,
      removeFile = _ref.removeFile,
      onClickAddPic = _ref.onClickAddPic,
      openUploadSlide = _ref.openUploadSlide;

  return _react2.default.createElement(_components.UploadDrawer, {
    openUploadSlide: openUploadSlide,
    galleryIcon: true,
    removeIcon: true,
    removeFile: removeFile,
    labelStyle: UploadDrawerLabelStyle,
    uploadfile: setProfilePic,
    closeDrawer: onClickAddPic
  });
};

exports.default = UploadDrawerView;