import React from "react";
import "./index.css";
import { ButtonGroup } from "../../../../components";

const defaultBGColor = "transparent";
const BGColor = "#f5a623";

const labelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#ffffff",
  fontSize: "14.5px",
  letterSpacing: "0.7px",
  padding: "0 14px",
};

const defaultStyle = {
  border: "1px solid #f5a623",
  borderRadius: "3px",
  marginRight: "4.44%",
  height: "auto",
  lineHeight: "30px",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "500",
  color: "#484848",
  fontSize: "14.5px",
  letterSpacing: "0.7px",
  padding: "0 14px",
};

const ButtonToggleComponent = ({ items, onClick, selected }) => {
  return (
    <ButtonGroup
      items={items}
      onClick={onClick}
      selected={selected}
      defaultStyle={defaultStyle}
      defaultLabelStyle={defaultLabelStyle}
      BGColor={BGColor}
      defaultBGColor={defaultBGColor}
      labelStyle={labelStyle}
    />
  );
};

export default ButtonToggleComponent;
