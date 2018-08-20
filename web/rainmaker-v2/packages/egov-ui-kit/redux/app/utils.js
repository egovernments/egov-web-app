"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLocalizationLabels = undefined;

var _commons = require("egov-ui-kit/utils/commons");

var initLocalizationLabels = exports.initLocalizationLabels = function initLocalizationLabels(locale) {
  var localizationLabels = void 0;
  try {
    localizationLabels = window.localStorage.getItem("localization_" + locale);
    localizationLabels = JSON.parse(localizationLabels);
    localizationLabels = (0, _commons.transformLocalizationLabels)(localizationLabels);
  } catch (error) {
    localizationLabels = {};
  }

  return localizationLabels;
};