import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const userInfo = localStorage.getItem("user-info");
  let userPhone = null;
  try {
    userPhone = JSON.parse(userInfo).mobileNumber;
  } catch (error) {}

  formData.services[0].phone = userPhone;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
