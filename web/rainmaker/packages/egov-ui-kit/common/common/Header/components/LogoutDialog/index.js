"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  logoutContentStyle: { textAlign: "center", padding: "24px 20px" }
};

var LogoutDialog = function LogoutDialog(_ref) {
  var logout = _ref.logout,
      closeLogoutDialog = _ref.closeLogoutDialog,
      logoutPopupOpen = _ref.logoutPopupOpen;

  return _react2.default.createElement(_components.Dialog, {
    open: logoutPopupOpen,
    children: [_react2.default.createElement(
      "div",
      { style: styles.logoutContentStyle, key: "logout-popup" },
      _react2.default.createElement(
        "div",
        { className: "logout-label" },
        _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_LOGOUT", bold: true, color: "#484848", fontSize: "16px", labelStyle: { marginBottom: "24px" } }),
        _react2.default.createElement(_translationNode2.default, { label: "CORE_LOGOUTPOPUP_CONFIRM", labelStyle: { marginBottom: "32px" } })
      ),
      _react2.default.createElement(
        "div",
        { className: "logout-button" },
        _react2.default.createElement(_components.Button, {
          id: "logout-no-button",
          className: "logout-no-button",
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_NO" }),
          backgroundColor: "#969696",
          onClick: closeLogoutDialog
        }),
        _react2.default.createElement(_components.Button, {
          id: "logout-yes-button",
          className: "logout-yes-button",
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_YES" }),
          primary: true,
          onClick: logout
        })
      )
    )],
    handleClose: closeLogoutDialog,
    isClose: true
  });
};

exports.default = LogoutDialog;