import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import "./index.css";



const DropDownUi = ({
  value,
  fullWidth = false,
  labelStyle,
  dropDownData,
  children,
  selected,
  onChange,
  id,
  style = {},
  floatingLabelText,
  floatingLabelStyle,
}) => {
  const renderSelectMenuItems = () => {
    return dropDownData.map((option, index) => {
      return <MenuItem key={index} value={option.value} primaryText={option.label} />;
    });
  };

  return (
    <SelectField
      className="dropdown"
      id={id}
      style={style}
      fullWidth={fullWidth}
      dropDownMenuProps={{
        targetOrigin: { horizontal: "left", vertical: "bottom" },
      }}
      labelStyle={labelStyle}
      onChange={onChange}
      selected="Select"
      value={value}
      floatingLabelText={floatingLabelText}
      floatingLabelStyle={floatingLabelStyle}
      iconStyle={{ fill: "#484848" }}
      underlineStyle={{ borderBottom: "none" }}
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
