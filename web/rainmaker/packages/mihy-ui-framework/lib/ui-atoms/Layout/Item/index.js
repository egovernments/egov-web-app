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

var _Grid = require('@material-ui/core/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Conatainer = function Conatainer(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ['children']);

  return _react2.default.createElement(
    _Grid2.default,
    (0, _extends3.default)({ item: true }, rest),
    children
  );
};

Conatainer.propTypes = {
  children: _propTypes2.default.any
};

exports.default = Conatainer;