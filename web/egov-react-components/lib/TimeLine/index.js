"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Stepper = require("material-ui/Stepper");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeLineUi = function TimeLineUi(_ref) {
  var divStyle = _ref.divStyle,
      stepperProps = _ref.stepperProps,
      steps = _ref.steps;

  return _react2.default.createElement(
    "div",
    divStyle,
    _react2.default.createElement(
      _Stepper.Stepper,
      stepperProps,
      steps.map(function (step, stepIndex) {
        return _react2.default.createElement(
          _Stepper.Step,
          _extends({ key: stepIndex }, step.props),
          _react2.default.createElement(
            _Stepper.StepLabel,
            step.labelProps,
            step.labelChildren
          ),
          _react2.default.createElement(
            _Stepper.StepContent,
            step.contentProps,
            step.contentChildren
          )
        );
      })
    )
  );
};

exports.default = TimeLineUi;


TimeLineUi.propTypes = {
  header: _propTypes2.default.object,
  mediaOverlay: _propTypes2.default.element,
  mediaChildren: _propTypes2.default.element,
  title: _propTypes2.default.object,
  textChildren: _propTypes2.default.element,
  actionChildren: _propTypes2.default.element
};