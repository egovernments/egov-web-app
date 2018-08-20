"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _BreadCrumbsForm = require("./components/BreadCrumbsForm");

var _BreadCrumbsForm2 = _interopRequireDefault(_BreadCrumbsForm);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WizardComponent = function WizardComponent(_ref) {
  var content = _ref.content,
      onTabClick = _ref.onTabClick,
      selected = _ref.selected,
      formValidIndexArray = _ref.formValidIndexArray,
      updateIndex = _ref.updateIndex,
      backLabel = _ref.backLabel,
      nextLabel = _ref.nextLabel;

  return _react2.default.createElement(
    "div",
    { className: "wizard-cont" },
    _react2.default.createElement(_BreadCrumbsForm2.default, { onTabClick: onTabClick, selected: selected, formValidIndexArray: formValidIndexArray }),
    _react2.default.createElement(
      "div",
      { className: "wizard-content clearfix" },
      content
    ),
    _react2.default.createElement(
      "div",
      { className: "wizard-footer col-xs-12", style: { textAlign: "right" } },
      _react2.default.createElement(
        "div",
        { className: "col-xs-6", style: { float: "right" } },
        _react2.default.createElement(_components.Button, {
          label: backLabel,
          onClick: function onClick() {
            updateIndex(selected - 1);
          },
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
          buttonStyle: { border: "1px solid #fe7a51" },
          style: { marginRight: 45, width: "36%" }
        }),
        _react2.default.createElement(_components.Button, {
          label: nextLabel,
          style: { width: "36%" },
          backgroundColor: "#fe7a51",
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
          buttonStyle: { border: 0 },
          onClick: function onClick() {
            updateIndex(selected + 1);
          }
        })
      )
    )
  );
};

exports.default = WizardComponent;