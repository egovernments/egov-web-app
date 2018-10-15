"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Stepper = require("@material-ui/core/Stepper");

var _Stepper2 = _interopRequireDefault(_Stepper);

var _Step = require("@material-ui/core/Step");

var _Step2 = _interopRequireDefault(_Step);

var _StepLabel = require("@material-ui/core/StepLabel");

var _StepLabel2 = _interopRequireDefault(_StepLabel);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _StepContent = require("@material-ui/core/StepContent");

var _StepContent2 = _interopRequireDefault(_StepContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      width: "100%"
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    iconConatiner: {
      boxShadow: "0 4px 20px 0px rgba(0, 0, 0, 0.14)",
      color: "#FFFFFF",
      width: "50px",
      height: "50px",
      marginLeft: "-12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%  "
    },
    stepContentContainer: {
      padding: "16px 16px 16px 32px",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14) ",
      borderRadius: "6px",
      marginLeft: "8px",
      marginTop: "8px",
      color: "#3C4858",
      fontWeight: 300,
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      lineHeight: "1.35417em",
      background: "#eee"
    },
    stepConnector: {
      width: "3px",
      bottom: 0,
      content: " ",
      backgroundColor: "#E5E5E5"
    },
    stepLabel: {
      borderRadius: "12px",
      color: "white",
      padding: "5px 12px",
      display: "inline - block",
      textTransform: "uppercase",
      fontSize: "10px"
    }
  };
};

var VerticalLinearStepper = function (_React$Component) {
  (0, _inherits3.default)(VerticalLinearStepper, _React$Component);

  function VerticalLinearStepper() {
    (0, _classCallCheck3.default)(this, VerticalLinearStepper);
    return (0, _possibleConstructorReturn3.default)(this, (VerticalLinearStepper.__proto__ || Object.getPrototypeOf(VerticalLinearStepper)).apply(this, arguments));
  }

  (0, _createClass3.default)(VerticalLinearStepper, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          steps = _props.steps;


      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _Stepper2.default,
          { orientation: "vertical", style: { background: "inherit" } },
          steps.map(function (step, index) {
            return _react2.default.createElement(
              _Step2.default,
              { key: index, active: true },
              _react2.default.createElement(
                _StepLabel2.default,
                {
                  icon: _react2.default.createElement(
                    "div",
                    {
                      className: classes.iconConatiner,
                      style: {
                        background: "linear-gradient(60deg," + step.iconColorOne + " ," + step.iconColorTwo + " )"
                      }
                    },
                    _react2.default.createElement(
                      _Icon2.default,
                      null,
                      step.iconName
                    )
                  )
                },
                _react2.default.createElement(
                  "span",
                  {
                    style: {
                      background: "linear-gradient(60deg," + step.iconColorOne + " ," + step.iconColorTwo + " )"
                    },
                    className: classes.stepLabel
                  },
                  step.displayLabel
                )
              ),
              _react2.default.createElement(
                _StepContent2.default,
                null,
                _react2.default.createElement(
                  "ul",
                  { className: classes.stepContentContainer },
                  step.displaySubLabel.map(function (list, labelKey) {
                    return _react2.default.createElement(
                      "li",
                      { key: labelKey },
                      list
                    );
                  })
                )
              )
            );
          })
        )
      );
    }
  }]);
  return VerticalLinearStepper;
}(_react2.default.Component);

VerticalLinearStepper.propTypes = {
  classes: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(VerticalLinearStepper);