import React from "react";
import { Label } from "components";
import "./index.css";

const tabs = [
  {
    heading: "Property Address",
  },
  {
    heading: "Basic Information",
  },
  {
    heading: "Tax Assessment",
  },
  {
    heading: "Owner Information",
  },
];

const selectedTabStyle = {
  background: "#fe7a51",
};

const defaultTabStyle = {
  background: "#b3b3b3",
};

const BreadCrumbs = ({ onTabClick, selected }) => {
  return (
    <div className="breadcrumb flat">
      {tabs.map((tab, index) => {
        return (
          <a onClick={() => onTabClick(index)} key={index} style={selected === index ? selectedTabStyle : defaultTabStyle} href={`#${index}`}>
            <div className="breadcrumb-tab">
              <Label label={tab.heading} labelStyle={{ letterSpacing: 0.6 }} color={"#fff"} bold={true} />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
