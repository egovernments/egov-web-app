import * as actionTypes from "./actionTypes";
import { validateField, getFormField, getFormFields } from "./utils";
const intialState = {};

const setForm = (state, formKey, form) => {
  return { ...state, [formKey]: form };
};

const setFormProperty = (state, formKey, propertyKey, propertyValue) => {
  const form = state[formKey] || {};
  return { ...state, [formKey]: { ...form, [propertyKey]: propertyValue } };
};

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

const displayFieldErrors = (state, formKey) => {
  const form = state[formKey] || {};
  const formFields = getFormFields(form);
  for (let key in formFields) {
    const field = formFields[key];
    const { errorText, isFieldValid } = validateField(field);
    if (!isFieldValid) {
      state = setFieldProperty(state, formKey, key, "errorText", errorText);
    }
  }
  return state;
};

const mergeFields = (oldFields = {}, newFields = {}) => {
  return Object.keys(newFields).reduce((mergedFields, fieldKey) => {
    mergedFields[fieldKey] = { ...oldFields[fieldKey], ...newFields[fieldKey] };
    return mergedFields;
  }, {});
};

const form = (state = {}, action) => {
  const { type, formKey, fieldKey } = action;
  switch (type) {
    case actionTypes.INIT_FORM:
      const { name, ...form } = action.form;
      const currentForm = state[name] || {};
      const mergedFields = mergeFields(currentForm.fields, action.form.fields);
      return { ...state, [name]: { ...currentForm, ...form, fields: mergedFields } };
    case actionTypes.FIELD_CHANGE:
      const { value } = action;
      return setFieldProperty(state, formKey, fieldKey, "value", value);
    case actionTypes.VALIDATE_FIELD:
      const { errorText } = action;
      return setFieldProperty(state, formKey, fieldKey, "errorText", errorText);
    case actionTypes.VALIDATE_FORM:
      const { isFormValid } = action;
      return setFormProperty(state, formKey, "isFormValid", isFormValid);
    case actionTypes.DISPLAY_FORM_ERRORS:
      return displayFieldErrors(state, formKey);
    case actionTypes.SUBMIT_FORM_PENDING:
      return setFormProperty(state, formKey, "submitting", true);
    case actionTypes.SUBMIT_FORM_COMPLETE:
      return setFormProperty(state, formKey, "submitting", false);
    case actionTypes.SUBMIT_FORM_ERROR:
      state = setFormProperty(state, formKey, "submitting", false);
      return setFormProperty(state, formKey, "error", true);
    default:
      return state;
  }
};

export default form;
