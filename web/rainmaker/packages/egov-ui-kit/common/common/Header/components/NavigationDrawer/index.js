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

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _commonMenuItems = require("./commonMenuItems");

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _common = require("modules/common");

var _logo_black = require("egov-ui-kit/assets/images/logo_black.png");

var _logo_black2 = _interopRequireDefault(_logo_black);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Icon } from "components";

// import LanguageSelection from "./LanguageSelection";
// import menuItems from "./menuItems";
var styles = {
  // listInnerDivStyle: {
  //   padding: "16px 0px 16px 60px",
  // },
  menuStyle: {
    marginLeft: 15,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    flex: 1
  },
  defaultMenuItemStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "4px",
    padding: 0,
    lineHeight: "unset"
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
      isCSR = _ref.isCSR,
      isADMIN = _ref.isADMIN;

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
      { className: "col-sm-1 drawer-list-poweredBy-wrapper" },
      window && window.outerWidth <= 768 && _react2.default.createElement(_common.ActionMenu, { role: role }),
      _react2.default.createElement(_Divider2.default, { light: true }),
      _commonMenuItems.CommonMenuItems.map(function (item) {
        return _react2.default.createElement(
          "div",
          { className: "sideMenuItem" },
          _react2.default.createElement(_MenuItem2.default, {
            innerDivStyle: styles.defaultMenuItemStyle,
            style: { whiteSpace: "initial" },
            onClick: function onClick() {
              handleItemClick(item, true);
            },
            leftIcon: item.leftIcon,
            primaryText: _react2.default.createElement(
              "div",
              { className: "menuStyle", style: styles.menuStyle },
              item.primaryText || ""
            )
          })
        );
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