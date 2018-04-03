import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const tenantId = window.localStorage.getItem("tenant-id");
  // pass complaint id as an argument to the transformer
  const id = decodeURIComponent(window.location.href.split("/")[5]);
  const { fields: reopenFields } = form;
  let fields;

  const complaint = state.complaints.byId[id];

  const status = complaint.actions[complaint.actions.length - 1].status;
  const statusMapping = {
    open: "assign",
    assigned: "resolve",
    resolved: "reopen",
    rejected: "reopen",
  };
  const complaintStatus = statusMapping[status] || "assign";

  fields = state.form["reopenComplaint"].fields;
  fields = {
    ...reopenFields,
    complaintno: {
      jsonPath: "services[0].serviceRequestId",
      value: complaint.serviceRequestId,
    },
    status: {
      jsonPath: "actionInfo[0].action",
      value: complaintStatus,
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
