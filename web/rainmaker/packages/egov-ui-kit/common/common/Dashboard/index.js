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

var _CityPicker = require("./component/CityPicker");

var _CityPicker2 = _interopRequireDefault(_CityPicker);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onButton1Click = function onButton1Click(item, history, onPGRClick) {
  var route = item.route;

  if (item.moduleTitle === "Property Tax") {
    history && history.push(route);
  }
  if (item.moduleTitle === "Complaints") {
    onPGRClick();
  }
};
var onButton2Click = function onButton2Click(item, history) {
  if (process.env.REACT_APP_NAME === "Citizen") {
    if (item.moduleTitle === "Property Tax") {
      history && history.push("property-tax/how-it-works");
    }
    if (item.moduleTitle === "Complaints") {
      history && history.push("how-it-works");
    }
  }
};

var Dashboard = function Dashboard(_ref) {
  var moduleItems = _ref.moduleItems,
      userName = _ref.userName,
      history = _ref.history,
      onPGRClick = _ref.onPGRClick,
      onDialogueClose = _ref.onDialogueClose,
      dialogueOpen = _ref.dialogueOpen;

  return _react2.default.createElement(
    "div",
    { "class": "col-sm-12 " },
    _react2.default.createElement(_translationNode2.default, { className: "landingPageUser", label: " Welcome " + userName + ", " }),
    _react2.default.createElement(_component2.default, { onPGRClick: onPGRClick, items: moduleItems, onButton2Click: onButton2Click, onButton1Click: onButton1Click, history: history }),
    _react2.default.createElement(_CityPicker2.default, { history: history, moduleItems: moduleItems, onDialogueClose: onDialogueClose, dialogueOpen: dialogueOpen })
  );
};
exports.default = Dashboard;