import get from "lodash/get";
var kafka = require("kafka-node");

const templateInterface=({ shareTemplate, shareContent }) => {
  let payloads=[];
  switch (shareTemplate) {
    case "complaintDetails": {
      const topic = "egov.core.notification.sms";
      const SMSRequest = {
        mobileNumber: get(shareContent[0], "to"),
        message: "Dear Contractor, please find complaint details"
      };
      const KeyedMessage = kafka.KeyedMessage;
      const data = new KeyedMessage("SMSRequest", SMSRequest);
      payloads.push({
        topic,
        messages:data
      })
    }
  }
  return payloads;
};

export default templateInterface;
