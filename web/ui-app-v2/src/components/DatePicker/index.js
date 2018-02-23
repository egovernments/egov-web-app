import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import './style.css';
// {onChange,autoOk,floatingLabelText}
const DatePickerUi = props => {
  return <DatePicker {...props} />;
};

export default DatePickerUi;
