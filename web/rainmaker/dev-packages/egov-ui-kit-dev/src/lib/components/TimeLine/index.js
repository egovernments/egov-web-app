"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Stepper = require("material-ui/Stepper");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeLineUi = function TimeLineUi(_ref) {
  var divStyle = _ref.divStyle,
      stepperProps = _ref.stepperProps,
      steps = _ref.steps,
      horizontal = _ref.horizontal;

  return _react2.default.createElement(
    "div",
    divStyle,
    _react2.default.createElement(
      _Stepper.Stepper,
      stepperProps,
      horizontal ? //Code duplication to handle annoying warning - Refer https://github.com/mui-org/material-ui/issues/6004
      steps.map(function (step, stepIndex) {
        return _react2.default.createElement(
          _Stepper.Step,
          (0, _extends3.default)({ key: stepIndex }, step.props),
          _react2.default.createElement(
            _Stepper.StepLabel,
            step.labelProps,
            step.labelChildren
          )
        );
      }) : steps.map(function (step, stepIndex) {
        return _react2.default.createElement(
          _Stepper.Step,
          (0, _extends3.default)({ key: stepIndex }, step.props),
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
  divStyle: _propTypes2.default.object
};