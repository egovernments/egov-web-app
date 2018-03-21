"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Dialog = require("material-ui/Dialog");

var _Dialog2 = _interopRequireDefault(_Dialog);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultOverlayStyle = {};
var defaultTitleStyle = {
  textAlign: "center",
  background: "#fff",
  color: "#484848",
  fontSize: "16px"
};
var defaultActionsContainerStyle = {
  padding: "14px"
};
var defaultContentStyle = {};

var defaultBodyStyle = {
  padding: "0 12px"
};

var closebuttonStyle = {
  width: "25px",
  height: "25px",
  padding: "3px"
};

var DialogUI = function DialogUI(_ref) {
  var title = _ref.title,
      titleStyle = _ref.titleStyle,
      overlayStyle = _ref.overlayStyle,
      _ref$actionsContainer = _ref.actionsContainerStyle,
      actionsContainerStyle = _ref$actionsContainer === undefined ? {} : _ref$actionsContainer,
      _ref$bodyStyle = _ref.bodyStyle,
      bodyStyle = _ref$bodyStyle === undefined ? {} : _ref$bodyStyle,
      children = _ref.children,
      actions = _ref.actions,
      _ref$contentStyle = _ref.contentStyle,
      contentStyle = _ref$contentStyle === undefined ? {} : _ref$contentStyle,
      open = _ref.open,
      _ref$autoScrollBodyCo = _ref.autoScrollBodyContent,
      autoScrollBodyContent = _ref$autoScrollBodyCo === undefined ? false : _ref$autoScrollBodyCo,
      handleClose = _ref.handleClose;

  return _react2.default.createElement(_Dialog2.default, {
    title: title,
    actions: actions,
    titleStyle: _extends({}, defaultTitleStyle, titleStyle),
    children: [_react2.default.createElement(
      "div",
      { className: "dialog-close-button", key: "dialog-close-button" },
      _react2.default.createElement(_Icon2.default, { action: "navigation", name: "close", color: "#484848", style: closebuttonStyle, onClick: handleClose })
    )].concat(_toConsumableArray(children)),
    autoScrollBodyContent: autoScrollBodyContent,
    overlayStyle: _extends({}, defaultOverlayStyle, overlayStyle),
    actionsContainerStyle: _extends({}, defaultActionsContainerStyle, actionsContainerStyle),
    contentStyle: _extends({}, defaultContentStyle, contentStyle),
    bodyStyle: _extends({}, defaultBodyStyle, bodyStyle),
    open: open,
    autoDetectWindowHeight: false,
    style: {
      paddingTop: "0 !important"
    }
  });
};

DialogUI.propTypes = {
  actions: _propTypes2.default.arrayOf(_propTypes2.default.node),
  title: _propTypes2.default.string,
  handleClose: _propTypes2.default.func,
  overlayStyle: _propTypes2.default.object,
  actionsContainerStyle: _propTypes2.default.object,
  autoScrollBodyContent: _propTypes2.default.bool,
  titleStyle: _propTypes2.default.object,
  contentStyle: _propTypes2.default.object,
  bodyStyle: _propTypes2.default.object,
  open: _propTypes2.default.bool.isRequired
};

exports.default = DialogUI;