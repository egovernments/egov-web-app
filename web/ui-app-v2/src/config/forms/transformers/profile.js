import { prepareFormData, getUserInfo } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const { fields } = form;
  let user = getUserInfo();
  user = { ...user, name: fields.name.value, tenantId: fields.city.value, emailId: fields.email.value };
  const photo = (form.files && form.files["photo"] && form.files["photo"].length && form.files["photo"][0].fileStoreId) || null;
  if (photo) {
    user = { ...user, photo };
  }
  return { user };
};

export default {
  viewModelToBusinessModelTransformer,
};
