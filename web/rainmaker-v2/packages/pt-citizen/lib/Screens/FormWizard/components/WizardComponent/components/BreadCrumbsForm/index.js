"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkIconStyle = {
  width: 14,
  height: 14
};

var tabs = [{
  heading: "Property Address",
  // icon: {
  //   name: "home",
  //   action: "action",
  // },
  formValid: true
}, {
  heading: "Assessment Information",
  // icon: {
  //   name: "assignment",
  //   action: "action",
  // },
  formValid: false
}, {
  heading: "Owner Information",
  // icon: {
  //   name: "person",
  //   action: "social",
  // },
  formValid: false
}, {
  heading: "Review & Pay",
  // icon: {
  //   name: "attach-money",
  //   action: "editor",
  // },
  formValid: false
}];

var selectedTabStyle = {
  background: "#fe7a51"
};

var defaultTabStyle = {
  background: "#b3b3b3"
};

var formValidStyle = {
  background: "#3d4951"
};

var BreadCrumbsForm = function BreadCrumbsForm(_ref) {
  var onTabClick = _ref.onTabClick,
      selected = _ref.selected,
      formValidIndexArray = _ref.formValidIndexArray;

  return _react2.default.createElement(
    "div",
    { className: "breadcrumb-form flat" },
    tabs.map(function (tab, index) {
      return _react2.default.createElement(
        "a",
        {
          onClick: function onClick() {
            return onTabClick(index);
          },
          key: index,
          style: formValidIndexArray.indexOf(index) > -1 ? formValidStyle : selected === index ? selectedTabStyle : defaultTabStyle,
          href: "#" + index
        },
        _react2.default.createElement(
          "div",
          { className: "breadcrumb-tab" },
          _react2.default.createElement(
            "div",
            { className: "tab-icon" },
            formValidIndexArray.indexOf(index) > -1 ? _react2.default.createElement(_components.Icon, { style: checkIconStyle, action: "navigation", name: "check", color: "#22b25f" }) : _react2.default.createElement(
              "span",
              { className: "form-tab-index", style: selected === index ? { color: "#fe7a51" } : { color: "#b3b3b3" } },
              index + 1
            )
          ),
          _react2.default.createElement(_components.Label, { label: tab.heading, labelStyle: { letterSpacing: 0.6 }, color: "#fff", bold: true })
        )
      );
    })
  );
};

exports.default = BreadCrumbsForm;