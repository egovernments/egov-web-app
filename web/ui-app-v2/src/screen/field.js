import React from "react";
import { TextField, SelectField } from "../containers";

const Field = ({ field, actionName }) => {
  const { type, width, label } = field;

  const renderField = () => {
    switch (type) {
      case "text":
        return <TextField field={field} />;

      case "dropdown":
        return <SelectField field={field} />;

      default:
        break;
    }
  };

  return (
    <div className={`col-lg-${width}`}>
      <label>{label}</label>
      {renderField()}
    </div>
  );
};

export default Field;
