import { submitFormDataRequest, setFormData } from "../actions/framework";

const frameworkMiddleware = store => next => action => {
  const { type } = action;
  const dispatch = store.dispatch;
  const state = store.getState();
  const { form: formData, specs } = state.framework;
  const { transformers, createUrl } = specs;
  let transformedFormData = Object.assign({}, formData);

  switch (type) {
    case "SUBMIT_FORM_DATA":
      if (
        transformers &&
        transformers.VToBModelTransform &&
        transformers.VToBModelTransform.length
      )
        transformers.VToBModelTransform.forEach(transformer => {
          transformedFormData = transformer(transformedFormData);
        });

      dispatch(submitFormDataRequest(createUrl, transformedFormData));
      return;
    // set form data
    case "SET_FORM_DATA":
      const { formData: searchResponse } = action;

      if (
        transformers &&
        transformers.VToBModelTransform &&
        transformers.VToBModelTransform.length
      )
        transformers.VToBModelTransform.forEach(transformer => {
          transformedFormData = transformer(transformedFormData);
        });

      dispatch(setFormData(searchResponse));
      return;
    default:
      break;
  }

  next(action);
};

export default frameworkMiddleware;
