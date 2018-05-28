const transform = async (transformType = "viewModelToBusinessModelTransformer", formKey, form, state, recordData) => {
  const transformer = require(`./${transformType}`).default;
  try {
    const formData = transformer(formKey, form, state, recordData);
    return formData && typeof formData.then === "function" ? await formData : formData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default transform;
