const transform = (formKey) => {
  try {
    if (/mdms/gi.test(formKey)) {
      formKey = "mdms";
    }
    const transformer = require(`./${formKey}`).default;
    return transformer;
  } catch (error) {
    throw new Error(error);
  }
};

export default transform;
