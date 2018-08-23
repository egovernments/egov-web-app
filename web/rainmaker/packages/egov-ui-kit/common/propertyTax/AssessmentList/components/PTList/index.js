"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTList = function PTList(_ref) {
  var items = _ref.items,
      label = _ref.label,
      onItemClick = _ref.onItemClick,
      innerDivStyle = _ref.innerDivStyle,
      hoverColor = _ref.hoverColor;

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    label && _react2.default.createElement(_translationNode2.default, {
      label: label,
      containerStyle: { padding: "24px 0px 24px 0", marginLeft: "16px" },
      dark: true,
      bold: true,
      labelStyle: { letterSpacing: 0 },
      fontSize: "20px"
    }),
    _react2.default.createElement(_components.Card, {
      className: "property-tax-card",
      textChildren: _react2.default.createElement(_components.List, {
        innerDivStyle: innerDivStyle,
        items: items,
        listItemStyle: { padding: "0px 20px", borderWidth: "10px 10px 0px" },
        nestedListStyle: { padding: "0px" },
        primaryTogglesNestedList: true,
        onItemClick: onItemClick,
        hoverColor: hoverColor
      })
    })
  );
};

exports.default = PTList;