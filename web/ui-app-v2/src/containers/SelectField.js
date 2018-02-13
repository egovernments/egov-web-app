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

  render() {
    const { field, fetchDropDownData, ...rest } = this.props;
    return <SelectField {...rest} />;
  }
}
