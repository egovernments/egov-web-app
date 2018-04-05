const viewModelToBusinessModelTransformer = (form, state) => {
  const { fields } = form;
  let { userInfo: user } = state.auth;
  user = { ...user, name: fields.name.value, permanentCity: fields.city.value, emailId: fields.email.value };
  const photos = form.files && form.files["photo"];
  let photo = (photos && photos.length && photos[0]) || null;
  photo = photo ? photo.fileStoreId || photo.imageUri : null;
  user = { ...user, photo };
  return { user };
};

export default {
  viewModelToBusinessModelTransformer,
};
