"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addressStyle = {
  display: "inline-block"
};

var iconStyle = {
  display: "inline-block",
  width: 24,
  height: 24,
  marginRight: 7,
  marginTop: -3
};

var headerStyle = {
  letterSpacing: "0.7px"
};

var HeaderCard = function HeaderCard(_ref) {
  var complaint = _ref.complaint;

  var transformedcomplaint = "";
  if (complaint && complaint.header) {
    transformedcomplaint = "SERVICEDEFS." + complaint.header.toUpperCase();
  }
  return _react2.default.createElement(_components.Card, {
    textChildren: [_react2.default.createElement(_translationNode2.default, {
      key: 1,
      label: transformedcomplaint,
      dark: true,
      bold: true,
      fontSize: 16,
      labelStyle: headerStyle,
      containerStyle: { marginBottom: 10 }
    }), _react2.default.createElement(
      "div",
      { key: 2, style: { display: "flex", alignItems: "flex-start" } },
      _react2.default.createElement(_components.Icon, { action: "maps", name: "place", style: iconStyle, color: "#969696" }),
      _react2.default.createElement(_translationNode2.default, { containerStyle: addressStyle, dark: true, label: complaint && complaint.address })
    )]
  });
};

exports.default = HeaderCard;