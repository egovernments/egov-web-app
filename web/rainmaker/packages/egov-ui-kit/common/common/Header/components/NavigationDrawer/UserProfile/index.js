"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _commons = require("egov-ui-kit/utils/commons");

var _download = require("egov-ui-kit/assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  imageStyle: { width: 89, height: 88, margin: "0 auto", marginBottom: "16px" },
  cardStyles: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#e0e0e0"
  },
  nameStyle: {
    paddingTop: 10,
    fontFamily: "Roboto",
    fontSize: 7,
    fontWeight: 900,
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.3,
    color: "#484848",
    padding: 0,
    textTransform: "none"
  },
  iconStyle: {
    height: "18px",
    width: "18px",
    paddingTop: 12
  },

  locationStyle: {
    fontSize: 7,
    fontWeight: 500
  }
};

var prepareUserInfo = function prepareUserInfo() {
  var userInfo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var cities = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var photo = userInfo.photo,
      name = userInfo.name,
      emailId = userInfo.emailId,
      permanentCity = userInfo.permanentCity,
      tenantId = userInfo.tenantId;

  var location = (0, _commons.getCityNameByCode)(permanentCity, cities) || (0, _commons.getCityNameByCode)(tenantId, cities);
  return { photo: photo, name: name, emailId: emailId, location: location };
};

var UserProfile = function UserProfile(_ref) {
  var _ref$role = _ref.role,
      role = _ref$role === undefined ? "citizen" : _ref$role,
      _ref$cities = _ref.cities,
      cities = _ref$cities === undefined ? [] : _ref$cities,
      _ref$userInfo = _ref.userInfo,
      userInfo = _ref$userInfo === undefined ? {} : _ref$userInfo;

  userInfo = prepareUserInfo(userInfo, cities);
  return _react2.default.createElement(_components.ProfileSection, {
    imgStyle: styles.imageStyle,
    cardStyles: styles.cardStyles,
    nameStyle: styles.nameStyle,
    locationStyle: styles.locationStyle,
    emailIdStyle: styles.nameStyle,
    name: userInfo.name || "",
    emailId: role === "citizen" ? userInfo.emailId || "" : "",
    location: userInfo.location || "",
    iconStyle: styles.iconStyle,
    imgSrc: userInfo.photo || _download2.default
  });
};

exports.default = UserProfile;