import React, { Component } from "react";
import { connect } from "react-redux";
import { handleChange } from "../actions/framework";

// this UiField can be a
const Field = UiField => {
  class Field extends Component {
    onChange = event => {
      const value = event.target.value;
      const { target, handleChange } = this.props;
      handleChange(target, value);
    };

    render() {
      const { onChange } = this;
      let props = { ...this.props, onChange };
      return <UiField {...props} />;
    }
  }

  const mapStateToProps = (state, props) => ({
    value: state.framework.form[props.target] || "",
  });

  const mapDispatchToProps = dispatch => ({
    handleChange: (item, value) => dispatch(handleChange(item, value)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Field);
};

export default Field;
