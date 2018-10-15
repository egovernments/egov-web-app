'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CardMedia = require('@material-ui/core/CardMedia');

var _CardMedia2 = _interopRequireDefault(_CardMedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SimpleCardMedia = function SimpleCardMedia(props) {
  var rest = (0, _objectWithoutProperties3.default)(props, []);

  return _react2.default.createElement(_CardMedia2.default, rest);
};

// SimpleCardMedia.propTypes = {
//
// };

// import PropTypes from 'prop-types';
exports.default = SimpleCardMedia;