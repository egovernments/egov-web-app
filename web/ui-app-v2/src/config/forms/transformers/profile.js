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

const businessModelToViewModelTransformer = (form, state) => {
  const { userInfo } = state.auth;
  const { name, emailId, permanentCity, tenantId, photo: imageUri } = userInfo;
  const transformedForm = {
    ...form,
    fields: {
      ...form.fields,
      email: { ...form.fields.email, value: emailId || "" },
      city: { ...form.fields.city, value: permanentCity || tenantId },
      name: { ...form.fields.name, value: name },
    },
    files: {
      ["photo"]: [
        {
          imageUri,
        },
      ],
    },
  };

  return transformedForm;
};

export default {
  viewModelToBusinessModelTransformer,
  businessModelToViewModelTransformer,
};
