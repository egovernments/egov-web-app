"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var validateField = exports.validateField = function validateField(field) {
  var required = field.required,
      pattern = field.pattern,
      minLength = field.minLength,
      maxLength = field.maxLength,
      minValue = field.minValue,
      maxValue = field.maxValue;


  var value = field.value ? typeof field.value === "string" ? field.value.trim() : field.value : null;
  var errorText = "",
      isFieldValid = true,
      fieldLength = 0;

  if (required && !value) {
    isFieldValid = false;
    errorText = field.requiredMessage;
  }

  if (value) {
    fieldLength = value.length;
  }

  if (isFieldValid && fieldLength && pattern && !new RegExp(pattern).test(value)) {
    isFieldValid = false;
  }
  if (isFieldValid && minLength && maxLength && !(fieldLength >= minLength && fieldLength <= maxLength)) {
    isFieldValid = false;
  }
  if (isFieldValid && minValue && maxValue && !(value >= minValue && value <= maxValue)) {
    isFieldValid = false;
  }

  errorText = !isFieldValid ? errorText.length ? errorText : field.errorMessage : "";

  return { isFieldValid: isFieldValid, errorText: errorText };
};

var validateForm = exports.validateForm = function validateForm(form) {
  var isFormValid = true;
  var formFields = getFormFields(form);
  for (var key in formFields) {
    var field = formFields[key];
    if (!validateField(field, field.value).isFieldValid) {
      isFormValid = false;
      break;
    }
  }
  return isFormValid;
};

var getFormFields = exports.getFormFields = function getFormFields(form) {
  return form.fields || {};
};

var getFormField = exports.getFormField = function getFormField(form, fieldKey) {
  var fields = getFormFields(form);
  return fields[fieldKey];
};

var getFormFieldFiles = exports.getFormFieldFiles = function getFormFieldFiles(form, formKey, fieldKey) {
  var currentFiles = form[formKey].fields[fieldKey];
  currentFiles = currentFiles && currentFiles.value ? currentFiles.value : [];
  return currentFiles;
};

var getFiles = exports.getFiles = function getFiles(form, formKey, fieldKey) {
  form = form[formKey] || {};
  var files = form.files && form.files[fieldKey] ? form.files[fieldKey] : [];
  return files;
};