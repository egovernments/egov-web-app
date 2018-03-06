import React, { Component } from "react";
import "./index.css";
import { ButtonGroup } from "../../../../components";

const defaultBGColor = "transparent";
const BGColor = "#f5a623";
const labelStyle = {
  textTransform: "none",
  fontWeight: "900",
  color: "#ffffff",
};

const defaultStyle = {
  border: "1px solid #f5a623",
  borderRadius: "3px",
  marginRight: "5px",
  height: "auto",
  lineHeight: "30px",
};

const defaultLabelStyle = {
  textTransform: "none",
  fontWeight: "900",
  color: "#484848",
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
