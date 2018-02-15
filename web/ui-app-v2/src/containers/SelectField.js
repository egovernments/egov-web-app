import React, { Component } from "react";
import { SelectField } from "../components";
import { prepareSearchUrl } from "../utils/commons";

export default class SelectFieldContainer extends Component {
  componentDidMount() {
    const { field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    if (dataSource) {
      this.props.fetchDropDownData(dataSource.url, target);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.value && nextProps.value) {
      const { field, value } = nextProps;
      let { dependencies } = field;
      dependencies = dependencies && dependencies.length ? dependencies : [];
      dependencies.forEach(dependency => {
        const { target, dataSource, type: dependencyType } = dependency;
        if (dependencyType === "API_CALL") {
          const searchUrl = prepareSearchUrl(dataSource, value);
          this.props.fetchDropDownData(searchUrl, target);
        }
      });
    }
  }

  onChange = (event, index, value) => {
    const { field, handleChange } = this.props;
    handleChange({ ...field, value });
  };

  transformDropdownData = (field, dropDownData = []) => {
    const {
      key: dataSourceKey,
      value: dataSourceValue
    } = field.dataSourceConfig;

    return dropDownData.map(dropDownItem => {
      return {
        key: dropDownItem[dataSourceKey],
        value: dropDownItem[dataSourceValue]
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
