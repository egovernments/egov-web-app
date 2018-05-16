import React from "react";
import { Button, TimeLine, Card, Icon } from "components";
import Label from "utils/translationNode";
import OwnerDetails from "./components/OwnerDetails";
import PropertyAddress from "./components/PropertyAddress";
import TaxAssessmentDetailsOne from "./components/TaxAssessmentDetailsOne";
import TaxAssessmentDetailsTwo from "./components/TaxAssessmentDetailsTwo";
import FullOrPartialExemption from "./components/FullOrPartialExemption";
import "./index.css";
import { relative } from "path";

const iconStyle = {
  display: "inline-block",
};

let steps = [
  {
    labelChildren: "",
    // prop:{
    //   style:{
    //     background:"rgb(254, 122, 81)"
    //   }
    // }
  },
  {
    labelChildren: "",
  },
  {
    labelChildren: "",
  },
  {
    labelChildren: "",
  },
  {
    labelChildren: "",
  },
];

class AssessmentFormWizard extends React.Component {
  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    if (stepIndex < 5) {
      this.setState({
        stepIndex: stepIndex + 1,
      });
    }
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return {
          component: <OwnerDetails />,
          trianglePos: "1%",
          iconName: "person",
          iconAction: "social",
          header: "Owner Details",
        };
      case 1:
        return {
          component: <PropertyAddress />,
          trianglePos: "24%",
          iconName: "home",
          iconAction: "action",
          header: "Property Address",
        };
      case 2:
        return {
          component: <TaxAssessmentDetailsOne />,
          trianglePos: "47%",
          iconName: "person",
          iconAction: "social",
          header: "Tax Assessment Details - 1",
        };
      case 3:
        return {
          component: <TaxAssessmentDetailsTwo />,
          trianglePos: "70%",
          iconName: "person",
          iconAction: "social",
          header: "Tax Assessment Details - 2",
        };
      default:
        return {
          component: <FullOrPartialExemption />,
          trianglePos: "93%",
          iconName: "person",
          iconAction: "social",
          header: "Full/ Partial Exemption (if any)",
        };
    }
  }

  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: "0 16px" };

    return (
      <div>
        <TimeLine
          stepperProps={{
            activeStep: stepIndex,
            style: { background: "rgb(0, 188, 209)" },
          }}
          steps={steps}
        />

        <div>
          <Card
            style={{ margin: "24px 8px" }}
            textChildren={
              <div style={{ position: "relative" }}>
                <div style={{ left: this.getStepContent(stepIndex).trianglePos }} className="card-triangle" />
                <div className="pt-form-card-header-cont">
                  <Icon name={this.getStepContent(stepIndex).iconName} action={this.getStepContent(stepIndex).iconAction} style={iconStyle} />
                  <Label
                    label={this.getStepContent(stepIndex).header}
                    bold={true}
                    dark={true}
                    labelStyle={{ letterSpacing: 0.6 }}
                    containerStyle={{ display: "inline-block", marginLeft: 16 }}
                  />
                </div>
                {this.getStepContent(stepIndex).component}
              </div>
            }
          />
          <div className="flexbox-container">
            <div className="flex-item">
              <Button onClick={this.handlePrev} fullWidth={true} primary={true} label="GO BACK" />
            </div>
            <div className="flex-item">
              <Button onClick={this.handleNext} fullWidth={true} label="NEXT" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssessmentFormWizard;
