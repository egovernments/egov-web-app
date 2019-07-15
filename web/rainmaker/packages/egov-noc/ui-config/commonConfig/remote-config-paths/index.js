"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var remoteConfigPath = function remoteConfigPath(path, screenKey) {
  var config = {};
  switch (path) {
    default:
      config = require("ui-config/screens/specs/" + path + "/" + screenKey).default;
      break;
  }
  return config;
};

exports.default = remoteConfigPath;