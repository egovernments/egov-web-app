"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var action = _ref.action,
      className = _ref.className,
      name = _ref.name,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      color = _ref.color,
      onClick = _ref.onClick,
      id = _ref.id;

  var error = "";
  try {
    var WrappedIcon = null;

    if (action === "custom") {
      WrappedIcon = require("egov-ui-kit/custom-icons/" + name).default;
    } else {
      WrappedIcon = require("material-ui/svg-icons/" + action + "/" + name).default;
    }
    return _react2.default.createElement(WrappedIcon, { id: id, className: className, style: (0, _extends3.default)({}, style), color: color, onClick: onClick });
  } catch (error) {}
  throw new Error("Icon with action " + action + " and name " + name + " not found");
};

Icon.propTypes = {
  className: _propTypes2.default.string,
  action: _propTypes2.default.string,
  name: _propTypes2.default.string,
  color: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};

exports.default = Icon;