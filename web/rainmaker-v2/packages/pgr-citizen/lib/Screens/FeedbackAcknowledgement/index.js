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

var FeedbackAcknowledge = function FeedbackAcknowledge(_ref) {
  var history = _ref.history;

  return _react2.default.createElement(
    "div",
    { className: "feedback-success-container" },
    _react2.default.createElement(
      "div",
      { className: "success-message-main-screen" },
      _react2.default.createElement(_common.SuccessMessage, { successmessage: "CS_FEEDBACK_SUCCESS", icon: _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" }), backgroundColor: "#22b25f" })
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, {
        id: "feedback-acknowledgement",
        onClick: function onClick() {
          return history.push("/");
        },
        primary: true,
        label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_CONTINUE" }),
        fullWidth: true,
        className: "responsive-action-button"
      })
    )
  );
};

exports.default = FeedbackAcknowledge;