import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const tenantId = localStorage.getItem("tenant-id");
  formData.tenantId = tenantId;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
