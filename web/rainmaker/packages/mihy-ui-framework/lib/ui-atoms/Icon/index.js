"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyIcon = function MihyIcon(props) {
  var iconName = props.iconName,
      color = props.color;

  return _react2.default.createElement(
    _Icon2.default,
    { color: color },
    iconName
  );
};

MihyIcon.propTypes = {
  iconName: _propTypes2.default.string
};

exports.default = MihyIcon;