import React from "react";
import TimePicker from "material-ui/TimePicker";
import "./style.css";
// {onChange,autoOk,floatingLabelText}
const TimePickerUi = (props) => {
  return (
    <TimePicker
      {...props}
    />
  );
};

export default TimePickerUi;
