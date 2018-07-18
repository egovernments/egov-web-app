import React from "react";
import { Label, Icon } from "components";
import "./index.css";

const checkIconStyle = {
  width: 14,
  height: 14,
};

const tabs = [
  {
    heading: "Property Address",
    // icon: {
    //   name: "home",
    //   action: "action",
    // },
    formValid: true,
  },
  {
    heading: "Assessment Information",
    // icon: {
    //   name: "assignment",
    //   action: "action",
    // },
    formValid: false,
  },
  {
    heading: "Owner Information",
    // icon: {
    //   name: "person",
    //   action: "social",
    // },
    formValid: false,
  },
  {
    heading: "Review & Pay",
    // icon: {
    //   name: "attach-money",
    //   action: "editor",
    // },
    formValid: false,
  },
];

const selectedTabStyle = {
  background: "#fe7a51",
};

const defaultTabStyle = {
  background: "#b3b3b3",
};

const formValidStyle = {
  background: "#3d4951",
};

const BreadCrumbsForm = ({ onTabClick, selected, formValidIndex }) => {
  return (
    <div className="breadcrumb-form flat">
      {tabs.map((tab, index) => {
        return (
          <a
            onClick={() => onTabClick(index)}
            key={index}
            style={formValidIndex === index ? formValidStyle : selected === index ? selectedTabStyle : defaultTabStyle}
            href={`#${index}`}
          >
            <div className="breadcrumb-tab">
              {/* <Icon action={tab.icon.action} name={tab.icon.name} color={"#fff"} style={{ marginRight: 10 }} /> */}
              <div className="tab-icon">
                {formValidIndex === index ? (
                  <Icon style={checkIconStyle} action="navigation" name="check" color="#22b25f" />
                ) : (
                  <span className="form-tab-index" style={selected === index ? { color: "#fe7a51" } : { color: "#b3b3b3" }}>
                    {index + 1}
                  </span>
                )}
              </div>
              <Label label={tab.heading} labelStyle={{ letterSpacing: 0.6 }} color={"#fff"} bold={true} />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default BreadCrumbsForm;
