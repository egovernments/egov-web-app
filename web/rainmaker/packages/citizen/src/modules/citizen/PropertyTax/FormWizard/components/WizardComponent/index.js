import React from "react";
import { Button } from "components";
import BreadCrumbs from "./components/BreadCrumbs";
import "./index.css";

const WizardComponent = ({ content, onTabClick, selected, updateIndex }) => {
  return (
    <div className="wizard-cont">
      <BreadCrumbs onTabClick={onTabClick} selected={selected} />
      <div className="wizard-content clearfix">{content}</div>
      <div className="wizard-footer col-xs-12" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right" }}>
          <Button
            label="GO BACK"
            onClick={() => {
              updateIndex(selected - 1);
            }}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "36%" }}
          />
          <Button
            label="NEXT"
            style={{ width: "36%" }}
            backgroundColor="#fe7a51"
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
            buttonStyle={{ border: 0 }}
            onClick={() => {
              updateIndex(selected + 1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WizardComponent;
