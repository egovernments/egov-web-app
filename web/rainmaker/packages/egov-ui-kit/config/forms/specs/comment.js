"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formConfig = {
  name: "comment",
  fields: {
    comment: {
      id: "citizen-comment",
      jsonPath: "actionInfo[0].comments",
      hintText: "Write your comments",
      value: "",
      required: true
    }
  },
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
  redirectionRoute: ""
};

exports.default = formConfig;