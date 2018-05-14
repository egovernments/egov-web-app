import React from "react";
import {TimeLine} from "components";
import { Button } from "components";
import "./index.css";

let steps=[{

},
{

},
{

},
{

},
{

}]

class AssessmentFormWizard extends React.Component
{
  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render()
  {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div>
        <TimeLine
          stepperProps={{
            activeIndex:{stepIndex}
          }}
          steps={steps}
        />

        <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div className="container">
                <div className="row">
                <div className="col-xs-6">
                  <Button
                    style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
                    onClick={this.handlePrev}
                    fullWidth={true}
                    primary={true}
                    label="GO BACK"
                  />
                </div>
                <div className="col-xs-6">
                  <Button
                    style={{ boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }}
                    onClick={this.handleNext}
                    fullWidth={true}
                    primary={false}
                    label="NEXT"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default AssessmentFormWizard;
