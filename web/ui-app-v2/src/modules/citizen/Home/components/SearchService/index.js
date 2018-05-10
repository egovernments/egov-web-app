import React, { Component } from "react";
import { TextFieldIcon } from "components";
import SearchIcon from "material-ui/svg-icons/action/search";

export default class SearchService extends Component {
  state = {
    inputValue: "",
  };
  render() {
    const { inputValue } = this.state;
    return (
      <TextFieldIcon
        textFieldStyle={{ height: "48px" }}
        inputStyle={{ marginTop: "8px" }}
        iconPosition="before"
        underlineShow={false}
        fullWidth={true}
        hintText="Tell us what you need"
        Icon={SearchIcon}
        value={inputValue}
        id="find-services"
      />
    );
  }
}
