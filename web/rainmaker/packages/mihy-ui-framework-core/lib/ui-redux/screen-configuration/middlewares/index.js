"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleScreenConfigurationFieldChange = require("./handleScreenConfigurationFieldChange");

var _handleScreenConfigurationFieldChange2 = _interopRequireDefault(_handleScreenConfigurationFieldChange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composedMiddleware = [_handleScreenConfigurationFieldChange2.default];
exports.default = composedMiddleware;