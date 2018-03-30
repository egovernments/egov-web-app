import * as actionTypes from "./actionTypes";
import axios from "axios";
import { uploadFile } from "utils/api";
import { FILE_UPLOAD } from "utils/endPoints";
import { handleFieldChange } from "redux/form/actions";
import { getFormFieldFiles, getFileKey } from "./utils";

const fileUploadPending = () => {
  return { type: actionTypes.FILE_UPLOAD_STARTED };
};

const fileUploadCompleted = (fileKey, file) => {
  return { type: actionTypes.FILE_UPLOAD_COMPLETED, fileKey, file };
};

const fileUploadError = (error) => {
  return { type: actionTypes.FILE_UPLOAD_ERROR, error };
};

export const removeFile = (formKey, fieldKey, fileName) => {
  return (dispatch, getState) => {
    const state = getState();
    const { form, file } = state;
    const fileKey = getFileKey(formKey, fieldKey, fileName);
    //Deleting from the Form
    const fileStoreId = file.payload[fileName].fileStoreId;
    let currentFiles = getFormFieldFiles(form, formKey, fieldKey);
    currentFiles = currentFiles.filter((f) => f !== fileStoreId);
    dispatch(handleFieldChange(formKey, fieldKey, currentFiles));
    //Deleting from the File is pending.
  };
};

// currently supports only single file upload at a time, although the API has multiple file upload
export const fileUpload = (formKey, fieldKey, module, file) => {
  return async (dispatch, getState) => {
    dispatch(fileUploadPending());
    try {
      const fileUrl = file.url;
      file.url = null;
      const fileStoreId = await uploadFile(FILE_UPLOAD.POST.URL, module, file);
      const fileKey = getFileKey(formKey, fieldKey, file.name);
      dispatch(fileUploadCompleted(fileKey, { fileStoreId: fileStoreId, fileUrl: fileUrl }));
      const state = getState();
      const { form } = state;
      let currentFiles = getFormFieldFiles(form, formKey, fieldKey);
      // why not push? well even if remove action failed the latest files would be put in the front
      currentFiles.unshift(fileStoreId);
      dispatch(handleFieldChange(formKey, fieldKey, currentFiles));
    } catch (error) {
      throw new Error(error);
      // dispatch(fileUploadError(error));
    }
  };
};
