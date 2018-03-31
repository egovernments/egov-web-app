import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const tenantId = localStorage.getItem("tenantId");
  const userInfo = localStorage.getItem("user-info");
  let userPhone = null;
  try {
    userPhone = JSON.parse(userInfo).UserRequest.mobileNumber;
  } catch (error) {}
  formData.services[0].tenantId = tenantId || "pb";
  formData.services[0].phone = userPhone;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
