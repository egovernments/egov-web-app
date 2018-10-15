"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducer = require("../app/reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require("../auth/reducer");

var _reducer4 = _interopRequireDefault(_reducer3);

var _reducer5 = require("../screen-configuration/reducer");

var _reducer6 = _interopRequireDefault(_reducer5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import form from "../form/reducer";

var rootReducer = {
  app: _reducer2.default,
  auth: _reducer4.default,
  screenConfiguration: _reducer6.default
};

exports.default = rootReducer;