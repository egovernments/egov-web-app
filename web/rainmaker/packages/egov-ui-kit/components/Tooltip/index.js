"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _info = require("egov-ui-kit/assets/info.svg");

var _info2 = _interopRequireDefault(_info);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
  backgroundColor: "transparent"
};

var PopperProps = {
  className: "tooltip-popper",
  fontSize: 48,
  style: {
    color: "#ffffff"
  }
};

var ToolTipUi = function ToolTipUi(_ref) {
  var placement = _ref.placement,
      show = _ref.show,
      title = _ref.title,
      id = _ref.id;

  return _react2.default.createElement(
    _Tooltip2.default,
    { id: id, title: title, placement: placement || "right", PopperProps: PopperProps },
    _react2.default.createElement(
      _Icon2.default,
      { action: "action", name: "info", style: { fontSize: 22 }, color: "#ffffff" },
      _react2.default.createElement("img", { src: _info2.default })
    )
  );
};

ToolTipUi.propTypes = {
  title: _propTypes2.default.string,
  placement: _propTypes2.default.string
};

exports.default = ToolTipUi;