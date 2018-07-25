import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { deleteForm } from "egov-ui-kit/redux/form/actions";
import {
  UsageInformationHOC,
  PropertyAddressHOC,
  OwnershipTypeHOC,
  OwnerInfoHOC,
  InstitutionHOC,
  OwnerInformation,
  InstitutionAuthorityHOC,
} from "./components/Forms";
import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
import FloorsDetails from "./components/Forms/FloorsDetails";
import PlotDetails from "./components/Forms/PlotDetails";
import { getPlotAndFloorFormConfigPath } from "./utils/assessInfoFormManager";
// import { getOwnerInfoFormConfigPath } from "./utils/ownerInfoFormManager";
import isEmpty from "lodash/isEmpty";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-kit/redux/app/actions";
import formHoc from "egov-ui-kit/hocs/form";
import { validateForm } from "egov-ui-kit/redux/form/utils";
import { displayFormErrors } from "egov-ui-kit/redux/form/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { prepareFormData } from "egov-ui-kit/utils/commons";
import get from "lodash/get";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndexArray: [],
    draftRequest: {
      draft: {
        tenantId: localStorage.getItem("tenant-id"),
        userId: get(JSON.parse(localStorage.getItem("user-info")), "id"),
        draftRecord: {},
      },
    },
  };

  callDraft = async () => {
    let { draftRequest, selected } = this.state;
    // if (formArray) {
    const { form } = this.props;
    if (!draftRequest.draft.id) {
      draftRequest.draft.draftRecord = {
        selectedTabIndex: selected + 1,
        ...form,
      };
      try {
        let draftResponse = await httpRequest("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);

        this.setState({
          draftRequest: { draft: draftResponse.drafts[0] },
        });
      } catch (e) {
        alert(e);
      }
    } else {
      draftRequest.draft.draftRecord = {
        selectedTabIndex: selected + 1,
        ...form,
      };
      try {
        let draftResponse = await httpRequest("pt-services-v2/drafts/_update", "_update", [], draftRequest);
        this.setState({
          draftRequest: { draft: draftResponse.drafts[0] },
        });
      } catch (e) {
        alert(e);
      }
    }
    // }
  };

  addOwner = () => {
    const { ownerInfoArr } = this.state;
    const index = ownerInfoArr.length;
    const OwnerInfoHOC = formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${index}`, path: "PropertyTaxPay" })(OwnerInformation);
    this.setState({
      ownerInfoArr: [...this.state.ownerInfoArr, { index, Component: OwnerInfoHOC }],
    });
  };

  componentDidMount() {
    this.addOwner();
  }

  handleRemoveOwner = (index, formKey) => {
    const { ownerInfoArr } = this.state;
    const updatedOwnerArr = [...ownerInfoArr];
    updatedOwnerArr.splice(ownerInfoArr.findIndex((ownerData) => ownerData.index === index), 1);
    this.setState({
      ownerInfoArr: updatedOwnerArr,
    });
    this.props.deleteForm(formKey);
  };

  renderPlotAndFloorDetails = (fromReviewPage) => {
    let { basicInformation, plotDetails, floorDetails_0 } = this.props.form;
    if (plotDetails && floorDetails_0 && floorDetails_0.fields.builtArea) {
      let uom = plotDetails.fields && plotDetails.fields.measuringUnit && plotDetails.fields.measuringUnit.value;
      floorDetails_0.fields.builtArea.floatingLabelText = `Built Area(${uom})`;
    }

    if (basicInformation && basicInformation.fields.typeOfUsage.value && basicInformation.fields.typeOfBuilding.value) {
      let pathFormKeyObject = getPlotAndFloorFormConfigPath(basicInformation.fields.typeOfUsage.value, basicInformation.fields.typeOfBuilding.value);
      return !isEmpty(pathFormKeyObject) ? (
        <div>
          {pathFormKeyObject.hasPlot && <PlotDetails component={pathFormKeyObject.plotForm} disabled={fromReviewPage} />}
          {pathFormKeyObject.hasFloor && <FloorsDetails componentDetails={pathFormKeyObject.floorObject} disabled={fromReviewPage} />}
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

  getOwnerDetails = (ownerType) => {
    const { selected } = this.state;
    const isReviewPage = selected === 3;
    switch (ownerType) {
      case "IND":
        return <OwnerInfoHOC disabled={isReviewPage} />;
      case "MUL":
        return (
          <MultipleOwnerInfoHOC
            addOwner={this.addOwner}
            handleRemoveOwner={this.handleRemoveOwner}
            ownerDetails={this.state.ownerInfoArr}
            disabled={isReviewPage}
          />
        );
      case "Institution":
        return (
          <div>
            <InstitutionHOC disabled={isReviewPage} />
            <InstitutionAuthorityHOC cardTitle={<div>Details of authorised person</div>} disabled={isReviewPage} />
          </div>
        );
      default:
        return null;
    }
  };

  renderStepperContent = (selected, fromReviewPage) => {
    const { renderPlotAndFloorDetails, getOwnerDetails } = this;
    switch (selected) {
      case 0:
        return <PropertyAddressHOC disabled={fromReviewPage} />;
      case 1:
        return (
          <div>
            <UsageInformationHOC disabled={fromReviewPage} />
            {renderPlotAndFloorDetails(fromReviewPage)}
          </div>
        );
      case 2:
        const ownerType = this.getSelectedCombination(this.props.form, "ownershipType", ["typeOfOwnership"]);
        //const OwnerConfig = this.getConfigFromCombination("Institution", getOwnerInfoFormConfigPath);
        // const { ownerForm: Institution } = OwnerConfig;
        return (
          <div>
            <OwnershipTypeHOC disabled={fromReviewPage} />
            {getOwnerDetails(ownerType)}
          </div>
        );
      case 3:
        return (
          <div>
            <ReviewForm
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { callDraft, pay } = this;
    const { selected, formValidIndexArray } = this.state;
    const { displayFormErrorsAction, form } = this.props;
    switch (selected) {
      //validating property address is validated
      case 0:
        const isProperyAddressFormValid = validateForm(form.propertyAddress);
        if (isProperyAddressFormValid) {
          callDraft();
          this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
        } else {
          displayFormErrorsAction("propertyAddress");
        }
        break;
      //validating basic information,plotdetails and if plot details having floors
      case 1:
        const { basicInformation, plotDetails } = form;
        if (basicInformation) {
          const isBasicInformationFormValid = validateForm(basicInformation);
          if (isBasicInformationFormValid) {
            if (plotDetails) {
              const isPlotDetailsFormValid = validateForm(plotDetails);
              if (isPlotDetailsFormValid) {
                if (get(plotDetails, "fields.floorCount")) {
                  let floorValidation = true;
                  for (const variable in form) {
                    if (variable.search("customSelect") !== -1 || variable.search("floorDetails") !== -1) {
                      const isDynamicFormValid = validateForm(form[variable]);
                      if (!isDynamicFormValid) {
                        displayFormErrorsAction(variable);
                        floorValidation = false;
                      }
                    }
                  }
                  if (floorValidation) {
                    callDraft();
                    this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
                  }
                } else {
                  callDraft();
                  this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
                }
              } else {
                displayFormErrorsAction("plotDetails");
              }
            }
          } else {
            displayFormErrorsAction("basicInformation");
          }
        }
        break;
      case 2:
        const { ownershipType } = form;
        if (ownershipType) {
          const isOwnershipTypeFormValid = validateForm(ownershipType);
          if (isOwnershipTypeFormValid) {
            const ownershipTypeSelected = get(ownershipType, "fields.typeOfOwnership.value");
            if (ownershipTypeSelected === "IND") {
              const { ownerInfo } = form;
              const isOwnerInfoFormValid = validateForm(ownerInfo);
              if (isOwnerInfoFormValid) {
                callDraft();
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
              } else {
                displayFormErrorsAction("ownerInfo");
              }
            } else if (ownershipTypeSelected === "MUL") {
              let ownerValidation = true;
              for (const variable in form) {
                if (variable.search("ownerInfo_") !== -1) {
                  const isDynamicFormValid = validateForm(form[variable]);
                  if (!isDynamicFormValid) {
                    displayFormErrorsAction(variable);
                    ownerValidation = false;
                  }
                }
              }
              if (ownerValidation) {
                callDraft();
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
              }
            } else if (ownershipTypeSelected === "Institution") {
              const { institutionDetails, institutionAuthority } = form;
              const isInstitutionDetailsFormValid = validateForm(institutionDetails);
              let institutionFormValid = true;
              if (!isInstitutionDetailsFormValid) {
                displayFormErrorsAction("institutionDetails");
                institutionFormValid = false;
              }
              const isInstitutionAuthorityFormValid = validateForm(institutionAuthority);
              if (!isInstitutionAuthorityFormValid) {
                displayFormErrorsAction("institutionAuthority");
                institutionFormValid = false;
              }
              if (institutionFormValid) {
                callDraft();
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
              }
            }
          } else {
            displayFormErrorsAction("ownershipType");
          }
        }

        break;
      case 3:
        pay();
        // setRoute("/property-tax/payment-success");
        break;
    }
    // if (index <= 3) {
    //   this.setState({ selected: index });
    // } else if (index === 4) {
    //   // setRoute("/property-tax/payment-success");
    // }
  };

  formPropertyTaxPayObject = () => {
    const { form } = this.props;
    let Properties = [];
    Properties[0] = {};
    for (var variable in form) {
      if (form.hasOwnProperty(variable)) {
        const partialPropertyTaxPayObject = prepareFormData(form[variable]);
        Properties[0] = {
          ...Properties[0],
          ...partialPropertyTaxPayObject.Properties[0],
        };
      }
    }
    return Properties;
  };

  pay = () => {
    const PropertyTaxObject = this.formPropertyTaxPayObject();
    console.log(PropertyTaxObject);
  };

  onTabClick = (index) => {
    const { formValidIndexArray } = this.state;
    // form validation checks needs to be written here
    if (formValidIndexArray.indexOf(index)) {
      this.setState({ selected: index });
    } else {
      alert("Please fill required tabs");
    }
  };

  render() {
    const { renderStepperContent } = this;
    const { selected, ownerInfoArr, formValidIndexArray } = this.state;
    const fromReviewPage = selected === 3;
    return (
      <div className="wizard-form-main-cont">
        <WizardComponent
          content={renderStepperContent(selected, fromReviewPage)}
          onTabClick={this.onTabClick}
          selected={selected}
          formValidIndexArray={formValidIndexArray}
          updateIndex={this.updateIndex}
          backLabel="GO BACK"
          nextLabel={selected === 3 ? "PAY" : "NEXT"}
          ownerInfoArr={ownerInfoArr}
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
    deleteForm: (formKey) => dispatch(deleteForm(formKey)),
    setRoute: (route) => dispatch(setRoute(route)),
    displayFormErrorsAction: (formKey) => dispatch(displayFormErrors(formKey)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
