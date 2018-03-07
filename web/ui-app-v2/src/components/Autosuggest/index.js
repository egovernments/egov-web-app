import React, { Component } from "react";
import SearchIcon from "material-ui/svg-icons/action/search";
import TextField from "material-ui/TextField";

const SearchBox = ({ value, onChange }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        width: "100%",
      }}
    >
      <SearchIcon
        style={{
          position: "absolute",
          color: "#969696",
          zIndex: 10,
          right: 5,
          top: 15,
          width: 20,
          height: 20,
        }}
      />
      <TextField
        value={value}
        onChange={onChange}
        fullWidth={true}
        style={{
          padding: "10px",
          background: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
        }}
        inputStyle={{
          padding: "0px 5px",
        }}
        underlineShow={false}
        hintText="Search by Name"
      />
    </div>
  );
};

export default class AutoSuggest extends Component {
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
    this.props.callback(suggestions);
    this.setState({ inputValue });
  };

  render() {
    const { onChange } = this;
    const { inputValue } = this.state;

    return (
      <div>
        <SearchBox onChange={onChange} value={inputValue} />
      </div>
    );
  }
}
