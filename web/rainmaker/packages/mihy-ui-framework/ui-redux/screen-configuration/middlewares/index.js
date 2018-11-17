"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleScreenConfigurationFieldChange = require("./handleScreenConfigurationFieldChange");

var _handleScreenConfigurationFieldChange2 = _interopRequireDefault(_handleScreenConfigurationFieldChange);

var _beforeInitScreen = require("./beforeInitScreen");

var _beforeInitScreen2 = _interopRequireDefault(_beforeInitScreen);

var _beforeFieldChange = require("./beforeFieldChange");

var _beforeFieldChange2 = _interopRequireDefault(_beforeFieldChange);

var _afterFieldChange = require("./afterFieldChange");

var _afterFieldChange2 = _interopRequireDefault(_afterFieldChange);

var _addJsonPath = require("./addJsonPath");

var _addJsonPath2 = _interopRequireDefault(_addJsonPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composedMiddleware = [_beforeInitScreen2.default, _addJsonPath2.default, _beforeFieldChange2.default, _handleScreenConfigurationFieldChange2.default, _afterFieldChange2.default];
exports.default = composedMiddleware;