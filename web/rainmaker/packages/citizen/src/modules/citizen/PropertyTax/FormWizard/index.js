import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import {Screen} from "modules/common";
import PropertyAddress from "./components/PropertyAddress";
import BasicInformation from "./components/BasicInformation";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
  };

  getFormContent = (index) => {
    switch (index) {
      case 0:
        return {
          component: <PropertyAddress />,
        };
        break;
      case 1:
        return {
          component: <BasicInformation />,
        };
        break;
      default:
        return {
          component: null,
        };
    }
  };

  handleNext = () => {
    const { selected } = this.state;
    if (selected < 4) {
      this.setState({ selected: selected + 1 });
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
