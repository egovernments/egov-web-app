import React from "react";
import { Button,TimeLine ,Card} from "components";
import OwnerDetails from "./components/OwnerDetails";
import PropertyAddress from "./components/PropertyAddress";
import TaxAssessmentDetailsOne from "./components/TaxAssessmentDetailsOne";
import TaxAssessmentDetailsTwo from "./components/TaxAssessmentDetailsTwo";
import FullOrPartialExemption from "./components/FullOrPartialExemption";

import "./index.css";

let steps=[{
  labelChildren:"",
  // prop:{
  //   style:{
  //     background:"rgb(254, 122, 81)"
  //   }
  // }
},
{
labelChildren:""
},
{
labelChildren:""
},
{
labelChildren:""
},
{
labelChildren:""
}]

class AssessmentFormWizard extends React.Component
{
  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex<5) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
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
        return <OwnerDetails/>;
      case 1:
        return <PropertyAddress/>;
      case 2:
        return <TaxAssessmentDetailsOne/>;
      case 3:
          return <TaxAssessmentDetailsTwo/>;
      default:
        return <FullOrPartialExemption/>;
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
            activeStep:stepIndex,
            style:{background:"rgb(0, 188, 209)"}
          }}
          steps={steps}
        />

        <div>
              <Card style={{margin:"24px 8px"}} textChildren={this.getStepContent(stepIndex)}/>
              <div className="flexbox-container">
                <div className="flex-item">
                  <Button
                    onClick={this.handlePrev}
                    fullWidth={true}
                    primary={true}
                    label="GO BACK"
                  />
                </div>
                <div className="flex-item">
                  <Button
                    onClick={this.handleNext}
                    fullWidth={true}
                    label="NEXT"
                  />
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default AssessmentFormWizard;
