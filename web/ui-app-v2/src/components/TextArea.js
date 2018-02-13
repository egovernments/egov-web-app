import React from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const TextArea = ({ value, onChange, disabled, hide, errorMessage }) => {
  return (
    <div>
      <textarea
        onChange={onChange}
        disabled={disabled}
        hide={hide}
        placeholder="Type Something"
        value={value}
      />
      <Error errorMessage={errorMessage} />
    </div>
  );
};

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
