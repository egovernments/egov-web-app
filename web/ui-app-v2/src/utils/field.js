import React from "react";
import { TextField, MobileNumberField } from "components";

const Field = ({ type, fieldKey, handleFieldChange, form, ...rest }) => {
  const renderField = () => {
    const fields = form.fields || {};

    switch (type) {
      case "textfield":
      case "textarea":
        return (
          <TextField {...rest} {...fields[fieldKey]} onChange={(e, value) => handleFieldChange(fieldKey, value)} multiLine={type === "textarea"} />
        );
      case "mobilenumber":
        <MobileNumberField {...rest} {...fields[fieldKey]} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      case "number":
      case "password":
        return <TextField {...rest} {...fields[fieldKey]} type={type} onChange={(e, value) => handleFieldChange(fieldKey, value)} />;
      default:
        return null;
    }
  };

  return renderField();
};

export default Field;
