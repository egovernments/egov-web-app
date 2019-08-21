"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _producer = require("../../kafka/producer");

var _producer2 = _interopRequireDefault(_producer);

var _templates = require("./templates");

var _templates2 = _interopRequireDefault(_templates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  api.post("/_create", function (_ref2, res) {
    var body = _ref2.body;

    var payloads = [];
    try {
      var ShareMetaData = body.ShareMetaData;
      var shareTemplate = ShareMetaData.shareTemplate,
          shareContent = ShareMetaData.shareContent;

      payloads = (0, _templates2.default)({ shareTemplate: shareTemplate, shareContent: shareContent });
    } catch (e) {
      console.log(e);
    }
    console.log("before", payloads);
    _producer2.default.send(payloads, function (err, data) {
      console.log(err);
      console.log(data);
      res.json(data);
    });
  });

  return api;
};
//# sourceMappingURL=v1.js.map