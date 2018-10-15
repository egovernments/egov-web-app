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

var _Card = require('@material-ui/core/Card');

var _Card2 = _interopRequireDefault(_Card);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleCard = function SimpleCard(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['children']);

  return _react2.default.createElement(
    _Card2.default,
    (0, _extends3.default)({ classes: {
        root: "mihy-card"
      } }, rest),
    children
  );
};

SimpleCard.propTypes = {
  children: _propTypes2.default.any
};

exports.default = SimpleCard;