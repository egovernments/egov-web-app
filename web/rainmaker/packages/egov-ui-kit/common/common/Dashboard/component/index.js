"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleCardButtons = {
  width: "93%"
};
var moduleCardButtonsContainer = {
  padding: "0px 0px 12px 0px"
};
var moduleIconStyle = {
  width: "75px",
  height: "75px",
  paddingTop: "10px"
};

var ModuleCard = function ModuleCard(_ref) {
  var items = _ref.items,
      onButton1Click = _ref.onButton1Click,
      onButton2Click = _ref.onButton2Click;

  return _react2.default.createElement(
    "div",
    null,
    items && items.map(function (item, key) {
      var _React$createElement, _React$createElement2;

      return _react2.default.createElement(
        "div",
        { className: "col-sm-6" },
        _react2.default.createElement(_components.Card, {
          id: "home-complaint-card",
          className: "clearfix landingPageCard",
          style: item.borderLeftColor,
          textChildren: _react2.default.createElement(
            "div",
            { className: "clearfix" },
            _react2.default.createElement(
              "div",
              { className: "col-sm-2" },
              _react2.default.createElement(_components.Icon, { action: item.iconAction, name: item.iconName, style: moduleIconStyle })
            ),
            _react2.default.createElement(
              "div",
              { className: "col-sm-10" },
              _react2.default.createElement(_translationNode2.default, { className: "moduleCardTitle", label: item.moduleTitle }),
              _react2.default.createElement(_translationNode2.default, { className: "moduleCardDescription", label: item.moduleDescription }),
              _react2.default.createElement(
                "div",
                { "class": "col-sm-6", style: moduleCardButtonsContainer },
                _react2.default.createElement(_components.Button, (_React$createElement = {
                  onClick: function onClick() {
                    return onButton1Click(item);
                  },
                  label: _react2.default.createElement(_translationNode2.default, { label: item.button1, color: "#fff" }),
                  primary: "true",
                  style: { align: "left" }
                }, (0, _defineProperty3.default)(_React$createElement, "style", moduleCardButtons), (0, _defineProperty3.default)(_React$createElement, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement, "labelStyle", {
                  padding: "0 12px 0 12px ",
                  letterSpacing: "0.6px",
                  display: "inline-block",
                  height: "22px",
                  lineHeight: "22px",
                  fontSize: "14px"
                }), _React$createElement))
              ),
              _react2.default.createElement(
                "div",
                { "class": "col-sm-6", style: moduleCardButtonsContainer },
                _react2.default.createElement(_components.Button, (_React$createElement2 = {
                  onClick: function onClick() {
                    return onButton2Click(item);
                  },
                  label: _react2.default.createElement(_translationNode2.default, { label: item.button2, color: "#fe7a51" }),
                  style: { align: "right" }
                }, (0, _defineProperty3.default)(_React$createElement2, "style", moduleCardButtons), (0, _defineProperty3.default)(_React$createElement2, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement2, "className", "moduleSecondButton"), (0, _defineProperty3.default)(_React$createElement2, "labelStyle", {
                  padding: "0 12px 0 12px ",
                  letterSpacing: "0.6px",
                  display: "inline-block",
                  height: "22px",
                  lineHeight: "22px",
                  fontSize: "14px"
                }), _React$createElement2))
              )
            )
          )
        })
      );
    })
  );
};

exports.default = ModuleCard;