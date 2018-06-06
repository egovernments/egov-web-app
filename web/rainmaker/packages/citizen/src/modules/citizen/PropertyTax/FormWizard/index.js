import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Screen } from "modules/common";
import {
  BasicInformationHOC,
  PropertyAddressHOC,
  PlotInformationHOC,
  OwnershipTypeHOC,
  OwnerInfoHOC,
  ExemptionCategoryHOC,
} from "./components/Forms";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
  };

  getFormContent = (index) => {
    switch (index) {
      case 0:
        return {
          component: <PropertyAddressHOC />,
        };
      case 1:
        return {
          component: <BasicInformationHOC />,
        };
      case 2:
        return {
          component: <PlotInformationHOC />,
        };
      case 3:
        return {
          component: (
            <div>
              <OwnershipTypeHOC />
              <OwnerInfoHOC />
              <ExemptionCategoryHOC />
            </div>
          ),
        };
      default:
        return {
          component: null,
        };
    }
  };

  handleNext = () => {
    const { selected } = this.state;
    if (selected < 3) {
      this.setState({ selected: selected + 1 });
    } else {
      this.props.history.push("/citizen/pt-payment/review-property");
    }
  };

  handlePrev = () => {
    const { selected } = this.state;
    if (selected > 0) {
      this.setState({ selected: selected - 1 });
    }
  };

  onTabClick = (index) => {
    this.setState({ selected: index });
  };

  render() {
    const { selected } = this.state;
    const { component } = this.getFormContent(selected);
    return (
      <div className="wizard-form-main-cont">
        <WizardComponent
          content={component}
          onTabClick={this.onTabClick}
          selected={selected}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
        />
      </div>
    );
  }
}

export default FormWizard;
