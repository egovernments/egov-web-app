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

var _StepButton = require('@material-ui/core/StepButton');

var _StepButton2 = _interopRequireDefault(_StepButton);

var _uiAtoms = require('../../ui-atoms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      width: '100%'
    },
    button: {
      marginRight: theme.spacing.unit
    },
    backButton: {
      marginRight: theme.spacing.unit
    },
    completed: {
      display: 'inline-block'
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    }
  };
};

var StepperNonLinearWithoutAction = function (_React$Component) {
  (0, _inherits3.default)(StepperNonLinearWithoutAction, _React$Component);

  function StepperNonLinearWithoutAction() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, StepperNonLinearWithoutAction);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = StepperNonLinearWithoutAction.__proto__ || Object.getPrototypeOf(StepperNonLinearWithoutAction)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      activeStep: 0
    }, _this.handleNext = function () {
      var steps = _this.props.steps;

      var activeStep = void 0;
      activeStep = _this.state.activeStep + 1;
      if (activeStep < steps.length) {
        _this.setState({
          activeStep: activeStep
        });
      } else {
        activeStep = 0;
        _this.setState({
          activeStep: activeStep
        });
      }
    }, _this.handleBack = function () {
      _this.setState(function (state) {
        return {
          activeStep: state.activeStep - 1
        };
      });
    }, _this.handleStep = function (step) {
      return function () {
        _this.setState({
          activeStep: step
        });
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(StepperNonLinearWithoutAction, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var activeStep = this.state.activeStep;
      var _props = this.props,
          steps = _props.steps,
          getStepContent = _props.getStepContent,
          classes = _props.classes;


      return _react2.default.createElement(
        'div',
        { className: classes.root },
        _react2.default.createElement(
          _Stepper2.default,
          { alternativeLabel: true, nonLinear: true, activeStep: activeStep },
          steps.map(function (label, index) {
            return _react2.default.createElement(
              _Step2.default,
              { key: label },
              _react2.default.createElement(
                _StepButton2.default,
                {
                  onClick: _this2.handleStep(index)
                },
                label
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _uiAtoms.Div,
              { className: classes.instructions },
              getStepContent(activeStep)
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                _uiAtoms.Button,
                {
                  disabled: activeStep === 0,
                  onClick: this.handleBack,
                  className: classes.button
                },
                'Back'
              ),
              _react2.default.createElement(
                _uiAtoms.Button,
                {
                  variant: 'contained',
                  color: 'primary',
                  onClick: this.handleNext,
                  className: classes.button
                },
                'Next'
              )
            )
          )
        )
      );
    }
  }]);
  return StepperNonLinearWithoutAction;
}(_react2.default.Component);

StepperNonLinearWithoutAction.propTypes = {
  classes: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(StepperNonLinearWithoutAction);