import React, { Component } from "react";
import { connect } from "react-redux";
import TextField from "../components/TextField";
import { handleChange } from "../actions/framework";

class TextFieldContainer extends Component {
  onChange = event => {
    const value = event.target.value;
    const { field, handleChange } = this.props;
    handleChange(field.target, value);
  };

  render() {
    const { hide, disabled, value } = this.props;
    const { onChange } = this;
    return (
      <TextField
        value={value}
        hide={hide.toString()}
        onChange={onChange}
        disabled={disabled}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { framework } = state;
  const { field } = props;
  const { target } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : false;
  const disabled = fieldProperty ? fieldProperty.disabled : false;

  return {
    value: framework.form[target] || "",
    hide,
    disabled
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: (target, value) => dispatch(handleChange(target, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TextFieldContainer);
