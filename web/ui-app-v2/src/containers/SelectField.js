import React, { Component } from "react";
import { SelectField } from "../components";

export default class SelectFieldContainer extends Component {
  componentDidMount() {
    const { field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    if(dataSource){
      this.props.fetchDropDownData(dataSource, target);
    }
  }

  transformDropData = (field, dropDownData=[]) => {
    const {dataSourceConfig} = field;
    
     return dropDownData.map(responseObj => {
      return {
        key: responseObj[dataSourceConfig.key],
        value: responseObj[dataSourceConfig.value]
      }
    })
   
  }


  render() {
    const { field, fetchDropDownData, dropDownData, ...rest } = this.props;
    const transformedDropdownData = this.transformDropData(field, dropDownData);
    return <SelectField dropDownData={transformedDropdownData} {...rest} />;
  }
}
