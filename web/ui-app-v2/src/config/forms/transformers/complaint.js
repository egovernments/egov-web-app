import { getTenantForLatLng, prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = async (form, state) => {
  const formData = prepareFormData(form);
  const userInfo = localStorage.getItem("user-info");
  let userPhone = null;
  try {
    userPhone = JSON.parse(userInfo).mobileNumber;
    formData.services[0].phone = userPhone;
  } catch (error) {}

  try {
    const { latitude, longitude } = form.fields;
    const tenantId = await getTenantForLatLng(latitude.value, longitude.value);
    formData.services[0].tenantId = tenantId;
  } catch (error) {
    console.log(error.message);
  }
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
