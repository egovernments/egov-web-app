"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _RadioButton = require("material-ui/RadioButton");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioButtonUi = function RadioButtonUi(_ref) {
  var options = _ref.options,
      valueSelected = _ref.valueSelected,
      className = _ref.className,
      name = _ref.name,
      defaultValue = _ref.defaultValue,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      _ref$radioButtonItemS = _ref.radioButtonItemStyle,
      radioButtonItemStyle = _ref$radioButtonItemS === undefined ? {} : _ref$radioButtonItemS,
      _ref$labelItemStyle = _ref.labelItemStyle,
      labelItemStyle = _ref$labelItemStyle === undefined ? {} : _ref$labelItemStyle,
      _ref$labelStyle = _ref.labelStyle,
      labelStyle = _ref$labelStyle === undefined ? {} : _ref$labelStyle,
      _ref$selectedStyle = _ref.selectedStyle,
      selectedStyle = _ref$selectedStyle === undefined ? {} : _ref$selectedStyle,
      handleChange = _ref.handleChange,
      checkedIcon = _ref.checkedIcon,
      iconStyle = _ref.iconStyle,
      selectedLabelStyle = _ref.selectedLabelStyle,
      id = _ref.id;

  var renderRadioButtons = function renderRadioButtons() {
    return options.map(function (option, index) {
      var value = option.value,
          label = option.label;

      return _react2.default.createElement(_RadioButton.RadioButton, {
        key: index,
        id: id + "-" + index,
        style: value === valueSelected ? (0, _extends3.default)({}, radioButtonItemStyle, selectedStyle) : radioButtonItemStyle,
        value: value,
        label: label,
        labelStyle: value === valueSelected ? (0, _extends3.default)({}, labelStyle, selectedLabelStyle) : labelStyle,
        iconStyle: iconStyle,
        checkedIcon: checkedIcon
      });
    });
  };

  return _react2.default.createElement(
    _RadioButton.RadioButtonGroup,
    {
      valueSelected: valueSelected,
      name: name,
      className: className + " RadioComp",
      onChange: handleChange,
      defaultSelected: defaultValue,
      style: style
    },
    renderRadioButtons()
  );
};

exports.default = RadioButtonUi;