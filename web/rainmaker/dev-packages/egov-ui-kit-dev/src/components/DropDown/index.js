import React from "react";
import PropTypes from "prop-types";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import "./index.css";

const floatingLabelStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  fontWeight: 500,
  transform: "scale(1) translate(0px, -16px)",
  top: 30,
};

const floatingLabelBaseShrinkStyle = {
  fontSize: "12px",
  color: "#00bcd1",
  transform: "scale(1) translate(0px, -16px)",
  fontWeight: 500,
};

const hintBaseStyle = {
  fontSize: "16px",
  letterSpacing: "0.7px",
  color: "#b3b3b3",
};

const requiredStyle = {
  color: "red",
};

const underlineFocusBaseStyle = {
  borderColor: "#e0e0e0",
};

const DropDownUi = ({
  className,
  menuInnerDivStyle,
  errorText,
  errorStyle = {},
  value,
  fullWidth = false,
  labelStyle,
  required,
  dropDownData,
  children,
  selected,
  onChange,
  menuStyle,
  id,
  style = {},
  floatingLabelText,
  underlineStyle,
  hintText,
  hintStyle,
  jsonPath,
  dataFetchConfig,
  errorMessage,
  toolTip,
  autoWidth,
  toolTipMessage,
  updateDependentFields,
  ...rest
}) => {
  const renderSelectMenuItems = () => {
    return dropDownData.map((option, index) => {
      return <MenuItem className="menu-class" key={index} value={option.value} primaryText={option.label} />;
    });
  };

  return (
    <SelectField
      errorText={errorText}
      errorStyle={errorStyle}
      className={`dropdown ${className}`}
      id={id}
      style={style}
      autoWidth={autoWidth}
      menuStyle={menuStyle}
      fullWidth={fullWidth}
      dropDownMenuProps={{
        targetOrigin: { horizontal: "left", vertical: "top" },
      }}
      labelStyle={labelStyle}
      onChange={onChange}
      selected="Select"
      value={value}
      hintText={hintText}
      floatingLabelShrinkStyle={floatingLabelBaseShrinkStyle}
      floatingLabelFixed={true}
      floatingLabelText={[
        floatingLabelText,
        required ? (
          <span key={`error-${className}`} style={requiredStyle}>
            {" "}
            *
          </span>
        ) : null,
      ]}
      floatingLabelStyle={floatingLabelStyle}
      iconStyle={{ fill: "#484848" }}
      underlineStyle={{ ...underlineFocusBaseStyle, ...underlineStyle }}
      hintStyle={{ ...hintBaseStyle, ...hintStyle }}
      {...rest}
    >
      {dropDownData && renderSelectMenuItems()}
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
