"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _UserSettings = require("../UserSettings");

var _UserSettings2 = _interopRequireDefault(_UserSettings);

var _Toolbar = require("material-ui/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Digit_logo = require("egov-ui-kit/assets/images/Digit_logo.png");

var _Digit_logo2 = _interopRequireDefault(_Digit_logo);

var _pblogo = require("egov-ui-kit/assets/images/pblogo.png");

var _pblogo2 = _interopRequireDefault(_pblogo);

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 }
};

// handle listners
var EgovAppBar = function EgovAppBar(_ref) {
  var className = _ref.className,
      defaultTitle = _ref.defaultTitle,
      ulbLogo = _ref.ulbLogo,
      title = _ref.title,
      titleAddon = _ref.titleAddon,
      isHomeScreen = _ref.isHomeScreen,
      role = _ref.role,
      fetchLocalizationLabel = _ref.fetchLocalizationLabel,
      _ref$userInfo = _ref.userInfo,
      userInfo = _ref$userInfo === undefined ? {} : _ref$userInfo,
      onToolBarIconClick = _ref.onToolBarIconClick,
      history = _ref.history,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["className", "defaultTitle", "ulbLogo", "title", "titleAddon", "isHomeScreen", "role", "fetchLocalizationLabel", "userInfo", "onToolBarIconClick", "history"]);

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _components.AppBar
      // className={isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer"}
      ,
      (0, _extends3.default)({ className: className || "header-with-drawer",
        title: _react2.default.createElement(
          "div",
          { className: "citizen-header-logo-label" },
          _react2.default.createElement(
            "div",
            { className: "citizen-header-logo" },
            _react2.default.createElement("img", {
              src: role && role.toLowerCase() === "citizen" ? _pblogo2.default : ulbLogo ? ulbLogo : _pblogo2.default,
              onError: function onError(event) {
                return event.target.setAttribute("src", _pblogo2.default);
              }
            })
          ),
          _react2.default.createElement(_translationNode2.default, { containerStyle: { marginLeft: "0px" }, className: "screenHeaderLabelStyle appbar-title-label", label: title }),
          titleAddon && _react2.default.createElement(_translationNode2.default, {
            containerStyle: { display: "inline-block", marginLeft: 5 },
            className: "screenHeaderLabelStyle appbar-title-label",
            label: titleAddon
          }),
          _react2.default.createElement(_translationNode2.default, {
            containerStyle: { marginLeft: "10px" },
            className: "screenHeaderLabelStyle appbar-municipal-label",
            label: role && role.toLowerCase() === "citizen" ? "PUNJAB MUNICIPAL CORPORATION" : defaultTitle ? defaultTitle : "PUNJAB MUNICIPAL CORPORATION"
          })
        ),
        titleStyle: styles.titleStyle
      }, rest),
      _react2.default.createElement(
        _Toolbar2.default,
        { className: "app-toolbar", style: { padding: "0px", height: "64px", background: "#ffffff" } },
        _react2.default.createElement(_UserSettings2.default, { onIconClick: onToolBarIconClick, userInfo: userInfo })
      ),
      _react2.default.createElement(
        "div",
        { className: "appbar-right-logo" },
        _react2.default.createElement("img", { src: _Digit_logo2.default })
      ),
      _react2.default.createElement(
        "div",
        { className: "icon-button" },
        role === "ao" && window.location.pathname === "/all-complaints" && _react2.default.createElement(
          _IconButton2.default,
          { onClick: function onClick(e) {
              return onSearchClick(history);
            } },
          _react2.default.createElement(_components.Icon, { action: "action", name: "search", color: "#fff" })
        )
      )
    )
  );
};

var onSearchClick = function onSearchClick(history) {
  history.push("search-complaint");
};
exports.default = EgovAppBar;