import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

const TextAreaUi = ({ className, onChange, errorMessage, value, disabled, isRequired, hide, label }) => {
  const labelProperty = {
    className: className ? className : "",
    floatingLabelFixed: true,
    floatingLabelStyle: {
      fontSize: "20px",
      whiteSpace: "nowrap",
    },
    floatingLabelText: (
      <span>
        {label}
        <span style={{ color: "#FF0000" }}>{isRequired ? " *" : ""}</span>
      </span>
    ),
  };

  const style = { display: hide ? "none" : "block" };

  return (
    <TextField
      inputStyle={{ color: "#5F5C57" }}
      fullWidth={true}
      multiLine={true}
      errorText={errorMessage}
      rows={2}
      {...labelProperty}
      value={value}
      disabled={disabled}
      onChange={onChange}
      style={style}
    />
  );
};

TextAreaUi.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.object,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  hide: PropTypes.bool,
  className: PropTypes.string,
};

export default TextAreaUi;
