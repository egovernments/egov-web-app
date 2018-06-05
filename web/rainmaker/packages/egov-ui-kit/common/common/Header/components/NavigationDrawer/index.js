"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _UserProfile = require("./UserProfile");

var _UserProfile2 = _interopRequireDefault(_UserProfile);

var _LanguageSelection = require("./LanguageSelection");

var _LanguageSelection2 = _interopRequireDefault(_LanguageSelection);

var _menuItems = require("./menuItems");

var _menuItems2 = _interopRequireDefault(_menuItems);

var _logo_black = require("egov-ui-kit/assets/images/logo_black.png");

var _logo_black2 = _interopRequireDefault(_logo_black);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  listInnerDivStyle: {
    padding: "16px 0px 16px 60px"
  }
};

var NavigationDrawer = function NavigationDrawer(_ref) {
  var handleItemClick = _ref.handleItemClick,
      role = _ref.role,
      toggleMenu = _ref.toggleMenu,
      onUpdateMenuStatus = _ref.onUpdateMenuStatus,
      userInfo = _ref.userInfo,
      cities = _ref.cities,
      fetchLocalizationLabel = _ref.fetchLocalizationLabel;

  return _react2.default.createElement(
    _components.Drawer,
    { docked: false, width: "85%", open: toggleMenu, onRequestChange: function onRequestChange(open) {
        return onUpdateMenuStatus(open);
      } },
    _react2.default.createElement(_UserProfile2.default, { role: role, cities: cities, userInfo: userInfo }),
    _react2.default.createElement(
      "div",
      { className: "drawer-list-poweredBy-wrapper" },
      _react2.default.createElement(_components.List, {
        onItemClick: handleItemClick,
        innerDivStyle: styles.listInnerDivStyle,
        className: "drawer-list-style",
        items: (0, _menuItems2.default)(role, "one"),
        listContainerStyle: { background: "#ffffff" },
        listItemStyle: { borderBottom: "1px solid #e0e0e0" }
      }),
      _react2.default.createElement(_LanguageSelection2.default, { fetchLocalizationLabel: fetchLocalizationLabel }),
      _react2.default.createElement(_components.List, {
        onItemClick: handleItemClick,
        innerDivStyle: styles.listInnerDivStyle,
        className: "drawer-list-style",
        items: (0, _menuItems2.default)(role, "two"),
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