import React from "react";
import { InfoTable } from "../../../../components";
import "./index.css";

const labelContainer = "feedback-info-label-container";
const valueContainer = "feedback-info-value-container";
const itemContainer = "feedback-info-item-container";
const InfoTableComponent = ({ items }) => {
  return <InfoTable items={items} labelContainer={labelContainer} valueContainer={valueContainer} itemContainer={itemContainer} />;
};

export default InfoTableComponent;
