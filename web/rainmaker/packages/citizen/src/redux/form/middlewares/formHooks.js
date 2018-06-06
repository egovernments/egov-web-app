import * as actionTypes from "../actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";
import { fetchDropdownData } from "egov-ui-kit/utils/commons";

const formValidation = (store) => (next) => (action) => {
  const { formKey, type, value, fieldKey } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type === actionTypes.FIELD_CHANGE) {
    try {
      let hook = require(`config/forms/hooks/${formKey}`).default;
      hook = hook.fieldChange;
      if (hook && typeof hook === "function") {
        hook(fieldKey, formKey, value, state, dispatch);
      }
    } catch (e) {
      // the exceptions are assumed to be thrown only due to absence of a hook
    }

    //for populating dependent dropdowns.
    try {
      const { form } = state;
      const { fields } = form[formKey];
      if (fields[fieldKey].dataFetchConfig && fields[fieldKey].dataFetchConfig.dependants) {
        const { dependants } = fields[fieldKey].dataFetchConfig;
        dependants.forEach((item) => {
          if (fields[item.fieldKey].dataFetchConfig) {
            fetchDropdownData(dispatch, fields[item.fieldKey].dataFetchConfig, formKey, item.fieldKey);
          }
        });
      }
    } catch (error) {
      const { message } = error;
      dispatch(toggleSnackbarAndSetText(true, message, true));
      return;
    }
  }
  next(action);
};

export default formValidation;
