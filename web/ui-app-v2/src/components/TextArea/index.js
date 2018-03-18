import React from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";

const defaultStyle = {
  backgroundColor: "transparent",
};
const TextAreaUi = ({
  className,
  style,
  underlineShow,
  onChange,
  errorMessage,
  value = "",
  disabled,
  isRequired,
  hide,
  rows,
  hintText,
  hintStyle,
  textareaStyle,
  rowsMax,
  underlineStyle,
  underlineFocusStyle,
}) => {
  return (
    <TextField
      className={className}
      fullWidth={true}
      multiLine={true}
      rows={rows}
      rowsMax={rowsMax}
      disabled={disabled}
      onChange={onChange}
      style={{ ...defaultStyle, ...style }}
      hintText={hintText}
      hintStyle={hintStyle}
      textareaStyle={textareaStyle}
      underlineShow={underlineShow}
      underlineStyle={underlineStyle}
      underlineFocusStyle={underlineFocusStyle}
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
