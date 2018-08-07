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

var _Info = require("@material-ui/icons/Info");

var _Info2 = _interopRequireDefault(_Info);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

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
    { id: id, title: _react2.default.createElement(_translationNode2.default, { label: title, color: "#fff", fontSize: "12px" }), placement: placement || "right", PopperProps: PopperProps },
    _react2.default.createElement(
      _Icon2.default,
      { color: "disabled", style: { fontSize: 50 } },
      _react2.default.createElement(_Info2.default, null)
    )
  );
};

ToolTipUi.propTypes = {
  title: _propTypes2.default.string,
  placement: _propTypes2.default.string
};

exports.default = ToolTipUi;