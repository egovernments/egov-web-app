import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

const TextAreaUi = ({ className, style, onChange, errorMessage, value, disabled, isRequired, hide, rows, hintText, hintStyle, textareaStyle }) => {
  return (
    <TextField
      className={className}
      fullWidth={true}
      multiLine={true}
      rows={rows}
      disabled={disabled}
      onChange={onChange}
      style={style}
      hintText={hintText}
      hintStyle={hintStyle}
      textareaStyle={textareaStyle}
      underlineShow={false}
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
