"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = function CheckboxGroup(_ref) {
  var selected = _ref.selected,
      onCheck = _ref.onCheck,
      labelColor = _ref.labelColor;

  var checkboxOptions = [{ value: "Services", label: "CS_FEEDBACK_SERVICES" }, { value: "Resolution Time", label: "CS_FEEDBACK_RESOLUTION_TIME" }, { value: "Quality of work", label: "CS_FEEDBACK_QUALITY_OF_WORK" }, { value: "Others", label: "CS_FEEDBACK_OTHERS" }];
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(_translationNode2.default, { className: "what-was-good", label: "CS_FEEDBACK_WHAT_WAS_GOOD" }),
    _react2.default.createElement(_components.Checkbox, {
      labelStyle: { letterSpacing: "0.6px" },
      options: checkboxOptions,
      containerClassName: "feedback-checkbox-cont",
      selected: selected,
      iconStyle: { fill: "rgb(95, 92, 98)" },
      onCheck: onCheck,
      id: "feedback-checkbox"
    })
  );
};

exports.default = CheckboxGroup;