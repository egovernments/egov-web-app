import React from "react";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

const RadioButtonUi = ({ options, name, defaultValue, handleChange, style = {}, checkedIcon, iconStyle }) => {
  const renderRadioButtons = () => {
    return options.map((option, index) => {
      return <RadioButton key={index} value={option.value} label={option.label} style={style} iconStyle={iconStyle} checkedIcon={checkedIcon} />;
    });
  };

  return (
    <RadioButtonGroup name={name} onChange={handleChange} defaultSelected={defaultValue}>
      {renderRadioButtons()}
    </RadioButtonGroup>
  );
};

export default RadioButtonUi;
