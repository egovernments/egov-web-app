export const validateField = (field, value = "") => {
  const { required, pattern } = field;

  let errorText = "",
    isFieldValid = true;

  const fieldLength = value.trim().length;

  if (required && !value.length) {
    isFieldValid = false;
    errorText = "Required";
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

export const prepareFormData = (formFields) => {
  return formFields;
};
