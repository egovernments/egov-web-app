'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

var _Stepper = require('@material-ui/core/Stepper');

var _Stepper2 = _interopRequireDefault(_Stepper);

var _Step = require('@material-ui/core/Step');

var _Step2 = _interopRequireDefault(_Step);

var _StepLabel = require('@material-ui/core/StepLabel');

var _StepLabel2 = _interopRequireDefault(_StepLabel);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      width: '100%'
    }
  };
};

var HorizontalLabelPositionBelowStepper = function (_React$Component) {
  (0, _inherits3.default)(HorizontalLabelPositionBelowStepper, _React$Component);

  function HorizontalLabelPositionBelowStepper() {
    (0, _classCallCheck3.default)(this, HorizontalLabelPositionBelowStepper);
    return (0, _possibleConstructorReturn3.default)(this, (HorizontalLabelPositionBelowStepper.__proto__ || Object.getPrototypeOf(HorizontalLabelPositionBelowStepper)).apply(this, arguments));
  }

  (0, _createClass3.default)(HorizontalLabelPositionBelowStepper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          activeStep = _props.activeStep,
          steps = _props.steps;

      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _Stepper2.default,
          { activeStep: activeStep, alternativeLabel: true, style: {
              background: "inherit"
            } },
          steps.map(function (label) {
            return _react2.default.createElement(
              _Step2.default,
              { key: label },
              _react2.default.createElement(
                _StepLabel2.default,
                null,
                label
              )
            );
          })
        )
      );
    }
  }]);
  return HorizontalLabelPositionBelowStepper;
}(_react2.default.Component);

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(HorizontalLabelPositionBelowStepper);