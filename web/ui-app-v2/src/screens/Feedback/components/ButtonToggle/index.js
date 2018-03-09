import React from "react";
import "./index.css";
import { ButtonGroup } from "../../../../components";

const selectedLabelStyle = {
  color: "#ffffff",
};

const selectedStyle = {
  backgroundColor: "#f5a623",
};

const defaultStyle = {
  border: "1px solid #f5a623",
  borderRadius: "3px",
  marginRight: "4.44%",
  height: "auto",
  lineHeight: "30px",
  backgroundColor: "transparent",
  padding: "0 14px",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "600",
  color: "#484848",
  fontSize: "14px",
  letterSpacing: "0.3px",
  padding: 0,
  display: "inline-block",
  lineHeight: 1,
};

const ButtonToggleComponent = ({ items, onClick, selected }) => {
  return (
    <ButtonGroup
      items={items}
      onClick={onClick}
      selected={selected}
      defaultStyle={defaultStyle}
      defaultLabelStyle={defaultLabelStyle}
      selectedStyle={selectedStyle}
      selectedLabelStyle={selectedLabelStyle}
      multiple={true}
    />
  );
};

export default ButtonToggleComponent;
