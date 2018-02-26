import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

const baseStyle = {
  background: "#f2f2f2",
  height: "56px",
  paddingLeft: "10px",
};

const DropDownUi = ({ value, fullWidth = false, dropDownData = [], selected, onChange, style = {} }) => {
  const renderSelectMenuItems = () => {
    return dropDownData.map((option, index) => {
      return <MenuItem key={index} value={option.value} primaryText={option.label} />;
    });
  };

  return (
    <SelectField
      className="dropdown"
      style={Object.assign({}, baseStyle, style)}
      fullWidth={fullWidth}
      dropDownMenuProps={{
        targetOrigin: { horizontal: "left", vertical: "bottom" },
      }}
      labelStyle={{ color: "#5F5C57" }}
      value={value}
      onChange={onChange}
    >
      {renderSelectMenuItems()}
    </SelectField>
  );
};

DropDownUi.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.string,
};

export default DropDownUi;
