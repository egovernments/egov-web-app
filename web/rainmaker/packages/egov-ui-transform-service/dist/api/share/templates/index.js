"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var kafka = require("kafka-node");

var templateInterface = function templateInterface(_ref) {
  var shareTemplate = _ref.shareTemplate,
      shareContent = _ref.shareContent;

  var payloads = [];
  switch (shareTemplate) {
    case "complaintDetails":
      {
        var topic = "egov.core.notification.sms";
        // const topic = "SMS";
        var SMSRequest = {
          mobileNumber: (0, _get2.default)(shareContent[0], "to"),
          message: "Dear Contractor, please find complaint details"
        };
        var KeyedMessage = kafka.KeyedMessage;
        var data = new KeyedMessage("SMSRequest", JSON.stringify(SMSRequest));
        payloads.push({
          topic: topic,
          messages: data
        });
      }
  }
  return payloads;
};

exports.default = templateInterface;
//# sourceMappingURL=index.js.map