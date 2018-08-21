"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _reusableFields = require("../utils/reusableFields");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "plotDetails",
  fields: (0, _extends3.default)({}, _reusableFields.plotSize, _reusableFields.measuringUnit, _reusableFields.floorCount),
  isFormValid: false
};

exports.default = formConfig;