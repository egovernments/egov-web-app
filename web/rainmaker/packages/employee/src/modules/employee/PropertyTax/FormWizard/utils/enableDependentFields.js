import { setFieldProperty } from "egov-ui-kit/redux/form/actions"

export const setDependentFields = (fields, dispatch, formKey, isEnabled) => fields.forEach((fieldName) => {
  dispatch(setFieldProperty(formKey, fieldName, "hideField", isEnabled))
})
