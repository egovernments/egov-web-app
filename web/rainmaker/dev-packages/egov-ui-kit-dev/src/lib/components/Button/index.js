"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RaisedButton = require("material-ui/RaisedButton");

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
  var _ref$label = _ref.label,
      label = _ref$label === undefined ? "Continue" : _ref$label,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["label"]);

  return _react2.default.createElement(_RaisedButton2.default, (0, _extends3.default)({ label: label }, rest));
};

Button.propTypes = {
  onClick: _propTypes2.default.func,
  primary: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]),
  style: _propTypes2.default.object
};

exports.default = Button;