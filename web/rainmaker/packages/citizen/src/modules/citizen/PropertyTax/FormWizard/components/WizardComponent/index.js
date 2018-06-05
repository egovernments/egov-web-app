import React from "react";
import { Label, Button } from "components";
import BreadCrumbs from "./components/BreadCrumbs";
import "./index.css";

const WizardComponent = ({ content, onTabClick, selected, handlePrev, handleNext }) => {
  return (
    <div className="wizard-cont">
      <Label
        label="Assessment Form"
        containerStyle={{ padding: "24px 0 16px 0" }}
        dark={true}
        bold={true}
        labelStyle={{ letterSpacing: 0 }}
        fontSize={"20px"}
      />
      <BreadCrumbs onTabClick={onTabClick} selected={selected} />
      <div className="wizard-content clearfix">{content}</div>
      <div className="wizard-footer col-xs-12" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right" }}>
          <Button
            label="GO BACK"
            onClick={handlePrev}
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
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default WizardComponent;
