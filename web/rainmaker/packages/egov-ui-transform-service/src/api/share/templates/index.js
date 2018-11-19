import get from "lodash/get";
// var kafka = require("kafka-node");

const templateInterface=({ shareTemplate, shareContent }) => {
  let payloads=[];
  switch (shareTemplate) {
    case "complaintDetails": {
      const topic = "egov.core.notification.sms";
      // const topic = "SMS";
      const SMSRequest = {
        mobileNumber: get(shareContent[0], "to"),
        message: "Dear Contractor, please find complaint details"
      };
      // const KeyedMessage = kafka.KeyedMessage;
      // new KeyedMessage("SMSRequest", SMSRequest);

      const data ={SMSRequest}
      payloads.push({
        topic,
        messages:JSON.stringify(data)
      })
    }
  }
  return payloads;
};

export default templateInterface;
