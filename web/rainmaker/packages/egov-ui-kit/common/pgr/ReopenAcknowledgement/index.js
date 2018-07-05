"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReopenAcknowledgement = function ReopenAcknowledgement(_ref) {
  var history = _ref.history,
      userInfo = _ref.userInfo;

  // const userInfo = localStorage.getItem("user-info");
  var role = userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase() || null;
  console.log(role);
  return _react2.default.createElement(
    "div",
    { className: "reopen-success-container" },
    _react2.default.createElement(
      "div",
      { className: "success-message-main-screen" },
      _react2.default.createElement(_common.SuccessMessage, { successmessage: "CS_REOPEN_SUCCESS_MESSAGE", icon: _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" }), backgroundColor: "#22b25f" })
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, {
        id: "success-message-acknowledgement",
        onClick: function onClick() {
          return role === "citizen" ? history.push("/") : history.push("/all-complaints");
        },
        primary: true,
        label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_GOTOHOME" }),
        fullWidth: true,
        className: "responsive-action-button"
      })
    )
  );
};

exports.default = ReopenAcknowledgement;