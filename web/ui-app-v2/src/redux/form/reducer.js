import * as actionTypes from "./actionTypes";

const intialState = {};

const setFieldProperty = (state, formKey, fieldKey, propertyKey, propertyValue) => {
  const form = state[formKey] || {};
  const fields = form.fields || {};
  const field = fields[fieldKey] || {};
  return {
    ...state,
    [formKey]: {
      ...form,
      fields: {
        ...fields,
        [fieldKey]: { ...field, [propertyKey]: propertyValue },
      },
    },
  };
};

const setFormValidity = (state, formKey, isFormValid) => {
  const form = state[formKey] || {};
  return { ...state, [formKey]: { ...form, isFormValid } };
};

const form = (state = {}, action) => {
  const { type, formKey, fieldKey } = action;
  switch (type) {
    case "INIT_FORM":
      const { name, ...form } = action.form;
      return { ...state, [name]: form };
    case "FIELD_CHANGE":
      const { value } = action;
      return setFieldProperty(state, formKey, fieldKey, "value", value);
    case "VALIDATE_FIELD":
      const { errorText } = action;
      return setFieldProperty(state, formKey, fieldKey, "errorText", errorText);
    case "VALIDATE_FORM":
      const { isFormValid } = action;
      return setFormValidity(state, formKey, isFormValid);
    default:
      return state;
  }
};

export default form;
