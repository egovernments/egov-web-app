import * as actionTypes from "../actionTypes";

const translateFieldText = (store) => (next) => (action) => {
  const { type, form } = action;
  const state = store.getState();

  if (type === actionTypes.INIT_FORM) {
    let { fields } = form;
    fields = Object.keys(fields).reduce((translatedField, fieldKey) => {
      const field = Object.keys(fields[fieldKey]).reduce((field, fieldName) => {
        let fieldValue = fields[fieldKey][fieldName];
        if (fieldName === "hintText" || fieldName === "requiredMessage" || fieldName === "floatingLabelText") {
          // put the translation logic here
          const translatedLabel = state.app.localizationLabels[fieldValue];
          if (translatedLabel && typeof translatedLabel === "object" && translatedLabel.hasOwnProperty("message")) {
            fieldValue = translatedLabel.message;
          }
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
