import set from "lodash/set";

export const validateField = (field) => {
  const { required, pattern } = field;

  const value = field.value || "";
  let errorText = "",
    isFieldValid = true;

  // const fieldLength = value.trim().length;

  if (required && !value.length) {
    isFieldValid = false;
    errorText = field.requiredMessage;
  }
  if (isFieldValid && (pattern && !new RegExp(pattern).test(value))) {
    isFieldValid = false;
    errorText = field.errorMessage;
  }

  return { isFieldValid, errorText };
};

export const getFormFields = (form) => {
  return form.fields || {};
};

export const getFormField = (form, fieldKey) => {
  const fields = getFormFields(form);
  return fields[fieldKey];
};
