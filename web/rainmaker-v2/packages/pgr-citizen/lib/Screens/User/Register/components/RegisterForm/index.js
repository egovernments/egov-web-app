"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _Banner = require("egov-ui-kit/common/common/Banner");

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { startSMSRecevier } from "egov-ui-kit/utils/commons";
var RegisterForm = function RegisterForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(_components.Card, {
    className: "col-sm-offset-4 col-sm-4 user-screens-card ",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "web-user-logo", style: { marginBottom: "24px" } },
        _react2.default.createElement(_components.Image, {
          className: "mseva-logo employee-login-logo",
          source: "" + _msevaPunjab2.default
        })
      ),
      _react2.default.createElement(_translationNode2.default, {
        className: "heading text-center",
        bold: true,
        dark: true,
        fontSize: 16,
        label: "CORE_REGISTER_HEADING"
      }),
      _react2.default.createElement(_field2.default, {
        fieldKey: "phone",
        field: fields.phone,
        handleFieldChange: handleFieldChange
      }),
      _react2.default.createElement(_field2.default, {
        fieldKey: "name",
        field: fields.name,
        handleFieldChange: handleFieldChange
      }),
      _react2.default.createElement(_Banner.CityPicker, {
        onChange: handleFieldChange,
        fieldKey: "city",
        field: fields.city
      }),
      _react2.default.createElement(
        "div",
        {
          style: { marginBottom: "24px", position: "relative", zIndex: 10 },
          className: "text-right"
        },
        _react2.default.createElement(_translationNode2.default, {
          id: "otp-trigger",
          className: "otp-prompt",
          label: "CORE_REGISTER_HAVE_ACCOUNT"
        }),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: "/user/login" },
          _react2.default.createElement(
            "div",
            { style: { display: "inline-block" } },
            _react2.default.createElement(_translationNode2.default, {
              containerStyle: { cursor: "pointer" },
              id: "otp-resend",
              className: "otp-resend",
              label: "CORE_COMMON_LOGIN"
            })
          )
        )
      ),
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        primary: true,
        fullWidth: true
      }, submit, {
        onClick: function onClick(e) {
          // startSMSRecevier();
        }
      }))
    )
  });
};

exports.default = RegisterForm;