import { INIT_FORM } from "../actionTypes";
import { toggleSnackbarAndSetText } from "redux/app/actions";
import transform from "config/forms/transformers";

const initFormMiddleware = (store) => (next) => async (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();

  if (type === INIT_FORM) {
    const { form } = action;
    const { name: formKey } = form;
    let formData = null;

    try {
      let transformer = transform(formKey);
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
      } else {
        formData = form;
      }
    } catch (error) {
      formData = form;
    }
    action.form = formData;
  }

  next(action);
};

export default initFormMiddleware;
