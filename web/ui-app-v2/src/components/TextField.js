import React from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const TextField = ({ value, onChange, disabled, hide, errorMessage }) => {
  return (
    <div>
      <input
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

TextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextField;
