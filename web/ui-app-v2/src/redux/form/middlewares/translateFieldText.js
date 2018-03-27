import * as actionTypes from "../actionTypes";
import { getTranslatedLabel } from "../../../utils/commons";

const translateFieldText = (store) => (next) => (action) => {
  const { type, form } = action;
  const state = store.getState();
  const { localizationLabels } = state.app;

  if (type === actionTypes.INIT_FORM) {
    let { fields } = form;
    fields = Object.keys(fields).reduce((translatedField, fieldKey) => {
      const field = Object.keys(fields[fieldKey]).reduce((field, fieldName) => {
        let fieldValue = fields[fieldKey][fieldName];
        if (fieldName === "hintText" || fieldName === "requiredMessage" || fieldName === "floatingLabelText") {
          fieldValue = getTranslatedLabel(fieldValue, localizationLabels);
        }
        field[fieldName] = fieldValue;
        return field;
      }, {});

      translatedField[fieldKey] = field;
      return translatedField;
    }, {});

    action.form = { ...form, fields };
  }

  next(action);
};

export default translateFieldText;
