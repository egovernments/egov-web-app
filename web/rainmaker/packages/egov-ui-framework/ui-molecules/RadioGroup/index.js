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

var _Radio = require("@material-ui/core/Radio");

var _Radio2 = _interopRequireDefault(_Radio);

var _RadioGroup = require("@material-ui/core/RadioGroup");

var _RadioGroup2 = _interopRequireDefault(_RadioGroup);

var _FormControlLabel = require("@material-ui/core/FormControlLabel");

var _FormControlLabel2 = _interopRequireDefault(_FormControlLabel);

var _FormControl = require("@material-ui/core/FormControl");

var _FormControl2 = _interopRequireDefault(_FormControl);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      display: "flex"
    },
    formControl: {
      marginTop: 0,
      paddingBottom: 0
    },
    group: {
      display: "inline-block",
      margin: 0
    },
    radioRoot: {
      marginBottom: 0
    }
  };
};

var RadioButtonsGroup = function (_React$Component) {
  (0, _inherits3.default)(RadioButtonsGroup, _React$Component);

  function RadioButtonsGroup() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RadioButtonsGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RadioButtonsGroup.__proto__ || Object.getPrototypeOf(RadioButtonsGroup)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: "No"
    }, _this.handleChange = function (event) {
      _this.setState({ value: event.target.value }, function () {
        approveCheck(jsonPath, _this.state.value);
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RadioButtonsGroup, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          buttons = _props.buttons;


      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(
          _FormControl2.default,
          { component: "fieldset", className: classes.formControl },
          _react2.default.createElement(
            _RadioGroup2.default,
            {
              "aria-label": "Gender",
              name: "gender1",
              className: classes.group,
              value: this.state.value,
              onChange: this.handleChange
            },
            buttons && buttons.map(function (button, index) {
              return _react2.default.createElement(_FormControlLabel2.default, {
                key: index,
                classes: { label: "radio-button-label" },
                value: button,
                control: _react2.default.createElement(_Radio2.default, {
                  classes: {
                    root: "radio-root"
                  },
                  color: "primary"
                }),
                label: button
              });
            })
          )
        )
      );
    }
  }]);
  return RadioButtonsGroup;
}(_react2.default.Component);

RadioButtonsGroup.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(RadioButtonsGroup);