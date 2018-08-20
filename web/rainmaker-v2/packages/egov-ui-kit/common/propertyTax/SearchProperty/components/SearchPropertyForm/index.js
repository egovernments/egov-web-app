"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _Button = require("egov-ui-kit/components/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Card = require("egov-ui-kit/components/Card");

var _Card2 = _interopRequireDefault(_Card);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchPropertyForm = function SearchPropertyForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      formKey = _ref.formKey,
      onSearchClick = _ref.onSearchClick;

  var fields = form.fields || {};

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_Card2.default, {
      textChildren: _react2.default.createElement(
        "div",
        { className: formKey + " col-xs-12" },
        Object.keys(fields).map(function (fieldKey, index) {
          return _react2.default.createElement(
            "div",
            {
              style: fields[fieldKey].toolTip ? { display: "flex", alignItems: "center" } : {},
              key: index,
              className: fields[fieldKey].numcols ? "col-xs-" + fields[fieldKey].numcols : "col-xs-6"
            },
            _react2.default.createElement(_field2.default, { fieldKey: fieldKey, field: fields[fieldKey], handleFieldChange: handleFieldChange })
          );
        }),
        _react2.default.createElement(
          "div",
          { className: "text-center" },
          _react2.default.createElement(_Button2.default, { label: "SEARCH", className: "search-property-btn", onClick: function onClick() {
              return onSearchClick(form, formKey);
            }, primary: true, fullWidth: true })
        )
      )
    })
  );
};

exports.default = SearchPropertyForm;