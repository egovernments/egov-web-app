"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logout = require("./logout");

var _logout2 = _interopRequireDefault(_logout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composedMiddleware = [_logout2.default];
exports.default = composedMiddleware;