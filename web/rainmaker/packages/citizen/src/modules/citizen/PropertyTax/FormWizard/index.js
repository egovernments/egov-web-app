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
import DuplicateCardsHOC from "./components/DuplicateCardsHOC";
import combinationToFormkeyMapping from "./components/FormManager";
import { connect } from "react-redux";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
  };

  renderPlotAndFloorDetails = (usage, propertyType) => {
    return null;
  };

  renderDynamicForms = (combination) => {
    // const basePath = "config/forms/specs/PropertyTaxPay";

    const moduleName = "PropertyTaxPay";
    return combination ? (
      <DependantFormHOC
        formsToAdd={combinationToFormkeyMapping[combination]}
        moduleName={moduleName}
        combination={combination}
        removeForm={(formKey) => this.props.removeForm(formKey)}
      />
    ) : null;
  };

  renderDuplicateForms = (formKey) => {
    console.log(formKey);
    return <DuplicateCardsHOC formKey={formKey} />;
  };

  getSelectedCombination = (form, formKey, fieldKeys) => {
    return (
      form[formKey] &&
      form[formKey].fields &&
      fieldKeys.reduce((result, current) => {
        if (form[formKey].fields[current].value) {
          result += form[formKey].fields[current].value;
        } else {
          result = "";
        }
        return result;
      }, "")
    );
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
        combination = this.getSelectedCombination(form, "ownershipType", ["typeOfOwnership"]);
        console.log(combination);
        return {
          component: (
            <div>
              <OwnershipTypeHOC />
              {combination === "MUL" ? (
                <div>
                  {[...this.formMultipleOwner()]}
                  <div className="pt-add-owner-btn" onClick={this.addOwner} style={{ color: "#fe7a51", float: "right" }}>
                    + Add Owner
                  </div>
                </div>
              ) : (
                <OwnerInfoHOC />
              )}

              {/* <ExemptionCategoryHOC /> */}
            </div>
          ),
        };

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

  addOwner = () => {
    console.log("clicked");
    this.setState({
      ownerInfoArr: this.formMultipleOwner(),
    });
  };

  formMultipleOwner = () => {
    let ownerArr = [this.state.ownerInfoArr];
    const owner = this.renderDuplicateForms("ownerInfo");
    // ownerArr.push(<OwnerInfoHOC />);
    ownerArr.push(owner);
    return ownerArr;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
