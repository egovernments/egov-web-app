import set from "lodash/set";

export const validateField = (field) => {
  const { required, pattern } = field;

  const value = field.value || "";
  let errorText = "",
    isFieldValid = true;

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
