import React from "react";
import { Button } from "components";
import BreadCrumbsForm from "./components/BreadCrumbsForm";
import Declaration from "./components/Declaration";
import "./index.css";

const WizardComponent = ({
  content,
  header,
  footer,
  onTabClick,
  selected,
  closeDialogue,
  dialogueOpen,
  onPayButtonClick,
  formValidIndexArray,
  updateIndex,
  backLabel,
  nextLabel,
}) => {
  return (
    <div className="wizard-cont">
      <BreadCrumbsForm onTabClick={onTabClick} selected={selected} formValidIndexArray={formValidIndexArray} />
      {header}
      <div className="wizard-content clearfix">{content}</div>
      {footer}
      <div className="wizard-footer col-xs-12" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right" }}>
          <Button
            label={backLabel}
            onClick={() => {
              updateIndex(selected - 1);
            }}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "36%" }}
          />
          <Button
            label={nextLabel}
            style={{ width: "36%" }}
            backgroundColor="#fe7a51"
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
            buttonStyle={{ border: 0 }}
            onClick={() => {updateIndex(selected + 1)}}
          />
        </div>
      </div>
      {/*<Declaration open={dialogueOpen} closeDialogue={closeDialogue} selected={selected} updateIndex={updateIndex}/>*/}
    </div>
  );
};

export default WizardComponent;
