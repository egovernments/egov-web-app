import React, { Component } from "react";
import { SelectField } from "../components";

export default class SelectFieldContainer extends Component {
  componentDidMount() {
    const { field, fetchDropDownData } = this.props;
    const { dataSource, target } = field;
    this.props.fetchDropDownData(dataSource, field);
  }

  render() {
    const { field, ...rest } = this.props;
    return <SelectField {...rest} />;
  }
}
