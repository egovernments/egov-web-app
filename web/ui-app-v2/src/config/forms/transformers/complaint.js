import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const tenantId = localStorage.getItem("tenant-id");
  const userInfo = localStorage.getItem("user-info");
  let userPhone = null;
  try {
    userPhone = userInfo.mobileNumber;
  } catch (error) {}
  formData.services[0].tenantId = tenantId;
  formData.services[0].phone = userPhone;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
