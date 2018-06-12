"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _logo_black = require("egov-ui-kit/assets/images/logo_black.png");

var _logo_black2 = _interopRequireDefault(_logo_black);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectedLabelStyle = {
  color: "#ffffff"
};

var selectedStyle = {
  backgroundColor: "#00bcd1",
  border: "1px solid #00bcd1"
};

var defaultStyle = {
  border: "1px solid #484848",
  borderRadius: "1px",
  marginRight: "4.65%",
  height: "44px",
  lineHeight: "44px",
  width: "28.48%",
  padding: "0 16px"
};

var defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  verticalAlign: "initial",
  padding: 0
};

var LanguageSelectionForm = function LanguageSelectionForm(_ref) {
  var items = _ref.items,
      onLanguageSelect = _ref.onLanguageSelect,
      value = _ref.value,
      onClick = _ref.onClick;

  return _react2.default.createElement(_components.Card, {
    className: "col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 user-screens-card language-selection-card",
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { style: { marginBottom: "24px" } },
        _react2.default.createElement(_components.Image, { className: "mseva-logo", source: "" + _logo_black2.default })
      ),
      _react2.default.createElement(
        "form",
        null,
        _react2.default.createElement(
          "div",
          { className: "text-center" },
          _react2.default.createElement(_translationNode2.default, { bold: true, label: "LANGUAGE", className: "language-label" }),
          _react2.default.createElement(
            "span",
            null,
            "|"
          ),
          _react2.default.createElement(_translationNode2.default, { bold: true, label: "\u092D\u093E\u0937\u093E", className: "language-label" }),
          _react2.default.createElement(
            "span",
            null,
            "|"
          ),
          _react2.default.createElement(_translationNode2.default, { bold: true, label: "\u0A2D\u0A3E\u0A38\u0A3C\u0A3E", className: "language-label" })
        ),
        _react2.default.createElement(
          "div",
          { className: "button-toggle-container" },
          _react2.default.createElement(_components.ButtonGroup, {
            items: items,
            onClick: onClick,
            selected: value,
            defaultStyle: defaultStyle,
            defaultLabelStyle: defaultLabelStyle,
            selectedStyle: selectedStyle,
            selectedLabelStyle: selectedLabelStyle,
            multiple: false
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "button-container" },
          _react2.default.createElement(_components.Button, {
            id: "continue-action",
            onClick: onLanguageSelect,
            primary: true,
            label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_CONTINUE" }),
            fullWidth: true
          })
        )
      )
    )
  });
};

exports.default = LanguageSelectionForm;