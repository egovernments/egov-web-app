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

var iconStyle = {
  display: "inline-block"
};

var activeStepperStyle = {
  width: 20,
  height: 20,
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  backgroundColor: "#fe7a51",
  borderRadius: "50%",
  position: "relative",
  zIndex: 100
};

var defaultStepperStyle = {
  width: 18,
  height: 18
};

var MobileWizard = function MobileWizard(_ref) {
  var handleNext = _ref.handleNext,
      handlePrev = _ref.handlePrev,
      iconAction = _ref.iconAction,
      header = _ref.header,
      iconName = _ref.iconName,
      trianglePos = _ref.trianglePos,
      component = _ref.component,
      stepIndex = _ref.stepIndex;

  var steps = [1, 2, 3, 4, 5].map(function (item, index) {
    return {
      labelChildren: "",
      labelProps: {
        icon: stepIndex === index ? _react2.default.createElement("div", { style: activeStepperStyle }) : stepIndex > index ? _react2.default.createElement(_components.Icon, { style: defaultStepperStyle, color: "#ffffff", action: "custom", name: "check-circle" }) : _react2.default.createElement(_components.Icon, { style: defaultStepperStyle, color: "#ffffff", action: "custom", name: "circle" }),
        style: {
          padding: 0
        },
        iconContainerStyle: {
          padding: 0,
          display: "flex"
        }
      }
    };
  });

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_components.TimeLine, {
      stepperProps: {
        activeStep: stepIndex,
        style: { background: "rgb(0, 188, 209)", position: "relative", zIndex: 10000, padding: "0 24px" },
        connector: _react2.default.createElement("div", { style: { border: "1px solid #fff", width: "100%", marginLeft: "-2px", marginRight: "4px" } })
      },
      steps: steps,
      horizontal: true
    }),
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_components.Card, {
        style: { margin: "24px 8px" },
        textChildren: _react2.default.createElement(
          "div",
          { style: { position: "relative" } },
          _react2.default.createElement("div", { style: { left: trianglePos }, className: "card-triangle" }),
          _react2.default.createElement(
            "div",
            { className: "pt-form-card-header-cont" },
            _react2.default.createElement(_components.Icon, { name: iconName, action: iconAction, style: iconStyle }),
            _react2.default.createElement(_translationNode2.default, {
              label: header,
              bold: true,
              dark: true,
              labelStyle: { letterSpacing: 0.6 },
              containerStyle: { display: "inline-block", marginLeft: 16 }
            })
          ),
          component
        )
      }),
      _react2.default.createElement(
        "div",
        { className: "flexbox-container" },
        _react2.default.createElement(
          "div",
          { className: "flex-item" },
          _react2.default.createElement(_components.Button, { onClick: handlePrev, fullWidth: true, primary: true, label: "GO BACK" })
        ),
        _react2.default.createElement(
          "div",
          { className: "flex-item" },
          _react2.default.createElement(_components.Button, { onClick: handleNext, fullWidth: true, label: "NEXT" })
        )
      )
    )
  );
};

exports.default = MobileWizard;