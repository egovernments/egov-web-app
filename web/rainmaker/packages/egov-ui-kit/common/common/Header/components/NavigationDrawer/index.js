"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _UserProfile = require("./UserProfile");

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _menuItems = require("./menuItems");

var _menuItems2 = _interopRequireDefault(_menuItems);

var _logo_black = require("egov-ui-kit/assets/images/logo_black.png");

var _logo_black2 = _interopRequireDefault(_logo_black);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import LanguageSelection from "./LanguageSelection";
var styles = {
  listInnerDivStyle: {
    padding: "16px 0px 16px 60px"
  }
};

var defaultContainerStyle = {
  paddingBottom: 30,
  background: "#fff"
};

var NavigationDrawer = function NavigationDrawer(_ref) {
  var handleItemClick = _ref.handleItemClick,
      role = _ref.role,
      toggleMenu = _ref.toggleMenu,
      width = _ref.width,
      openSecondary = _ref.openSecondary,
      onUpdateMenuStatus = _ref.onUpdateMenuStatus,
      userInfo = _ref.userInfo,
      cities = _ref.cities,
      fetchLocalizationLabel = _ref.fetchLocalizationLabel,
      containerStyle = _ref.containerStyle,
      isCSR = _ref.isCSR;

  return _react2.default.createElement(
    _components.Drawer,
    {
      containerStyle: (0, _extends3.default)({}, defaultContainerStyle, containerStyle),
      docked: false,
      width: width,
      openSecondary: openSecondary,
      open: toggleMenu,
      onRequestChange: function onRequestChange(open) {
        return onUpdateMenuStatus(open);
      }
    },
    _react2.default.createElement(_UserProfile2.default, { role: role, cities: cities, userInfo: userInfo }),
    _react2.default.createElement(
      "div",
      { className: "drawer-list-poweredBy-wrapper" },
      _react2.default.createElement(_components.List, {
        onItemClick: handleItemClick,
        innerDivStyle: styles.listInnerDivStyle,
        className: "drawer-list-style",
        items: (0, _menuItems2.default)(role, "one", isCSR),
        listContainerStyle: { background: "#ffffff" },
        listItemStyle: { borderBottom: "1px solid #e0e0e0" }
      }),
      _react2.default.createElement(_components.List, {
        onItemClick: handleItemClick,
        innerDivStyle: styles.listInnerDivStyle,
        className: "drawer-list-style",
        items: (0, _menuItems2.default)(role, "two", isCSR),
        listContainerStyle: { background: "#ffffff" },
        listItemStyle: { borderBottom: "1px solid #e0e0e0" }
      }),
      _react2.default.createElement(
        "div",
        { className: "drawer-image-cont" },
        _react2.default.createElement(_components.Image, { className: "mseva-logo", source: _logo_black2.default })
      )
    )
  );
};

exports.default = NavigationDrawer;