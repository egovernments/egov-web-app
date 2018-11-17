"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dashBoardOption = undefined;

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

var dashBoardOption = exports.dashBoardOption = [(0, _extends3.default)({
  displayLabel: "Search donor",
  iconName: "search",
  navigationUrl: "/blood/search-donor",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle), (0, _extends3.default)({
  displayLabel: "Registration",
  iconName: "search",
  navigationUrl: "/blood/registration",
  itemProps: {
    xs: 12,
    md: 4
  }
}, evenOptionStyle), (0, _extends3.default)({
  displayLabel: "App history",
  iconName: "search",
  navigationUrl: "/blood/app-history",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle), (0, _extends3.default)({
  displayLabel: "Donation process",
  iconName: "search",
  navigationUrl: "/blood/donation-process",
  itemProps: {
    xs: 12,
    md: 4
  }
}, evenOptionStyle), (0, _extends3.default)({
  displayLabel: "How to donate",
  iconName: "search",
  navigationUrl: "/blood/how-to-donate",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle), (0, _extends3.default)({
  displayLabel: "Near by donation",
  iconName: "search",
  navigationUrl: "/blood/near-by-donation",
  itemProps: {
    xs: 12,
    md: 4
  }
}, evenOptionStyle), (0, _extends3.default)({
  displayLabel: "Notification",
  iconName: "search",
  navigationUrl: "/blood/notification",
  itemProps: {
    xs: 12,
    md: 4
  }
}, oddOptionStyle)];