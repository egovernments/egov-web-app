import * as actionTypes from "./actionTypes";
import axios from "axios";
import { uploadFile } from "utils/api";
import { FILE_UPLOAD } from "utils/endPoints";
import { handleFieldChange } from "redux/form/actions";

const fileUploadPending = () => {
  return { type: actionTypes.FILE_UPLOAD_STARTED };
};

const fileUploadCompleted = (payload) => {
  return { type: actionTypes.FILE_UPLOAD_COMPLETED, payload };
};

const fileUploadError = (error) => {
  return { type: actionTypes.FILE_UPLOAD_ERROR, error };
};

const removeFile = (fileToBeRemoved, formKey, fieldKey) => {
  return (dispatch, getState) => {
    const { form } = getState();
    let files = form[formKey][fieldKey] || [];
    files = files.filter((file) => {
      return file.name !== fileToBeRemoved.name;
    });
  };
};

export const fileUpload = (formKey, fieldKey, files) => {
  return async (dispatch, getState) => {
    dispatch(fileUploadPending());
    try {
      const filesStoreIds = await uploadFile(FILE_UPLOAD.POST.URL, "pgr", files);
      dispatch(fileUploadCompleted(filesStoreIds));
      const state = getState();
      const { form } = state;
      let currentFiles = form[formKey][fieldKey] || [];
      currentFiles = currentFiles.concat(filesStoreIds);
      dispatch(handleFieldChange(formKey, fieldKey, currentFiles));
    } catch (error) {
      dispatch(fileUploadError(error));
    }
  };
};
