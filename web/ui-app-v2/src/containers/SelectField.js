import React, { Component } from "react";
import { SelectField } from "../components";

export default class SelectFieldContainer extends Component {
  // if update make an api call to all its dependants
  componentDidMount() {
    const { actionName, field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    if (dataSource) {
      this.props.fetchDropDownData(dataSource, target);
    }
  }

  onChange = (event, index, value) => {
    const { field, handleChange } = this.props;
    handleChange({ ...field, value });
  };

  transformDropdownData = (field, dropDownData = []) => {
    const { dataSourceConfig } = field;

    return dropDownData.map(responseObj => {
      return {
        key: responseObj[dataSourceConfig.key],
        value: responseObj[dataSourceConfig.value]
      };
    });
  };

  render() {
    const { onChange } = this;
    const { field, fetchDropDownData, dropDownData, ...rest } = this.props;
    const transformedDropdownData = this.transformDropdownData(
      field,
      dropDownData
    );
    return (
      <SelectField
        onChange={onChange}
        label={field.label}
        dropDownData={transformedDropdownData}
        {...rest}
      />
    );
  }
}
