"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var remoteConfigPath = function remoteConfigPath(path, screenKey) {
  var config = {};
  switch (path) {
    case "egov-uc":
      config = require("egov-uc/ui-config/screens/specs/" + path + "/" + screenKey).default;
      break;
    default:
      config = require("ui-config/screens/specs/" + path + "/" + screenKey).default;
      break;
  }
  return config;
};

exports.default = remoteConfigPath;