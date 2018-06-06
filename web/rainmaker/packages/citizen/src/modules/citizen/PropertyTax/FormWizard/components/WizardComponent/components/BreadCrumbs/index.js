import React from "react";
import { Label, Icon } from "components";
import "./index.css";

const tabs = [
  {
    heading: "Property Address",
    icon: {
      name: "home",
      action: "action",
    },
  },
  {
    heading: "Basic Information",
    icon: {
      name: "assignment",
      action: "action",
    },
  },
  {
    heading: "Tax Assessment",
    icon: {
      name: "home",
      action: "action",
    },
  },
  {
    heading: "Owner Information",
    icon: {
      name: "person",
      action: "social",
    },
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
              <Icon action={tab.icon.action} name={tab.icon.name} color={"#fff"} style={{ marginRight: 10 }} />
              <Label label={tab.heading} labelStyle={{ letterSpacing: 0.6 }} color={"#fff"} bold={true} />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
