import get from "lodash/get";

const templateInterface=({ shareTemplate, shareContent }) => {
  let payloads=[];
  switch (shareTemplate) {
    case "complaintDetails": {
      const topic = "egov.core.notification.sms";
      // const topic = "SMS";
      const SMSRequest = {
        mobileNumber: get(shareContent[0], "to"),
        message: `Dear Contractor, please find complaint details : Name - ${get(shareContent[0].content,"name")}, Mobile Number - ${get(shareContent[0].content,"moblileNo")}, Complaint Number - ${get(shareContent[0].content,"complaintNo")}, Complaint Type - ${get(shareContent[0].content,"complaintType")}, Address - ${get(shareContent[0].content,"address")}`
      };
      const data =SMSRequest
      payloads.push({
        topic,
        messages:JSON.stringify(data)
      })
    }
    break;
    case "complaintDetailsEmail": {
      const topic = "egov.core.notification.email";
      // const topic = "SMS";
      const SMSRequest = {
        email:get(shareContent[0], "to"),
        subject:"Shared data",
        body: `Dear Contractor, please find complaint details : Name - ${get(shareContent[0].content,"name")}, Mobile Number - ${get(shareContent[0].content,"moblileNo")}, Complaint Number - ${get(shareContent[0].content,"complaintNo")}, Complaint Type - ${get(shareContent[0].content,"complaintType")}, Address - ${get(shareContent[0].content,"address")}`
      };
      const data =SMSRequest
      payloads.push({
        topic,
        messages:JSON.stringify(data)
      })
    }
    break;
  }
  return payloads;
};

export default templateInterface;
