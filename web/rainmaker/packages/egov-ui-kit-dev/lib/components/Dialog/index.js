"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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
      modal = _ref.modal,
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
      _ref$repositionOnUpda = _ref.repositionOnUpdate,
      repositionOnUpdate = _ref$repositionOnUpda === undefined ? false : _ref$repositionOnUpda,
      autoScrollBodyContent = _ref.autoScrollBodyContent,
      handleClose = _ref.handleClose,
      style = _ref.style,
      isClose = _ref.isClose,
      onRequestClose = _ref.onRequestClose;

  return _react2.default.createElement(_Dialog2.default, {
    title: title,
    actions: actions,
    titleStyle: (0, _extends3.default)({}, defaultTitleStyle, titleStyle),
    children: [isClose && _react2.default.createElement(
      "div",
      { className: "dialog-close-button", key: "dialog-close-button" },
      _react2.default.createElement(_Icon2.default, { action: "navigation", name: "close", color: "#484848", style: closebuttonStyle, onClick: handleClose })
    )].concat((0, _toConsumableArray3.default)(children)),
    autoScrollBodyContent: autoScrollBodyContent,
    overlayStyle: (0, _extends3.default)({}, defaultOverlayStyle, overlayStyle),
    actionsContainerStyle: (0, _extends3.default)({}, defaultActionsContainerStyle, actionsContainerStyle),
    contentStyle: (0, _extends3.default)({}, defaultContentStyle, contentStyle),
    bodyStyle: (0, _extends3.default)({}, defaultBodyStyle, bodyStyle),
    open: open,
    autoDetectWindowHeight: false,
    style: (0, _extends3.default)({
      paddingTop: "0 !important"
    }, style),
    repositionOnUpdate: repositionOnUpdate,
    modal: modal,
    onRequestClose: onRequestClose
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