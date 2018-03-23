import * as actionTypes from "../actionTypes/form";

const intialState = {};

const setForm = (state, formKey, fieldKey, propertyKey, propertyValue) => {
  const form = state[formKey] || {};
  const field = form[fieldKey] || {};
  return {
    ...state,
    [formKey]: {
      ...form,
      [fieldKey]: { ...field, [propertyKey]: propertyValue },
    },
  };
};

const form = (state = intialState, action) => {
  const { type, formKey, fieldKey } = action;
  switch (type) {
    case actionTypes.INIT_FORM:
      return { ...state, [action.formKey]: action.form };
    case actionTypes.FIELD_CHANGE:
      const { value } = action;
      return setForm(state, formKey, fieldKey, "value", value);
    case actionTypes.VALIDATE_FIELD:
      const { errorText } = action;
      return setForm(state, formKey, fieldKey, "errorText", errorText);
    case actionTypes.VALIDATE_FORM:
      const { isFormValid } = action;
      return { ...state, [formKey]: { ...state[formKey], isFormValid } };
    default:
      return state;
  }
};

export default form;
