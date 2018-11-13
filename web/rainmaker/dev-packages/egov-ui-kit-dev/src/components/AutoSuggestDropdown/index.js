import React from "react";
import AutoComplete from "material-ui/AutoComplete";
import PropTypes from "prop-types";
import filter from "lodash/filter";
import isUndefined from "lodash/isUndefined";
import sortBy from "lodash/sortBy";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import { relative } from "path";

const hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "rgba(0, 0, 0, 0.3799999952316284)",
};
const floatingLabelStyle = {
  color: "rgba(0, 0, 0, 0.6000000238418579)",
  fontSize: 16,
  letterSpacing: 0.6,
  fontWeight: 500,
  marginBottom: 5,
};
const underlineFocusBaseStyle = {
  borderColor: "#e0e0e0",
};
const requiredStyle = {
  color: "red",
};
const underlineDisabledStyle = {
  borderBottom: "1px solid #e0e0e0",
};

class AutoSuggestDropdown extends React.Component {
  state = {
    searchText: "",
  };

  getNameById = (id) => {
    const { dropDownData } = this.props;
    const filteredArray = filter(dropDownData, { value: id });
    return filteredArray.length > 0 ? filteredArray[0].label : id;
  };

  componentWillReceiveProps(nextProps) {
    let { getNameById } = this;
    if (!isUndefined(nextProps.value)) {
      this.setState({ searchText: getNameById(nextProps.value) });
    }
  }

  onChangeText = (searchText, dataSource, params) => {
    this.setState({ searchText });
  };

  render() {
    let {
      onChange,
      dataSource,
      floatingLabelText,
      className,
      required,
      value,
      jsonPath,
      errorMessage,
      boundary,
      dropDownData,
      toolTip,
      updateDependentFields,
      toolTipMessage,
      ...restProps
    } = this.props;

    const { filterAutoComplete, getNameById, onChangeText } = this;
    const { searchText } = this.state;
    const items = sortBy(dataSource, ["label"]);
    return (
      <div style={{ display: "flex", position: "relative" }}>
        <AutoComplete
          className={`autosuggest ${className}`}
          floatingLabelFixed={true}
          floatingLabelStyle={{ ...floatingLabelStyle }}
          hintStyle={{ ...hintBaseStyle }}
          underlineFocusStyle={{ ...underlineFocusBaseStyle }}
          openOnFocus={true}
          fullWidth={true}
          searchText={searchText}
          underlineDisabledStyle={underlineDisabledStyle}
          dataSource={(items && [...items]) || []}
          menuStyle={{ maxHeight: "150px", overflowY: "auto" }}
          dataSourceConfig={{ text: "label", value: "value" }}
          onNewRequest={onChange}
          onUpdateInput={onChangeText}
          filter={(searchText, key) => {
            return key.toLowerCase().includes(getNameById(searchText) && getNameById(searchText.toLowerCase()));
          }}
          floatingLabelText={[
            floatingLabelText,
            required ? (
              <span key={`error-${className}`} style={requiredStyle}>
                {" "}
                *
              </span>
            ) : null,
          ]}
          {...restProps}
        />
        <DownArrow style={{ position: "absolute", top: "24px", right: 0, color: "#969696" }} />
      </div>
    );
  }
}

AutoSuggestDropdown.propTypes = {
  onNewRequest: PropTypes.func,
  errorText: PropTypes.string,
  hintStyle: PropTypes.object,
  underlineFocusStyle: PropTypes.object,
  hintStyle: PropTypes.object,
  floatingLabelStyle: PropTypes.object,
  value: PropTypes.string,
  floatingLabelFixed: PropTypes.bool,
  dataSource: PropTypes.array,
  hintText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  required: PropTypes.bool,
  openOnFocus: PropTypes.bool,
  floatingLabelText: PropTypes.string,
  className: PropTypes.string,
};

export default AutoSuggestDropdown;

// value={value}
// searchKey={value}
