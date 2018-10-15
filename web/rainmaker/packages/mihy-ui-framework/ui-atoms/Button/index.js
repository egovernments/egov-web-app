'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyButton = function MihyButton(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['children']);

  return _react2.default.createElement(
    _Button2.default,
    rest,
    children
  );
};

MihyButton.propTypes = {
  children: _propTypes2.default.any
};

exports.default = MihyButton;