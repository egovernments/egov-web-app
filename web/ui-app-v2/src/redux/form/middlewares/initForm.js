import { INIT_FORM } from "../actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";

const initFormMiddleware = (store) => (next) => async (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type === INIT_FORM) {
    const { form, formKey } = action;
    let formData = null;

    try {
      let transformer = require(`config/forms/transformers/${formKey}`).default;
      transformer = transformer.businessModelToViewModelTransformer;
      if (transformer && typeof transformer === "function") {
        formData = transformer(form, state);
        try {
          formData = typeof formData.then === "function" ? await formData : formData;
        } catch (error) {
          const { message } = error;
          // this bit of code is duplicated
          dispatch(toggleSnackbarAndSetText(true, message, true));
          return;
        }
      }
    } catch (error) {
      formData = form;
    }

    action.form = formData;
  }

  next(action);
};

export default initFormMiddleware;
