import { prepareFormData } from "utils/commons";

const filterObjByKey = (obj, predicate) => {
  return Object.keys(obj)
    .filter((key) => predicate(key))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});
};

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  console.log(window.location.pathname);
  const serviceRequestId = decodeURIComponent(window.location.pathname.split("/").pop());
  const serviceData = state.complaints.byId[serviceRequestId];
  var filteredSeriveData = filterObjByKey(serviceData, (key) => key !== "actions");
  if (!formData.services) formData.services = [];
  formData.services[0] = filteredSeriveData;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
