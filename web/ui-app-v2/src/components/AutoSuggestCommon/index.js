import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchIcon from "material-ui/svg-icons/action/search";
import TextFieldIcon from "../TextFieldIcon";

export default class AutoSuggest extends Component {
  static propTypes = { callback: PropTypes.func, dataSource: PropTypes.array, searchKey: PropTypes.string };

  state = { inputValue: "" };

  styles = {
    defaultContainerStyle: { background: "#fff", padding: "0px 10px" },
    defaultTextFieldStyle: { border: "1px solid  #e0e0e0", background: "#f7f7f7", height: "48px" },
    defaultIconStyle: { left: "5px", bottom: "10px", color: "#767676" },
  };

  fetchSuggestions = inputValue => {
    inputValue = inputValue.toLowerCase();

    if (inputValue.length > 0) {
      const { searchKey, dataSource } = this.props;
      return dataSource.filter(result => result[searchKey].toLowerCase().indexOf(inputValue) !== -1);
    }
  };

  onChange = e => {
    const inputValue = e.target.value;
    const suggestions = this.fetchSuggestions(inputValue);
    this.props.callback(suggestions, inputValue);
    this.setState({ inputValue });
  };

  render() {
    const { onChange, styles } = this;
    const { inputValue } = this.state;
    const { containerStyle, textFieldStyle, iconStyle, searchInputText } = this.props;

    return (

      <div style={{ ...styles.defaultContainerStyle, ...containerStyle }} className="search-field-container">
        <TextFieldIcon
          textFieldStyle={{ ...styles.defaultTextFieldStyle, ...textFieldStyle }}
          inputStyle={{ marginTop: "8px" }}
          hintStyle={{ bottom: 8 }}
          iconStyle={{ ...styles.defaultIconStyle, ...iconStyle }}
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
