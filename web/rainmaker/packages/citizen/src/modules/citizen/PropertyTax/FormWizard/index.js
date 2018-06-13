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
import FloorsDetails from "./components/Forms/FloorsDetails";
import PlotDetails from "./components/Forms/PlotDetails";
import { getPlotAndFloorFormConfigPath } from "./utils";
import isEmpty from "lodash/isEmpty";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
  };

  renderPlotAndFloorDetails = (usage, propertyType) => {
    let { basicInformation } = this.props.form;
    // console.log(basicInformation);
    if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
      let pathFormKeyObject=getPlotAndFloorFormConfigPath(basicInformation.fields.typeOfUsage.value,basicInformation.fields.typeOfBuilding.value);
      return !isEmpty(pathFormKeyObject)?(<div>
          {pathFormKeyObject.hasPlot && <PlotDetails component={pathFormKeyObject.plotForm}/>}
          {pathFormKeyObject.hasFloor && <FloorsDetails path={pathFormKeyObject.path} component={pathFormKeyObject.floorForm}  />}
        </div>):null;
    }
    else {
      return null;
    }
  };

  // renderDynamicForms = (combination) => {
  //   // const basePath = "config/forms/specs/PropertyTaxPay";
  //
  //   const moduleName = "PropertyTaxPay";
  //   return combination ? (
  //     <DependantFormHOC
  //       formsToAdd={combinationToFormkeyMapping[combination]}
  //       moduleName={moduleName}
  //       combination={combination}
  //       removeForm={(formKey) => this.props.removeForm(formKey)}
  //     />
  //   ) : null;
  // };

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
        let selection = this.getSelectedCombination(this.props.form, "ownershipType", ["typeOfOwnership"]);
        return (
          <div>
            <OwnershipTypeHOC />
            {selection === "MUL" ? <MultipleOwnerInfoHOC /> : <OwnerInfoHOC />}

            {/* <ExemptionCategoryHOC /> */}
          </div>
        );

      case 3:
        return (
          <div>
            <ReviewForm updateIndex={this.updateIndex} stepZero={this.renderStepperContent(0)} stepOne={this.renderStepperContent(1)} stepTwo={this.renderStepperContent(2)}/>
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { selected } = this.state;
    this.setState({ selected: index });
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
        <WizardComponent content={renderStepperContent(selected)} onTabClick={this.onTabClick} selected={selected} updateIndex={this.updateIndex} />
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
