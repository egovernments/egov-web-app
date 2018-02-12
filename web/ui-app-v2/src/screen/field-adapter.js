import React, { Component } from "react";
import { TextField, SelectField } from "../components";
import Field from "../hocs/field";

export default class ViewAdapter extends Component {
  renderItem = (item, actionName) => {
    const { type, target } = item;

    switch (type) {
      case "text":
        const InputWrapper = Field(TextField);
        return <InputWrapper target={target} />;

      case "dropdown":
        const { options, sourceUrl } = item;
        const SelectWrapper = Field(SelectField);
        return (
          <SelectWrapper
            target={target}
            sourceUrl={sourceUrl}
            options={options}
          />
        );

      default:
        break;
    }
  };

  render() {
    const { item, actionName } = this.props;
    return this.renderItem(item, actionName);
  }
}
