import React from "react";
import { Button } from "@material-ui/core";
import { LabelContainer } from "mihy-ui-framework/ui-containers";
import "./index.css";

const buttonStyle = {
  minWidth: "200px",
  height: "48px",
  marginRight: "45px"
};

const getButtonLabelKey = item => {
  switch (item) {
    case "APPROVE":
      return "TL_APPROVER_TRADE_APP_BUTTON_APPROVE";
    case "FORWARD":
      return "TL_FORWARD_BUTTON";
    case "REJECT":
      return "TL_APPROVER_TRADE_APP_BUTTON_REJECT";
    case "APPLY":
      return "TL_APPLY_BUTTON";
    case "CANCEL":
      return "TL_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL";
    case "MARK":
      return "TL_MARK_BUTTON";
  }
};

const Footer = ({
  // activeStep,
  // disabled,
  // onPreviousClick,
  // onNextClick,
  // label1,
  // label2,
  // label3,
  onClick,
  buttons,
  color,
  variant
}) => {
  return (
    <div className="col-xs-12 stepper-footer" style={{ textAlign: "right" }}>
      <div className="col-xs-6" style={{ float: "right", padding: 0 }}>
        {buttons &&
          buttons.map((item, index) => {
            return (
              <Button
                color={color}
                variant={variant}
                style={buttonStyle}
                onClick={() => onClick(item)}
              >
                <LabelContainer
                  labelName={item}
                  labelKey={() => getButtonLabelKey(item)}
                />
              </Button>
            );
          })}
        {/* {label1 && (
          <Button
            disabled={disabled}
            color={color}
            variant={variant}
            style={buttonStyle}
            //onClick={() => onPreviousClick(activeStep)}
          >
            {label1}
          </Button>
        )}
        <Button
          color={color}
          variant={variant}
          style={buttonStyle}
          //onClick={() => onNextClick(activeStep)}
        >
          {label2}
        </Button>
        <Button color={color} variant={variant} style={buttonStyle}>
          {label3}
        </Button> */}
      </div>
    </div>
  );
};

export default Footer;
