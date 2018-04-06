import set from "lodash/set";

export const validateField = (field) => {
  const { required, pattern, minLength, maxLength, minValue, maxValue } = field;

  const value = field.value || "";
  const fieldLength = value.length;
  let errorText = "",
    isFieldValid = true;

  if (required && !value.length) {
    isFieldValid = false;
    errorText = field.requiredMessage;
  }

  if (pattern && !new RegExp(pattern).test(value)) {
    isFieldValid = false;
  }
  if (minLength && maxLength && !(fieldLength >= minLength && fieldLength <= maxLength)) {
    isFieldValid = false;
  }
  if (minValue && maxValue && !(value >= minValue && value <= maxValue)) {
    isFieldValid = false;
  }

  errorText = !isFieldValid ? (!errorText.length ? field.errorMessage : "") : "";

  return { isFieldValid, errorText };
};

export const validateForm = (form) => {
  let isFormValid = true;
  const formFields = getFormFields(form);
  for (let key in formFields) {
    const field = formFields[key];
    if (!validateField(field, field.value).isFieldValid) {
      isFormValid = false;
      break;
    }
  }
  return isFormValid;
};

export const getFormFields = (form) => {
  return form.fields || {};
};

export const getFormField = (form, fieldKey) => {
  const fields = getFormFields(form);
  return fields[fieldKey];
};

export const getFormFieldFiles = (form, formKey, fieldKey) => {
  let currentFiles = form[formKey].fields[fieldKey];
  currentFiles = currentFiles && currentFiles.value ? currentFiles.value : [];
  return currentFiles;
};

export const getFiles = (form, formKey, fieldKey) => {
  form = form[formKey] || {};
  const files = form.files && form.files[fieldKey] ? form.files[fieldKey] : [];
  return files;
};
