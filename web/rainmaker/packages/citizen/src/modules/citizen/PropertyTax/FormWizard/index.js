import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Screen } from "modules/common";
import { removeForm } from "egov-ui-kit/redux/form/actions";
import {
  BasicInformationHOC,
  PropertyAddressHOC,
  PlotInformationHOC,
  OwnershipTypeHOC,
  OwnerInfoHOC,
  ExemptionCategoryHOC,
} from "./components/Forms";
import DependantFormHOC from "./components/DependantFormsHOC";
import combinationToFormkeyMapping from "./components/FormManager";
import { connect } from "react-redux";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
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

  getFormContent = (index, form) => {
    switch (index) {
      case 0:
        return {
          component: <PropertyAddressHOC />,
        };
      case 1:
        let combination = this.getSelectedCombination(form, "basicInformation", ["typeOfUsage", "typeOfBuilding"]);
        return {
          component: (
            <div>
              <BasicInformationHOC />
              {combination && this.renderDynamicForms(combination)}
            </div>
          ),
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
    const { component } = this.getFormContent(selected, this.props.form);
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
