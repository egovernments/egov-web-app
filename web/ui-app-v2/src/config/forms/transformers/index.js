const transform = (formKey) => {
  try {
    const transformer = require(`./${formKey}`).default;
    return transformer;
  } catch (error) {
    throw new Error(error);
  }
};

export default transform;
