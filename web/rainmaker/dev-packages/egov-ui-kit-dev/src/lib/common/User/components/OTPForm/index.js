"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTP = function OTP(_ref) {
  var onOtpChanged = _ref.onOtpChanged,
      onOtpSubmit = _ref.onOtpSubmit,
      disabled = _ref.disabled,
      otp = _ref.otp,
      btnText = _ref.btnText;

  return _react2.default.createElement(_components.Card, {
    className: "user-screens-card",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_components.Label, { className: "otp-heading text-center", bold: true, dark: true, fontSize: 16, label: "ENTER OTP" }),
      _react2.default.createElement(_components.Label, { className: "otp-text", label: "An OTP has been sent to Mobile Number 9968739374" }),
      _react2.default.createElement(
        "form",
        null,
        _react2.default.createElement(_components.TextField, {
          onChange: onOtpChanged,
          id: "otp",
          disabled: disabled,
          value: otp,
          fullWidth: true,
          hintText: "Enter OTP",
          floatingLabelText: "OTP"
        }),
        _react2.default.createElement(
          "div",
          { style: { marginBottom: "24px" }, className: "text-right" },
          _react2.default.createElement(_components.Label, { id: "otp-trigger", className: "otp-prompt", label: "Didn't recieve OTP?" }),
          _react2.default.createElement(_components.Label, { id: "otp-resend", className: "otp-resend", label: "RESEND" })
        ),
        _react2.default.createElement(_components.Button, { id: "otp-start", onClick: onOtpSubmit, primary: true, label: btnText, fullWidth: true })
      )
    )
  });
};

exports.default = OTP;