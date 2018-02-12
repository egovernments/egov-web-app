import React, { Component } from "react";
import { connect } from "react-redux";
import { SelectField } from "../components";
import { fetchDropDownData, handleChange } from "../actions/framework";

class SelectFieldContainer extends Component {
  componentDidMount() {
    const { field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    this.props.fetchDropDownData(dataSource, target);
  }

  onChange = event => {
    const value = event.target.value;
    const { field, handleChange } = this.props;
    handleChange(field.target, value);
  };

  render() {
    const { hide, disabled, dropDownData, value } = this.props;
    const { onChange } = this;
    return (
      <SelectField
        value={value}
        hide={hide.toString()}
        onChange={onChange}
        disabled={disabled}
        dropDownData={dropDownData}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleChange: (target, value) => dispatch(handleChange(target, value)),
  fetchDropDownData: (dataSource, target) =>
    dispatch(fetchDropDownData(dataSource, target))
});

const mapStateToProps = (state, props) => {
  const { framework } = state;
  const { field } = props;
  const { target } = field;
  const fieldProperty = framework.fields[target];
  const hide = fieldProperty ? fieldProperty.hide : false;
  const disabled = fieldProperty ? fieldProperty.disabled : false;
  const dropDownData = framework.dropDownData[target];

  return {
    value: framework.form[target],
    hide,
    dropDownData,
    disabled
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectFieldContainer
);
