import { prepareFormData } from "../../../utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const { previousRoute } = state.app;
  const id = decodeURIComponent(window.location.href.split("/")[5]);

  const { fields: reopenFields } = form;
  let fields;

  const complaint = state.complaints.byId[id];

  fields = state.form["reopenComplaint"].fields;
  fields = {
    ...reopenFields,
    complaintno: {
      jsonPath: "services[0].serviceRequestId",
      value: complaint.serviceRequestId,
    },
    status: {
      jsonPath: "actionInfo[0].action",
      value: "assign",
    },
    description: {
      jsonPath: "services[0].description",
      value: complaint.description,
    },
    phone: {
      jsonPath: "services[0].phone",
      value: complaint.phone,
    },
    servicecode: {
      jsonPath: "services[0].serviceCode",
      value: complaint.serviceCode,
    },
  };

  return prepareFormData(fields);
};

export default {
  viewModelToBusinessModelTransformer,
};
