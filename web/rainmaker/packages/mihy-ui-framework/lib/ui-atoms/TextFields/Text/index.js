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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('@material-ui/core/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyText = function MihyText(props) {
  var id = props.id,
      value = props.value,
      label = props.label,
      fullWidth = props.fullWidth,
      rest = (0, _objectWithoutProperties3.default)(props, ['id', 'value', 'label', 'fullWidth']);


  return _react2.default.createElement(_TextField2.default, (0, _extends3.default)({
    id: id,
    label: label,
    value: value,
    fullWidth: true
  }, rest));
};

MihyText.propTypes = {
  id: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.string
};

MihyText.defaultProps = {
  fullWidth: true
};

exports.default = MihyText;