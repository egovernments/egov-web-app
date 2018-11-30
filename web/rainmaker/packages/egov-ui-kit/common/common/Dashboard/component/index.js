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

var moduleCardButtonStyle1 = {
  width: "93%"
};

var moduleCardButtonStyle2 = {
  width: "100%"
};
var buttonsContainerStyle1 = {
  padding: "0px",
  margin: "0px",
  width: "50%"
};

var buttonsContainerStyle2 = {
  padding: "0px",
  margin: "0px",
  width: "100%"
};

var ModuleCard = function ModuleCard(_ref) {
  var items = _ref.items,
      onButton1Click = _ref.onButton1Click,
      onPGRClick = _ref.onPGRClick,
      onButton2Click = _ref.onButton2Click,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    null,
    items && items.map(function (item, key) {
      var _React$createElement, _React$createElement2;

      return _react2.default.createElement(
        "div",
        { key: key, className: "col-sm-6 " + item.className },
        _react2.default.createElement(_components.Card, {
          id: "home-complaint-card",
          className: "clearfix landingPageCard",
          style: item.borderLeftColor,
          textChildren: _react2.default.createElement(
            "div",
            { className: "clearfix", style: { position: "relative", minHeight: item.moduleDescription ? "200px" : "inherit" } },
            _react2.default.createElement(
              "div",
              { style: { padding: "0", margin: "0", display: "flex" } },
              _react2.default.createElement(_components.Icon, { action: item.iconAction, name: item.iconName, style: item.iconStyle }),
              _react2.default.createElement(_translationNode2.default, { className: "moduleCardTitle", label: item.moduleTitle })
            ),
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_translationNode2.default, { className: "moduleCardDescription", label: item.moduleDescription })
            ),
            _react2.default.createElement(
              "div",
              {
                className: item.moduleDescription ? "col-sm-12 landing-page-button landing-page-button-container" : "col-sm-12 landing-page-button"
              },
              _react2.default.createElement(
                "div",
                { className: "col-sm-6", style: item.button2 ? buttonsContainerStyle1 : buttonsContainerStyle2 },
                _react2.default.createElement(_components.Button, (_React$createElement = {
                  onClick: function onClick() {
                    onButton1Click(item, history, onPGRClick);
                  },
                  label: _react2.default.createElement(_translationNode2.default, { label: item.button1, color: "#fff" }),
                  primary: true,
                  style: { align: "left" }
                }, (0, _defineProperty3.default)(_React$createElement, "style", item.button2 ? moduleCardButtonStyle1 : moduleCardButtonStyle2), (0, _defineProperty3.default)(_React$createElement, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement, "labelStyle", {
                  padding: "0 12px 0 12px ",
                  letterSpacing: "0.6px",
                  display: "inline-block",
                  height: "22px",
                  lineHeight: "22px",
                  fontSize: "14px"
                }), _React$createElement))
              ),
              item.button2 && _react2.default.createElement(
                "div",
                { className: "col-sm-6", style: buttonsContainerStyle1 },
                _react2.default.createElement(_components.Button, (_React$createElement2 = {
                  onClick: function onClick() {
                    onButton2Click(item, history);
                  },
                  label: _react2.default.createElement(_translationNode2.default, { label: item.button2, color: "#fe7a51" }),
                  style: { align: "right" }
                }, (0, _defineProperty3.default)(_React$createElement2, "style", moduleCardButtonStyle1), (0, _defineProperty3.default)(_React$createElement2, "buttonStyle", { border: "1px solid #fe7a51" }), (0, _defineProperty3.default)(_React$createElement2, "className", "moduleSecondButton"), (0, _defineProperty3.default)(_React$createElement2, "labelStyle", {
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