import { prepareFormData } from "utils/commons";

export const updateComplaintStatus = (form, complaint) => {
  const formData = prepareFormData(form);
  if (!formData.services) {
    formData.services = [];
    formData.services[0] = complaint;
  } else {
    formData.services[0] = { ...formData.services[0], ...complaint };
  }

  return formData;
};
