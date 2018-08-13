"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = { marginLeft: 10, marginTop: 2, cursor: "pointer" };
var selStyle = { color: "#fe7a51" };

var BreadCrumbs = function BreadCrumbs(_ref) {
  var url = _ref.url,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    { className: "rainmaker-displayInline", style: { paddingLeft: 15 } },
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: "/property-tax" },
      _react2.default.createElement(_Icon2.default, { action: "action", name: "home", color: "#fe7a51" })
    ),
    url && url.map(function (item, index) {
      console.log(item);
      return _react2.default.createElement(
        "div",
        { key: index, className: "rainmaker-displayInline" },
        _react2.default.createElement(
          "div",
          { style: style },
          "\u276F"
        ),
        _react2.default.createElement(
          "div",
          {
            onClick: function onClick() {
              url.length > 1 && index != url.length - 1 && history.push(item.path);
            },
            style: url.length - 1 === index ? style : (0, _extends3.default)({}, selStyle, style)
          },
          _react2.default.createElement(_translationNode2.default, { label: item.title })
        )
      );
    })
  );
};

exports.default = BreadCrumbs;