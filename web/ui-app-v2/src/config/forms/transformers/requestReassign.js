import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const tenantId = window.localStorage.getItem("tenant-id");
  //const id = decodeURIComponent(window.location.href.split("/").pop());
  const { fields: reassignFields } = form;
  let fields;
  console.log("inside form");
  //const complaint = state.complaints.byId[id];

  fields = state.form["requestReassign"].fields;
  fields = {
    ...reassignFields,
    complaintno: {
      jsonPath: "services[0].serviceRequestId",
      value: "06/04/2018/000269",
    },
    status: {
      jsonPath: "actionInfo[0].action",
      value: "requestforreassign",
    },
    description: {
      jsonPath: "services[0].description",
      value: "complaint.description",
    },
    phone: {
      jsonPath: "services[0].phone",
      value: "8940028343",
    },
    servicecode: {
      jsonPath: "services[0].serviceCode",
      value: "StrayPigs",
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
