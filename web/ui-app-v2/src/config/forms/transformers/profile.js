import { prepareFormData, getUserInfo } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const { fields } = form;
  let user = getUserInfo();
  user = { ...user, name: fields.name.value, permanentCity: fields.city.value, emailId: fields.email.value };
  const photos = form.files && form.files["photo"];
  const photo = (photos && photos.length && photos[0].fileStoreId) || null;
  user = { ...user, photo };
  return { user };
};

export default {
  viewModelToBusinessModelTransformer,
};
