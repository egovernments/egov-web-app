import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import "./style.css";

const DropDownUi = ({
  value,
  label,
  name,
  dropDownData = [], 
  selected,
  onChange,
  style
}) => {
  const labelProperty = {
    floatingLabelFixed: true,
    floatingLabelText: <span>{label}</span>,
    hintText: "-- Please Select --"
  };

  const renderSelectMenuItems = () => {
    return dropDownData.map((option, index) => {
      return <MenuItem key={index} value={option.value} primaryText={option.value} />;
    });
  };

  return (
    <SelectField
      className="custom-form-control-for-select"
      style={style}
      floatingLabelStyle={{
        color: "#696969",
        fontSize: "20px",
        whiteSpace: "nowrap"
      }}
      dropDownMenuProps={{
        targetOrigin: { horizontal: "left", vertical: "bottom" }
      }}
      labelStyle={{ color: "#5F5C57" }}
      value={value}
      onChange={onChange}
      {...labelProperty}
    >
      {renderSelectMenuItems()}
    </SelectField>
  );
};

DropDownUi.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  selected: PropTypes.string,
  options: PropTypes.array.isRequired
};

export default DropDownUi;
