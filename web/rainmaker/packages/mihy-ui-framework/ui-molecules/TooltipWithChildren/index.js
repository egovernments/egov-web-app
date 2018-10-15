"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Icon = require("../../ui-atoms/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    divContianer: {
      display: "flex"
    }
  };
};

function SimpleTooltips(props) {
  var classes = props.classes,
      children = props.children,
      toolTipProps = props.toolTipProps;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _Tooltip2.default,
      toolTipProps,
      _react2.default.createElement(
        "div",
        { className: classes.divContianer },
        children,
        _react2.default.createElement(_Icon2.default, { iconName: "info" })
      )
    )
  );
}

SimpleTooltips.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(SimpleTooltips);