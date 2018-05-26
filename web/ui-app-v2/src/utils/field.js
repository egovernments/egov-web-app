import React from "react";
import { TextField, MobileNumberField, SingleCheckbox } from "components";

const Field = ({ fieldKey, handleFieldChange, field = {}, ...rest }) => {
  const renderField = () => {
    const { type, ...fieldProps } = field;
    switch (type) {
      case "textfield":
      case "textarea":
        return <TextField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} multiLine={type === "textarea"} />;
      case "mobilenumber":
        return <MobileNumberField {...rest} {...fieldProps} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "number":
      case "password":
        return <TextField {...rest} {...fieldProps} type={type} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "checkbox":
        return (
          <SingleCheckbox
            {...rest}
            {...fieldProps}
            label={fieldProps.floatingLabelText}
            type={type}
            onCheck={(e) => handleFieldChange(fieldKey, e.target.checked)}
          />
        );
      default:
        return null;
    }
  };

  return renderField();
};

export default Field;
