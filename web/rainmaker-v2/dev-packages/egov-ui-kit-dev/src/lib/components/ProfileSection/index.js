"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Image = require("../Image");

var _Image2 = _interopRequireDefault(_Image);

var _Label = require("../Label");

var _Label2 = _interopRequireDefault(_Label);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileSection = function ProfileSection(_ref) {
  var imgStyle = _ref.imgStyle,
      cardStyles = _ref.cardStyles,
      nameStyle = _ref.nameStyle,
      locationStyle = _ref.locationStyle,
      emailIdStyle = _ref.emailIdStyle,
      name = _ref.name,
      location = _ref.location,
      addIconName = _ref.addIconName,
      imgSrc = _ref.imgSrc,
      addIconStyle = _ref.addIconStyle,
      onClickAddPic = _ref.onClickAddPic,
      emailId = _ref.emailId;

  return _react2.default.createElement(
    "div",
    { className: "profileSection", style: cardStyles },
    _react2.default.createElement(
      "div",
      { className: "profileContainer", style: { textAlign: "center" } },
      _react2.default.createElement(_Image2.default, { id: "profile-photo", className: "img-Profile", circular: true, style: imgStyle, source: imgSrc }),
      addIconName && _react2.default.createElement(
        "div",
        { style: addIconStyle },
        _react2.default.createElement(_Icon2.default, { id: "profile-upload-icon", action: "image", name: addIconName, onClick: onClickAddPic, color: "#ffffff" })
      ),
      name && _react2.default.createElement(_Label2.default, {
        id: "profile-name",
        className: "name-Profile",
        label: name,
        style: nameStyle,
        labelStyle: { letterSpacing: 0.6 },
        dark: true,
        bold: true
      }),
      location && _react2.default.createElement(_Label2.default, { id: "profile-location", className: "loc-Profile", labelPosition: "after", label: location, style: locationStyle }),
      emailId && _react2.default.createElement(_Label2.default, { id: "profile-emailid", className: "loc-Profile", label: emailId, style: emailIdStyle })
    )
  );
};

exports.default = ProfileSection;


ProfileSection.propTypes = {
  style: _propTypes2.default.object,
  cardStyles: _propTypes2.default.object,
  nameStyle: _propTypes2.default.object,
  locationStyle: _propTypes2.default.object,
  iconStyle: _propTypes2.default.object,
  onClickAddPic: _propTypes2.default.func
};