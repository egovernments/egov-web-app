import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const serviceRequestId = decodeURIComponent(window.location.pathname.split("/").pop());
  const serviceData = state.complaints.byId[serviceRequestId];
  if (!formData.services) formData.services = [];
  formData.services[0] = serviceData;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
