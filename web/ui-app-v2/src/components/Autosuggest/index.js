import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "material-ui/svg-icons/action/search";
import SearchBar from "../TextFieldIcon";

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
      <div>
        <SearchBar iconPosition="before" hintText={searchInputText} Icon={SearchIcon} onChange={onChange} value={inputValue} />
      </div>
    );
  }
}
