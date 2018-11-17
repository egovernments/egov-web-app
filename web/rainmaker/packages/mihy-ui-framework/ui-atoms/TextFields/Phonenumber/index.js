'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTextMask = require('react-text-mask');

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _InputAdornment = require('@material-ui/core/InputAdornment');

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

var _Icon = require('../../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextMaskCustom(props) {
  var inputRef = props.inputRef,
      other = (0, _objectWithoutProperties3.default)(props, ['inputRef']);


  return _react2.default.createElement(_reactTextMask2.default, (0, _extends3.default)({}, other, {
    ref: inputRef,
    mask: ['(', '+', '9', '1', ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    placeholderChar: '\u2000',
    showMask: true
  }));
}

TextMaskCustom.propTypes = {
  inputRef: _propTypes2.default.func.isRequired
};

var Phonenumber = function Phonenumber(props) {
  var id = props.id,
      textmask = props.textmask,
      label = props.label,
      fullWidth = props.fullWidth,
      rest = (0, _objectWithoutProperties3.default)(props, ['id', 'textmask', 'label', 'fullWidth']);

  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
    label: label,
    value: textmask,
    id: id,
    fullWidth: fullWidth,
    InputProps: {
      inputComponent: TextMaskCustom,
      startAdornment: _react2.default.createElement(
        _InputAdornment2.default,
        { position: 'start' },
        _react2.default.createElement(_Icon2.default, { iconName: 'stay_current_portrait' })
      )
    }

  }, rest));
};

Phonenumber.propTypes = {
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  textmask: _propTypes2.default.string.isRequired
};

Phonenumber.defaultProps = {
  fullWidth: true
};

exports.default = Phonenumber;