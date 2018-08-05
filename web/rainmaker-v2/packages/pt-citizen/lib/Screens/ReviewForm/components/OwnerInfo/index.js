"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OwnerInfo = function OwnerInfo(_ref) {
  var form = _ref.form,
      icon = _ref.icon,
      editIcon = _ref.editIcon,
      component = _ref.component;

  // const fields = form.fields || {};
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
          "Owner Information"
        ),
        _react2.default.createElement(
          "span",
          { className: "pt-rf-edit-icon" },
          editIcon
        )
      ),
      component
    )
  });
};

exports.default = OwnerInfo;