import get from "lodash/get";

const templateInterface=({ shareTemplate, shareContent }) => {
  let payloads=[];
  switch (shareTemplate) {
    case "complaintDetails": {
      const topic = "egov.core.notification.sms";
      // const topic = "SMS";
      const SMSRequest = {
        mobileNumber: get(shareContent[0], "to"),
        message: `Dear Contractor, please find complaint details : Name - ${get(shareContent[0],"name")}, Mobile Number - ${get(shareContent[0],"moblileNo")}, Complaint Number - ${get(shareContent[0],"complaintNo")}, Complaint Type - ${get(shareContent[0],"complaintType")}, Address - ${get(shareContent[0],"address")}`
      };
      const data =SMSRequest
      payloads.push({
        topic,
        messages:JSON.stringify(data)
      })
    }
  }
  return payloads;
};

export default templateInterface;
