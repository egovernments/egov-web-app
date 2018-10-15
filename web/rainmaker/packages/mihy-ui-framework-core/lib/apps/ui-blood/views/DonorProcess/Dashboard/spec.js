"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donorProcessOption = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var oddOptionStyle = {
  buttonProps: {
    color: "primary"
  },
  IconProps: {
    color: "secondary"
  }
};

var evenOptionStyle = {
  buttonProps: {
    color: "secondary"
  },
  IconProps: {
    color: "primary"
  }
};

var donorProcessOption = exports.donorProcessOption = [(0, _extends3.default)({
  displayLabel: "Process Overview",
  iconName: "search",
  navigationUrl: "/blood/donor-process/process-overview",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle), (0, _extends3.default)({
  displayLabel: "What to do before, duing and After",
  iconName: "search",
  navigationUrl: "/blood/donor-process/what-to-do",
  itemProps: {
    xs: 12,
    md: 4
  }
}, evenOptionStyle), (0, _extends3.default)({
  displayLabel: "What happens to donated blood",
  iconName: "search",
  navigationUrl: "/blood/donor-process/what-happens",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle)];