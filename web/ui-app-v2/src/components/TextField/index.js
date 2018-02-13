import React from "react";
import PropTypes from "prop-types";
import Error from "../Error";
import TextField from "material-ui/TextField";

const TextFieldUi = ({ onChange, value, disabled, hide, label }) => {
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
      className="custom-form-control-for-textfield"
      {...labelProperty}
      underlineShow={false}
      value={value}
      hide={hide}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default TextFieldUi;
