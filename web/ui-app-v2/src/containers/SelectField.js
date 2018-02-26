import React, { Component } from "react";
import { SelectField } from "../components";
import { prepareSearchUrl } from "../utils";
import jp from "jsonpath";

export default class SelectFieldContainer extends Component {
  componentDidMount() {
    const { field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    if (dataSource) {
      const searchUrl = prepareSearchUrl(dataSource);
      this.props.fetchDropDownData(searchUrl, target);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.value && nextProps.value) {
      const { field, value } = nextProps;
      let { dependencies } = field;
      dependencies = dependencies && dependencies.length ? dependencies : [];
      dependencies.forEach((dependency) => {
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
    const { key: jsonPathKey, value: jsonPathValue } = field.dataSourceConfig;
    const keys = jp.query(dropDownData, jsonPathKey);
    const values = jp.query(dropDownData, jsonPathValue);

    return Object.keys(keys).reduce((transformDropdownData, index) => {
      const transformDropdownDataItem = {};
      transformDropdownDataItem.key = keys[index];
      transformDropdownDataItem.value = values[index];
      transformDropdownData.push(transformDropdownDataItem);
      return transformDropdownData;
    }, []);
  };

  render() {
    const { onChange } = this;
    const { field, fetchDropDownData, dropDownData, ...rest } = this.props;
    const transformedDropdownData = this.transformDropdownData(field, dropDownData);
    return <SelectField onChange={onChange} field={field} dropDownData={transformedDropdownData} {...rest} />;
  }
}
