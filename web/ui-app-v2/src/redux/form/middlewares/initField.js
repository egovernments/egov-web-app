import { INIT_FORM } from "../actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";
import transform from "config/forms/transformers";
import { initForm, setFieldProperty } from "redux/form/actions";
import { httpRequest } from "utils/api";
import { upperCaseFirst } from "utils/commons";

const fieldInitFormMiddleware = (store) => (next) => async (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  if (type === INIT_FORM) {
    const { form } = action;
    const { name: formKey, fields } = form;
    const { moduleName, masterName } = fields;
    let formData = null;
    try {
      Object.keys(fields).map((key) => {
        let item = fields[key];
        switch (item.type) {
          case "singleValueList":
            const dropDownData = fetchDropdownData(dispatch, item.dataFetchConfig, formKey, key, moduleName, masterName);
        }
      });
    } catch (error) {
      const { message } = error;
      dispatch(toggleSnackbarAndSetText(true, message, true));
      return;
    }
  }
  next(action);
};

const fetchDropdownData = async (dispatch, dataFetchConfig, formKey, fieldKey, moduleName, masterName) => {
  const { url, action, requestBody } = dataFetchConfig;
  const module = moduleName && moduleName.value;
  const master = upperCaseFirst(fieldKey);
  try {
    const payloadSpec = await httpRequest(url, action, [], requestBody);
    //if the response is MDMS response. else, send the response normally. (need to refactor)
    let dropdownData = module ? payloadSpec.MdmsRes[module][master] : payloadSpec;

    const ddData = dropdownData.reduce((ddData, item) => {
      ddData.push({ label: item.name, value: item.code });
      return ddData;
    }, []);
    dispatch(setFieldProperty(formKey, fieldKey, "dropDownData", ddData));
  } catch (error) {
    const { message } = error;
    dispatch(toggleSnackbarAndSetText(true, message, true));
    return;
  }
};

export default fieldInitFormMiddleware;
