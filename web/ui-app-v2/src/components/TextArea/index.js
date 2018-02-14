import React from "react";
import PropTypes from "prop-types";
import Error from "../Error";
import TextField from "material-ui/TextField";

const TextAreaUi = ({ onChange, value, disabled, hide, label }) => {
  const labelProperty = {
    floatingLabelFixed: true,
    floatingLabelStyle: {
      color: "#696969",
      fontSize: "20px",
      whiteSpace: "nowrap"
    },
    floatingLabelText: <span>{label} </span>
  };

  return (
    <TextField
        className="custom-form-control-for-textarea"
        inputStyle={{ color: '#5F5C57' }}
        id="textArea"
        fullWidth={true}
        multiLine={true}
        rows={2}
        {...labelProperty}
        value={value}
        disabled={disabled}
        onChange={onChange}
        hide = {hide}
    />
  );
};

export default TextAreaUi;
