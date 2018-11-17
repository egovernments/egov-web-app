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

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyIcon = function MihyIcon(props) {
  var iconName = props.iconName,
      color = props.color,
      _props$size = props.size,
      size = _props$size === undefined ? "24px" : _props$size,
      rest = (0, _objectWithoutProperties3.default)(props, ["iconName", "color", "size"]);

  return _react2.default.createElement(
    _Icon2.default,
    (0, _extends3.default)({ color: color, style: { fontSize: size } }, rest),
    iconName
  );
};

MihyIcon.propTypes = {
  iconName: _propTypes2.default.string
};

exports.default = MihyIcon;