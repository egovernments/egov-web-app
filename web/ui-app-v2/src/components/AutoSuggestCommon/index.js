import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "material-ui/svg-icons/action/search";
import TextFieldIcon from "../TextFieldIcon";

export default class AutoSuggest extends Component {
  static propTypes = { callback: PropTypes.func, dataSource: PropTypes.array, searchKey: PropTypes.string };

  state = { inputValue: "" };

  fetchSuggestions = (inputValue) => {
    inputValue = inputValue.toLowerCase();

    if (inputValue.length > 0) {
      const { searchKey, dataSource } = this.props;
      return dataSource.filter((result) => result[searchKey].toLowerCase().indexOf(inputValue) !== -1);
    }
  };

  onChange = (e) => {
    const inputValue = e.target.value;
    const suggestions = this.fetchSuggestions(inputValue);
    this.props.callback(suggestions, inputValue);
    this.setState({ inputValue });
  };

  render() {
    const { onChange } = this;
    const { inputValue } = this.state;
    const { searchInputText } = this.props;

    return (
      <div style={{ background: "#fff", padding: "0px 10px" }} className="search-field-container">
        <TextFieldIcon
          textFieldStyle={{ border: "1px solid  #e0e0e0", background: "#f7f7f7", height: "48px" }}
          inputStyle={{ marginTop: "8px" }}
          hintStyle={{bottom : 8}}
          iconStyle={{ left: "5px", bottom: "10px", color: "#767676" }}
          iconPosition="before"
          underlineShow={false}
          fullWidth={true}
          hintText={searchInputText}
          Icon={SearchIcon}
          onChange={onChange}
          value={inputValue}
        />
      </div>
    );
  }
}
