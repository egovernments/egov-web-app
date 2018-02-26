import { saveForm, setFormData } from "../actions/framework";
import _ from "lodash";

const frameworkMiddleware = (store) => (next) => (action) => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  const { specs, form: formData } = state.framework;
  const { transformers, createUrl } = specs;
  let transformedFormData;

  switch (type) {
    case "SUBMIT_FORM_DATA":
      transformedFormData = _.clone(formData);

      if (transformers && transformers.VToBModelTransform && transformers.VToBModelTransform.length)
        transformers.VToBModelTransform.forEach((transformer) => {
          transformer(transformedFormData);
        });

      dispatch(saveForm(createUrl, transformedFormData));
      return;

    case "SET_FORM_DATA":
      transformedFormData = _.clone(action.formData);
      if (transformers && transformers.BToVModelTransform && transformers.BToVModelTransform.length) {
        transformers.BToVModelTransform.forEach((transformer) => {
          transformer(transformedFormData);
        });
        action.formData = transformedFormData;
      }
      break;
    default:
      break;
  }

  next(action);
};

export default frameworkMiddleware;
