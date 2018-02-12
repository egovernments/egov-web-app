import React from "react";
import { TextField, SelectField } from "../components";
import FieldHoC from "../hocs/field";

const Field = ({ field, actionName }) => {
  const { type, target, label, width } = field;

  const renderField = () => {
    switch (type) {
      case "text":
        const InputWrapper = FieldHoC(TextField);
        return <InputWrapper target={target} />;

      case "dropdown":
        const { options, sourceUrl } = field;
        const SelectWrapper = FieldHoC(SelectField);
        return (
          <SelectWrapper
            target={target}
            sourceUrl={sourceUrl}
            options={options}
          />
        );

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
