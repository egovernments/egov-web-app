"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imgStyle = { width: 127, height: 127 };

var addIconStyle = {
  background: "#00bbd3",
  position: "absolute",
  right: "-5%",
  bottom: "0px",
  color: "rgb(255, 255, 255)",
  borderRadius: "50%",
  padding: "12px",
  height: 48,
  width: 48
};

var cardStyles = {
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  paddingTop: 30,
  paddingBottom: 30,
  backgroundColor: "#e0e0e0"
};

var ProfileSectionView = function ProfileSectionView(_ref) {
  var onClickAddPic = _ref.onClickAddPic,
      img = _ref.img;

  return _react2.default.createElement(_components.ProfileSection, {
    id: "profile-photo",
    className: "profileSection",
    imgStyle: imgStyle,
    addIconName: "add-a-photo",
    addIconStyle: addIconStyle,
    cardStyles: cardStyles,
    imgSrc: img,
    onClickAddPic: onClickAddPic
  });
};

exports.default = ProfileSectionView;