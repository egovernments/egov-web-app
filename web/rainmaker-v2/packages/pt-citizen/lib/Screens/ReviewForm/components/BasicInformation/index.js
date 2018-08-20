"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasicInformation = function BasicInformation(_ref) {
  var form = _ref.form,
      icon = _ref.icon,
      editIcon = _ref.editIcon;

  var fields = form.fields || {};
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
          "Basic Information"
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
        Object.keys(fields).map(function (fieldKey, index) {
          var field = (0, _extends3.default)({}, fields[fieldKey]);
          field.disabled = true;
          return _react2.default.createElement(
            "div",
            { key: index, className: "col-xs-6" },
            _react2.default.createElement(
              "div",
              { className: "pt-review-form-field" },
              _react2.default.createElement(_field2.default, { fieldKey: fieldKey, field: field })
            )
          );
        })
      )
    )
  });
};

exports.default = BasicInformation;