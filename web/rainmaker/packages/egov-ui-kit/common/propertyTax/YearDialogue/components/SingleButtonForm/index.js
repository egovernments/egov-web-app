"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleButtonForm = function SingleButtonForm(_ref) {
  var label = _ref.label,
      form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      history = _ref.history,
      resetFormWizard = _ref.resetFormWizard,
      urlToAppend = _ref.urlToAppend;

  var fields = form.fields || {};
  return _react2.default.createElement(_components.Button, (0, _extends3.default)({}, fields.button, {
    onClick: function onClick() {
      localStorage.setItem("draftId", "");
      handleFieldChange("button", label);
      resetFormWizard();
      history && urlToAppend ? history.push(urlToAppend + "&FY=" + label) : history.push("/property-tax/assessment-form?FY=" + label + "&type=new");
    },
    className: "year-range-button",
    label: label,
    labelColor: "#00bbd3",
    buttonStyle: { borderRadius: "50px", border: "1px solid #00bbd3" }
  }));
};

exports.default = SingleButtonForm;