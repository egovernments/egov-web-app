import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import { UsageInformationHOC, PropertyAddressHOC, OwnershipTypeHOC, OwnerInfoHOC } from "./components/Forms";
import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
import FloorsDetails from "./components/Forms/FloorsDetails";
import PlotDetails from "./components/Forms/PlotDetails";
import { getPlotAndFloorFormConfigPath } from "./utils/assessInfoFormManager";
import { getOwnerInfoFormConfigPath } from "./utils/ownerInfoFormManager";
import isEmpty from "lodash/isEmpty";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-kit/redux/app/actions";
// import get from "lodash/get";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndex: 0,
  };

  renderPlotAndFloorDetails = () => {
    let { basicInformation, plotDetails, floorDetails_0 } = this.props.form;
    if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
      let uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
      floorDetails_0.fields.builtArea.floatingLabelText = `Built Area(${uom})`;
    }

    if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
      let pathFormKeyObject = getPlotAndFloorFormConfigPath(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
      return !isEmpty(pathFormKeyObject) ? (
        <div>
          {pathFormKeyObject.hasPlot && <PlotDetails component={pathFormKeyObject.plotForm} />}
          {pathFormKeyObject.hasFloor && <FloorsDetails componentDetails={pathFormKeyObject.floorObject} />}
        </div>
      ) : null;
    } else {
      return null;
    }
  };

  getConfigFromCombination = (combination, fetchConfigurationFn) => {
    let configObject = fetchConfigurationFn(combination);
    return configObject;
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
        const selection = this.getSelectedCombination(this.props.form, "ownershipType", ["typeOfOwnership"]);
        const OwnerConfig = this.getConfigFromCombination("Institution", getOwnerInfoFormConfigPath);
        const { ownerForm: Institution } = OwnerConfig;
        return (
          <div>
            <OwnershipTypeHOC />
            {selection === "MUL" ? (
              <MultipleOwnerInfoHOC removeForm={this.props.removeForm} />
            ) : selection === "Institution" ? (
              <div>
                <Institution />
                <OwnerInfoHOC cardTitle={<div>Details of authorised person</div>} />
              </div>
            ) : (
              <OwnerInfoHOC />
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <ReviewForm
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0)}
              stepOne={this.renderStepperContent(1)}
              stepTwo={this.renderStepperContent(2)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { setRoute } = this.props;
    if (index <= 3) {
      this.setState({ selected: index });
    } else if (index === 4) {
      setRoute("/property-tax/payment-success");
    }
  };

  onTabClick = (index) => {
    // form validation checks needs to be written here
    this.setState({ selected: index });
  };

  render() {
    const { renderStepperContent } = this;
    const { selected, formValidIndex } = this.state;

    return (
      <div className="wizard-form-main-cont">
        {/* <Label
          label="Assessment Form"
          containerStyle={{ padding: "24px 0px 16px 0", marginLeft: "16px" }}
          dark={true}
          bold={true}
          labelStyle={{ letterSpacing: 0 }}
          fontSize={"20px"}
        /> */}
        <WizardComponent
          content={renderStepperContent(selected)}
          onTabClick={this.onTabClick}
          selected={selected}
          formValidIndex={formValidIndex}
          updateIndex={this.updateIndex}
          backLabel="GO BACK"
          nextLabel={selected === 3 ? "PAY" : "NEXT"}
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
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
