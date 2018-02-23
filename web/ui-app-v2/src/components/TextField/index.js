import React from 'react';
import PropTypes from 'prop-types';
import Error from '../Error';
import TextField from 'material-ui/TextField';

const TextFieldUi = ({ onChange, errorMessage, value, disabled, hide, isRequired, label, className }) => {
  const labelProperty = {
    className: className ? className : '',
    floatingLabelFixed: true,
    floatingLabelStyle: {
      fontSize: '20px',
      whiteSpace: 'nowrap',
    },
    floatingLabelText: (
      <span>
        {label}
        <span style={{ color: '#FF0000' }}>{isRequired ? ' *' : ''}</span>
      </span>
    ),
  };

  const style = {
    display: hide ? 'none' : 'block',
  };

  return (
    <TextField
      {...labelProperty}
      style={style}
      errorStyle={{ float: 'left' }}
      errorText={errorMessage}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TextFieldUi.propTypes = {
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  hide: PropTypes.bool,
  className: PropTypes.string,
};

export default TextFieldUi;
