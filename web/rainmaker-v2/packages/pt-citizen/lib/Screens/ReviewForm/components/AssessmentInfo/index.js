"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssessmentInfo = function AssessmentInfo(_ref) {
  var icon = _ref.icon,
      editIcon = _ref.editIcon,
      component = _ref.component;

  return _react2.default.createElement(_components.Card, {
    textChildren: _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(
        "div",
        { className: "pt-rf-title" },
        _react2.default.createElement(
          "span",
          { className: "pt-rf-icon" },
          icon
        ),
        _react2.default.createElement(
          "span",
          { className: "pt-rf-title-text" },
          "Assessment Info"
        ),
        _react2.default.createElement(
          "span",
          { className: "pt-rf-edit-icon" },
          editIcon
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "pt-review-form col-xs-12" },
        component
      )
    )
  });
};

exports.default = AssessmentInfo;