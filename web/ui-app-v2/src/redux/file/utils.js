export const getFormFieldFiles = (form, formKey, fieldKey) => {
  let currentFiles = form[formKey].fields[fieldKey];
  currentFiles = currentFiles && currentFiles.value ? currentFiles.value : [];
  return currentFiles;
};

export const getFileKey = (formKey, fieldKey, fileName) => {
  return `${fileName}_${formKey}_${fieldKey}`;
};
