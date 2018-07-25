"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducer = require("../app/reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require("../auth/reducer");

var _reducer4 = _interopRequireDefault(_reducer3);

var _reducer5 = require("../form/reducer");

var _reducer6 = _interopRequireDefault(_reducer5);

var _reducer7 = require("../complaints/reducer");

var _reducer8 = _interopRequireDefault(_reducer7);

var _reducer9 = require("../common/reducer");

var _reducer10 = _interopRequireDefault(_reducer9);

var _reducer11 = require("../formtemp/reducer");

var _reducer12 = _interopRequireDefault(_reducer11);

var _reducer13 = require("../mdms/reducer");

var _reducer14 = _interopRequireDefault(_reducer13);

var _report = require("../reports/report");

var _report2 = _interopRequireDefault(_report);

var _reducer15 = require("../properties/reducer");

var _reducer16 = _interopRequireDefault(_reducer15);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = {
  app: _reducer2.default,
  auth: _reducer4.default,
  form: _reducer6.default,
  complaints: _reducer8.default,
  common: _reducer10.default,
  mdms: _reducer14.default,
  formtemp: _reducer12.default,
  report: _report2.default,
  properties: _reducer16.default
};

exports.default = rootReducer;