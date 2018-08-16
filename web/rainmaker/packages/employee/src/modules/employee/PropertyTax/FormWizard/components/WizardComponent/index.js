import React from "react";
import { Button } from "components";
import BreadCrumbsForm from "./components/BreadCrumbsForm";
import Declaration from "./components/Declaration";
import Label from "egov-ui-kit/utils/translationNode";
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
  history,
}) => {
  return (
    <div className="wizard-cont">
      <BreadCrumbsForm onTabClick={onTabClick} selected={selected} formValidIndexArray={formValidIndexArray} />
      {header}
      <div className="wizard-content clearfix">{content}</div>
      {footer}
      <div className="wizard-footer col-sm-10" style={{ textAlign: "right" }}>
        <div className="col-xs-6" style={{ float: "right" }}>
          <Button
            label={<Label buttonLabel={true} label={backLabel} color="#fe7a51" />}
            onClick={() => {
              selected - 1 === -1 ? history.push("/property-tax") : onTabClick(selected - 1);
            }}
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
            buttonStyle={{ border: "1px solid #fe7a51" }}
            style={{ marginRight: 45, width: "36%" }}
          />
          <Button
            label={<Label buttonLabel={true} label={nextLabel} color="#fff" />}
            style={{ width: "36%" }}
            backgroundColor="#fe7a51"
            labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fff" }}
            buttonStyle={{ border: 0 }}
            onClick={
              selected === 4
                ? onPayButtonClick
                : () => {
                    updateIndex(selected + 1);
                  }
            }
          />
        </div>
      </div>
      {/*<Declaration open={dialogueOpen} closeDialogue={closeDialogue} selected={selected} updateIndex={updateIndex}/>*/}
    </div>
  );
};

export default WizardComponent;
