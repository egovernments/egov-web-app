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

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyTypegraphy = function MihyTypegraphy(props) {
  var children = props.children,
      variant = props.variant,
      color = props.color,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'variant', 'color']);

  return _react2.default.createElement(
    _Typography2.default,
    (0, _extends3.default)({ variant: variant, color: color }, rest),
    children
  );
};

MihyTypegraphy.propTypes = {
  variant: _propTypes2.default.string,
  color: _propTypes2.default.string
};

MihyTypegraphy.defaultProps = {
  variant: "title",
  color: "inherit"
};

exports.default = MihyTypegraphy;