import React from "react";
import AutoComplete from "material-ui/AutoComplete";
import PropTypes from "prop-types";

const hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "#b3b3b3",
};
const floatingLabelStyle = {
  color: "rgb(0, 188, 209)",
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

const AutoSuggestDropdown = ({
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
  dataFetchConfig,
  ...restProps
}) => {
  return (
    <AutoComplete
      className={`autosuggest ${className}`}
      floatingLabelFixed={true}
      floatingLabelStyle={{ ...floatingLabelStyle }}
      hintStyle={{ ...hintBaseStyle }}
      underlineFocusStyle={{ ...underlineFocusBaseStyle }}
      filter={AutoComplete.caseInsensitiveFilter}
      openOnFocus={false}
      fullWidth={true}
      value={value}
      dataSource={(dataSource && [...dataSource]) || []}
      menuStyle={{ maxHeight: "150px", overflowY: "auto" }}
      dataSourceConfig={{ text: "label", value: "value" }}
      onNewRequest={onChange}
      underlineDisabledStyle={underlineDisabledStyle}
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
  );
};

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
