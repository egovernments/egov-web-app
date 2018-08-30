"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginForm = function LoginForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form;

  var fields = form.fields || {};
  var submit = form.submit;

  return _react2.default.createElement(_components.Card, {
    className: "user-screens-card language-selection-card col-sm-offset-4 col-sm-4",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "web-user-logo", style: { marginBottom: "24px" } },
        _react2.default.createElement(_components.Image, { className: "mseva-logo employee-login-logo", source: "" + _msevaPunjab2.default })
      ),
      _react2.default.createElement(_translationNode2.default, { style: { marginBottom: "12px" }, className: "text-center", bold: true, dark: true, fontSize: 16, label: "CORE_COMMON_LOGIN" }),
      _react2.default.createElement(_field2.default, { fieldKey: "phone", field: fields.phone, handleFieldChange: handleFieldChange }),
      _react2.default.createElement(_components.Button, (0, _extends3.default)({}, submit, {
        fullWidth: true,
        primary: true,
        onClick: function onClick(e) {
          (0, _commons.startSMSRecevier)();
        }
      }))
    )
  });
};

exports.default = LoginForm;