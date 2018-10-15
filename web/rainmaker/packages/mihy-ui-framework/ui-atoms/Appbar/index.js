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

var _AppBar = require('@material-ui/core/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyAppbar = function MihyAppbar(props) {
  var children = props.children,
      position = props.position,
      rest = (0, _objectWithoutProperties3.default)(props, ['children', 'position']);

  return _react2.default.createElement(
    _AppBar2.default,
    (0, _extends3.default)({ position: position }, rest),
    children ? children : null
  );
};

MihyAppbar.propTypes = {
  position: _propTypes2.default.string.isRequired
};

MihyAppbar.defaultProps = {
  position: "static"
};

exports.default = MihyAppbar;