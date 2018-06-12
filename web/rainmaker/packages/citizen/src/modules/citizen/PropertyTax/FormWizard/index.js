import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Screen } from "modules/common";
import { Label } from "components";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import {
  UsageInformationHOC,
  PropertyAddressHOC,
  PlotInformationHOC,
  OwnershipTypeHOC,
  OwnerInfoHOC,
  ExemptionCategoryHOC,
} from "./components/Forms";
import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
import DependantFormHOC from "./components/DependantFormsHOC";
import combinationToFormkeyMapping from "./components/FormManager";
import { connect } from "react-redux";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
  };

  renderPlotAndFloorDetails = (usage, propertyType) => {
    return null;
  };

  renderStepperContent = (selected) => {
    const { renderPlotAndFloorDetails } = this;
    switch (selected) {
      case 0:
        return <PropertyAddressHOC />;
      case 1:
        return (
          <div>
            <UsageInformationHOC />
            {renderPlotAndFloorDetails()}
          </div>
        );
      case 2:
        return (
          <div>
            <OwnershipTypeHOC />
            <OwnerInfoHOC />
            <ExemptionCategoryHOC />
          </div>
        );
      case 3:
        return (
          <div>
            <ReviewForm />
          </div>
        );
      default:
        return null;
    }
  };

  handleNext = () => {
    const { selected } = this.state;
    if (selected < 3) {
      this.setState({ selected: selected + 1 });
    } else {
      this.props.history.push("/citizen/property-tax/review-property");
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
    const { renderStepperContent } = this;
    const { selected } = this.state;
    return (
      <div className="wizard-form-main-cont">
        <Label
          label="Assessment Form"
          containerStyle={{ padding: "24px 0px 16px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        />
        <WizardComponent
          content={renderStepperContent(selected)}
          onTabClick={this.onTabClick}
          selected={selected}
          handleNext={this.handleNext}
          handlePrev={this.handlePrev}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form } = state || {};
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeForm: (formKey) => dispatch(removeForm(formKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWizard);
