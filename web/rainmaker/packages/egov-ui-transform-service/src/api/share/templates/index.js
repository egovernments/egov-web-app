import get from "lodash/get";

const templateInterface=({ shareTemplate, shareContent }) => {
  let payloads=[];
  switch (shareTemplate) {
    case "complaintDetails": {
      const topic = "egov.core.notification.sms";
      const SMSRequest = {
        mobileNumber: get(shareContent[0], "to"),
        message: "Dear Contractor, please find complaint details"
      };
      payloads.push({
        topic,
        Request:{SMSRequest},
        request:{SMSRequest}
      })
    }
  }
  return payloads;
};

export default templateInterface;
