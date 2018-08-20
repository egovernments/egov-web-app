"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onButton1Click = function onButton1Click(item, history) {
  var route = item.route;

  if (item.moduleTitle === "Property Tax") {
    history && history.push(route);
  }
};
var onButton2Click = function onButton2Click(item, history) {
  var userType = JSON.parse(localStorage.getItem("user-info")).type;

  if (userType === "CITIZEN") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
  }
};

var Dashboard = function Dashboard(_ref) {
  var moduleItems = _ref.moduleItems,
      userName = _ref.userName,
      history = _ref.history;

  return _react2.default.createElement(
    "div",
    { "class": "col-sm-12" },
    _react2.default.createElement(_translationNode2.default, { className: "landingPageUser", label: " Welcome " + userName + ", " }),
    _react2.default.createElement(_component2.default, { items: moduleItems, onButton2Click: onButton2Click, onButton1Click: onButton1Click, history: history })
  );
};
exports.default = Dashboard;