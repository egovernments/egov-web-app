"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  logoutContentStyle: { textAlign: "center", padding: "24px 20px" }
};

var LogoutDialog = function LogoutDialog(_ref) {
  var closeSortDialog = _ref.closeSortDialog,
      sortPopOpen = _ref.sortPopOpen;

  var actions = [_react2.default.createElement(_components.Button, {
    id: "logout-no-button",
    className: "logout-no-button",
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_LOGOUTPOPUP_CANCEL", color: "#FE7A51" }),
    backgroundColor: "#fff",
    style: { boxShadow: "none" }
  }), _react2.default.createElement(_components.Button, {
    id: "logout-yes-button",
    className: "logout-yes-button",
    label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "OK", color: "#FE7A51" }),
    backgroundColor: "#fff",
    style: { boxShadow: "none" }
  })];
  return _react2.default.createElement(_components.Dialog, {
    open: sortPopOpen,
    title: _react2.default.createElement(_translationNode2.default, {
      label: "Sort By",
      bold: true,
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontSize: "20px",
      labelStyle: { padding: "16px 0px 0px 24px" }
    }),
    children: [_react2.default.createElement(_translationNode2.default, { label: "CORE_LOGOUTPOPUP_CONFIRM", color: "rgba(0, 0, 0, 0.6000000238418579)", labelStyle: { padding: "16px 0px 0px 12px" } })],
    handleClose: closeSortDialog,
    actions: actions,
    contentClassName: "logout-popup",
    contentStyle: { width: "90%" },
    isClose: true
  });
};

exports.default = LogoutDialog;