import React from "react";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import PropTypes from "prop-types";

const TimeLineUi = ({ divStyle, stepperProps, steps }) => {
  return (
    <div {...divStyle}>
      <Stepper {...stepperProps}>
        {steps.map((step, stepIndex) => {
          return (
            <Step key={stepIndex} {...step.props}>
              <StepLabel {...step.labelProps}>{step.labelChildren}</StepLabel>
              <StepContent {...step.contentProps}>{step.contentChildren}</StepContent>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default TimeLineUi;

TimeLineUi.propTypes = {
  header: PropTypes.object,
  mediaOverlay: PropTypes.element,
  mediaChildren: PropTypes.element,
  title: PropTypes.object,
  textChildren: PropTypes.element,
  actionChildren: PropTypes.element,
};
