import React from "react";
import { InfoTable } from "../../../../components";
import "./index.css";

const labelParentClass = "feedback-info-label-container";
const valueParentClass = "feedback-info-value-container";
const parentClass = "feedback-info-item-container";
const InfoTableComponent = ({ items }) => {
  return <InfoTable items={items} labelParentClass={labelParentClass} valueParentClass={valueParentClass} parentClass={parentClass} />;
};

export default InfoTableComponent;
