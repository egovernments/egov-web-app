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

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  titleStyle: { fontSize: "20px", fontWeight: 500 }
};

// handle listners
var EgovAppBar = function EgovAppBar(_ref) {
  var className = _ref.className,
      title = _ref.title,
      isHomeScreen = _ref.isHomeScreen,
      role = _ref.role,
      fetchLocalizationLabel = _ref.fetchLocalizationLabel,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["className", "title", "isHomeScreen", "role", "fetchLocalizationLabel"]);

  return _react2.default.createElement(
    _components.AppBar,
    (0, _extends3.default)({
      className: isHomeScreen && role === "citizen" ? "home-screen-appbar" : className || "header-with-drawer",
      title: _react2.default.createElement(
        "div",
        { className: "header-logo-label" },
        _react2.default.createElement("img", { src: _pblogo2.default }),
        _react2.default.createElement(_translationNode2.default, { containerStyle: { marginLeft: "10px" }, className: "screenHeaderLabelStyle", label: title })
      ),
      titleStyle: styles.titleStyle
    }, rest),
    _react2.default.createElement(
      _Toolbar2.default,
      { className: "app-toolbar", style: { padding: "0px", height: "64px", background: "#ffffff" } },
      _react2.default.createElement(_UserSettings2.default, { fetchLocalizationLabel: fetchLocalizationLabel, onIconClick: rest.onLeftIconButtonClick })
    ),
    _react2.default.createElement(
      "div",
      { classNmae: "appbar-right-logo" },
      _react2.default.createElement("img", { src: _Digit_logo2.default })
    )
  );
};

exports.default = EgovAppBar;