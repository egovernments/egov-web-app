import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const tenantId = window.localStorage.getItem("tenant-id");
  const id = decodeURIComponent(window.location.href.split("/").pop());
  const { fields: rejectFields } = form;
  let fields;

  const complaint = state.complaints.byId[id];

  fields = state.form["rejectComplaint"].fields;
  fields = {
    ...rejectFields,
    complaintno: {
      jsonPath: "services[0].serviceRequestId",
      value: complaint.serviceRequestId,
    },
    status: {
      jsonPath: "actionInfo[0].action",
      value: "reject",
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
    serviceTenantId: {
      jsonPath: "services[0].tenantId",
      value: tenantId,
    },
  };

  return prepareFormData({ ...form, fields });
};

export default {
  viewModelToBusinessModelTransformer,
};
