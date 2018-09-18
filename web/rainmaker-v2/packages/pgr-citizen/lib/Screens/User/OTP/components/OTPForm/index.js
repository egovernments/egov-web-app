"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTP = function OTP(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      phoneNumber = _ref.phoneNumber,
      resendOTP = _ref.resendOTP;

  var fields = form.fields || {};
  var submit = form.submit;

  return _react2.default.createElement(_components.Card, {
    className: "col-sm-offset-4 col-sm-4  user-screens-card",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "web-user-logo", style: { marginBottom: "24px" } },
        _react2.default.createElement(_components.Image, { className: "mseva-logo employee-login-logo", source: "" + _msevaPunjab2.default })
      ),
      _react2.default.createElement(_translationNode2.default, { className: "otp-heading text-center", bold: true, dark: true, fontSize: 16, label: "CORE_OTP_HEADING" }),
      _react2.default.createElement(
        "div",
        { className: "citizen-otp-sent-message" },
        _react2.default.createElement(_translationNode2.default, { label: "CORE_OTP_SENT_MESSAGE" }),
        _react2.default.createElement(_translationNode2.default, { labelClassName: "otp-mobile-number", containerStyle: { paddingLeft: "5px" }, label: phoneNumber })
      ),
      _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_CHECK_MESSAGE", color: "#b3b3b3", fontSize: "12px" }),
      _react2.default.createElement(_components.TextField, (0, _extends3.default)({
        errorStyle: { bottom: "0px" },
        onChange: function onChange(e, value) {
          return handleFieldChange("otp", value);
        },
        id: "otp"
      }, fields.otp, {
        fullWidth: true,
        type: "number"
      })),
      _react2.default.createElement(
        "div",
        { style: { marginBottom: "24px" }, className: "text-right" },
        _react2.default.createElement(_translationNode2.default, { id: "otp-trigger", className: "otp-prompt", label: "CORE_OTP_NOT_RECEIVE" }),
        _react2.default.createElement(
          "span",
          { style: { cursor: "pointer" }, onClick: function onClick() {
              return resendOTP();
            } },
          _react2.default.createElement(_translationNode2.default, { id: "otp-resend", className: "otp-resend", label: "CORE_OTP_RESEND" })
        )
      ),
      _react2.default.createElement(_components.Button, (0, _extends3.default)({}, submit, { primary: true, fullWidth: true }))
    )
  });
};

exports.default = OTP;