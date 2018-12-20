"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonMenuItems = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonMenuItems = exports.CommonMenuItems = [{
  primaryText: _react2.default.createElement(_translationNode2.default, { label: "CS_HOME_HEADER_PROFILE" }),
  route: "/user/profile",
  leftIcon: _react2.default.createElement(_components.Icon, { action: "social", name: "person", className: "iconClassHover material-icons whiteColor customMenuItem" }),
  style: {
    paddingBottom: "3px",
    paddingTop: "3px"
  },
  id: "header-profile",
  path: "userprofile",
  renderforcsr: 1,
  renderforadmin: 1,
  renderforPGREmp: 1
}, {
  primaryText: _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_LOGOUT" }),
  route: "/logout",
  leftIcon: _react2.default.createElement(_components.Icon, { action: "action", name: "power-settings-new", className: "iconClassHover material-icons whiteColor customMenuItem" }),
  style: {
    borderBottom: "none",
    borderLeft: "red"
  },
  id: "header-logout",
  path: "logout",
  renderforcsr: 1,
  renderforadmin: 1,
  renderforPGREmp: 1
}];