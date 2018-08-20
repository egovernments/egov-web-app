"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintCreated = function ComplaintCreated(props) {
  return _react2.default.createElement(_common.ComplaintSubmited, (0, _extends3.default)({
    homeRoute: "/",
    lastLabel: _react2.default.createElement(_translationNode2.default, { id: "complaint-submitted-success-message", label: "CS_COMPLAINT_SUBMITTED_LABEL2" })
  }, props));
};

exports.default = ComplaintCreated;