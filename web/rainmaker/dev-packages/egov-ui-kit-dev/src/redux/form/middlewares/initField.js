import { INIT_FORM } from "../actionTypes";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import { fetchDropdownData } from "egov-ui-kit/utils/commons";
import get from "lodash/get";

const fieldInitFormMiddleware = (store) => (next) => async (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  // const state = store.getState();
  if (type === INIT_FORM) {
    if (typeof get(action, "form.beforeInitForm") === "function") {
      action = action.form.beforeInitForm(action, store);
    }
    const { form } = action;
    const { name: formKey, fields } = form;
    let formData = null;
    try {
      Object.keys(fields).map((key) => {
        let item = fields[key];
        if (item.dataFetchConfig && !item.dataFetchConfig.isDependent) {
          switch (item.type) {
            case "singleValueList":
              fetchDropdownData(dispatch, item.dataFetchConfig, formKey, key);
          }
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

export default fieldInitFormMiddleware;
