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

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactSelect = require("react-select");

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _TextField = require("@material-ui/core/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require("@material-ui/core/Paper");

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuItem = require("@material-ui/core/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Chip = require("@material-ui/core/Chip");

var _Chip2 = _interopRequireDefault(_Chip);

var _Cancel = require("@material-ui/icons/Cancel");

var _Cancel2 = _interopRequireDefault(_Cancel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSuggestions = function getSuggestions(suggestions) {
  return suggestions && suggestions.length > 0 && suggestions.map(function (suggestion) {
    return {
      value: suggestion.code,
      label: suggestion.name
    };
  });
};

var styles = function styles(theme) {
  return {
    ac_root: {
      flexGrow: 1,
      height: 250
    },
    ac_input: {
      display: "flex",
      padding: 0
    },
    ac_valueContainer: {
      display: "flex",
      // flexWrap: "wrap",
      flex: 1,
      alignItems: "center"
    },
    ac_noOptionsMessage: {
      padding: theme.spacing.unit + "px " + theme.spacing.unit * 2 + "px"
    },
    ac_singleValue: {
      fontSize: 16,
      marginBottom: 2
    },
    ac_placeholder: {
      position: "absolute",
      left: 2,
      fontSize: 16,
      color: "rgba(162, 162, 162, 0.77)"
    },
    ac_paper: {
      position: "absolute",
      zIndex: 1105,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    ac_divider: {
      height: theme.spacing.unit * 2
    }
  };
};

function NoOptionsMessage(props) {
  return _react2.default.createElement(
    _Typography2.default,
    (0, _extends3.default)({
      color: "textSecondary",
      className: props.selectProps.classes.ac_noOptionsMessage
    }, props.innerProps),
    props.children
  );
}

function inputComponent(_ref) {
  var inputRef = _ref.inputRef,
      props = (0, _objectWithoutProperties3.default)(_ref, ["inputRef"]);

  return _react2.default.createElement("div", (0, _extends3.default)({ ref: inputRef }, props));
}

function Control(props) {
  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
    fullWidth: true,
    InputProps: {
      inputComponent: inputComponent,
      inputProps: (0, _extends3.default)({
        className: props.selectProps.classes.ac_input,
        inputRef: props.innerRef,
        children: props.children
      }, props.innerProps)
    }
  }, props.selectProps.textFieldProps, {
    helperText: props.selectProps.helperText,
    error: props.selectProps.error
  }));
}

function Option(props) {
  return _react2.default.createElement(
    _MenuItem2.default,
    (0, _extends3.default)({
      buttonRef: props.innerRef,
      selected: props.isFocused,
      component: "div",
      style: {
        fontWeight: props.isSelected ? 500 : 400
      }
    }, props.innerProps),
    props.children
  );
}

function Placeholder(props) {
  return _react2.default.createElement(
    _Typography2.default,
    (0, _extends3.default)({
      color: "textSecondary",
      className: props.selectProps.classes.ac_placeholder
    }, props.innerProps),
    props.children
  );
}

function SingleValue(props) {
  return _react2.default.createElement(
    _Typography2.default,
    (0, _extends3.default)({
      className: props.selectProps.classes.ac_singleValue
    }, props.innerProps),
    props.children
  );
}

function ValueContainer(props) {
  return _react2.default.createElement(
    "div",
    { className: props.selectProps.classes.ac_valueContainer },
    props.children
  );
}

function MultiValue(props) {
  return _react2.default.createElement(_Chip2.default, {
    tabIndex: -1,
    label: props.children,
    className: (0, _classnames2.default)(props.selectProps.classes.chip, (0, _defineProperty3.default)({}, props.selectProps.classes.chipFocused, props.isFocused)),
    onDelete: props.removeProps.onClick,
    deleteIcon: _react2.default.createElement(_Cancel2.default, props.removeProps)
  });
}

function Menu(props) {
  return _react2.default.createElement(
    _Paper2.default,
    (0, _extends3.default)({
      square: true,
      className: props.selectProps.classes.ac_paper
    }, props.innerProps, {
      style: { overflowX: "scroll" }
    }),
    _react2.default.createElement(
      "div",
      { style: { width: 800 } },
      props.children
    )
  );
}

var components = {
  Control: Control,
  Menu: Menu,
  MultiValue: MultiValue,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var IntegrationReactSelect = function (_React$Component) {
  (0, _inherits3.default)(IntegrationReactSelect, _React$Component);

  function IntegrationReactSelect() {
    var _ref2;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, IntegrationReactSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = IntegrationReactSelect.__proto__ || Object.getPrototypeOf(IntegrationReactSelect)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      single: null,
      multi: null
    }, _this.componentDidMount = function () {
      var fieldValue = _this.props.fieldValue;

      if (fieldValue && fieldValue.code) {
        _this.setState({ single: fieldValue, multi: fieldValue });
      }
    }, _this.handleChange = function (name) {
      return function (value) {
        _this.setState((0, _defineProperty3.default)({}, name, value));
        _this.props.onSelect(value);
      };
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(IntegrationReactSelect, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          theme = _props.theme,
          suggestions = _props.suggestions,
          label = _props.label,
          placeholder = _props.placeholder,
          _props$fullwidth = _props.fullwidth,
          fullwidth = _props$fullwidth === undefined ? true : _props$fullwidth,
          _props$required = _props.required,
          required = _props$required === undefined ? true : _props$required,
          value = _props.value,
          _props$inputLabelProp = _props.inputLabelProps,
          inputLabelProps = _props$inputLabelProp === undefined ? {
        shrink: true
      } : _props$inputLabelProp,
          rest = (0, _objectWithoutProperties3.default)(_props, ["classes", "theme", "suggestions", "label", "placeholder", "fullwidth", "required", "value", "inputLabelProps"]);

      var selectStyles = {
        input: function input(base) {
          return (0, _extends3.default)({}, base, {
            color: theme.palette.text.primary,
            "& input": {
              font: "inherit"
            }
          });
        }
      };
      return _react2.default.createElement(
        "div",
        { className: classes.root },
        _react2.default.createElement(_reactSelect2.default, (0, _extends3.default)({
          classes: classes,
          styles: selectStyles,
          textFieldProps: {
            label: label,
            InputLabelProps: inputLabelProps,
            required: required,
            fullWidth: fullwidth
          },
          options: getSuggestions(suggestions) || [],
          components: components,
          value: value ? value : this.state.multi,
          placeholder: placeholder
        }, rest, {
          onChange: this.handleChange("multi")
        }))
      );
    }
  }]);
  return IntegrationReactSelect;
}(_react2.default.Component);

IntegrationReactSelect.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  theme: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles, { withTheme: true })(IntegrationReactSelect);