"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require("egov-ui-kit/redux/auth/actions");

var auth = function auth(store) {
  return function (next) {
    return function (action) {
      var type = action.type;


      if (/(_ERROR|_FAILURE)$/.test(type) && action.error === "INVALID_TOKEN") {
        store.dispatch((0, _actions.refreshTokenRequest)());
      } else {
        next(action);
      }
    };
  };
};

exports.default = auth;