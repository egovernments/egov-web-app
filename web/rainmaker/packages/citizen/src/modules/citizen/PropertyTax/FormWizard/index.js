import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Label } from "components";
import { deleteForm, updatePTForms } from "egov-ui-kit/redux/form/actions";
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
import { fetchFromLocalStorage } from "egov-ui-kit/utils/commons";
import range from "lodash/range"
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndexArray: [],
    ownersCount: 0,
    draftRequest:{
      "draft":{
        "tenantId":localStorage.getItem("tenant-id"),
        "userId":get(JSON.parse(localStorage.getItem("user-info")),"id"),
        "draftRecord":{
        }
     }
   }
  };

  updateDraftinLocalStorage = (draftInfo) => {
    localStorage.setItem("draftId", draftInfo.id)
    this.setState({
      draftRequest:{draft:draftInfo}
    })
  }

  callDraft=async (formArray=[])=>{
    let {draftRequest,selected} =this.state;
    // if (formArray) {
    const { form } = this.props;
    if (!draftRequest.draft.id) {
      draftRequest.draft.draftRecord = {
        selectedTabIndex: selected + 1,
        ...form,
      };
      try {
        let draftResponse=await httpRequest("pt-services-v2/drafts/_create","_cretae",[],draftRequest)
        const draftInfo = draftResponse.drafts[0]
        this.updateDraftinLocalStorage(draftInfo)
      } catch (e) {
        alert(e);
      }
    } else {
      draftRequest.draft.draftRecord = {
        selectedTabIndex: selected + 1,
        ...form,
      };
      try {
        let draftResponse=await httpRequest("pt-services-v2/drafts/_update","_update",[],draftRequest)
        const draftInfo = draftResponse.drafts[0]
        this.updateDraftinLocalStorage(draftInfo)
      } catch (e) {
        alert(e);
      }
    }
    // }
  };

  configOwner = ownersCount => formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${ownersCount}`, path: "PropertyTaxPay" })(OwnerInformation);

  addOwner = () => {
    const { ownerInfoArr, ownersCount } = this.state;
    const OwnerInfoHOC = this.configOwner(ownersCount)
    this.setState({
      ownerInfoArr: [...ownerInfoArr, { index: ownersCount, Component: OwnerInfoHOC }],
      ownersCount: ownersCount + 1,
    });
  };

  configOwnersDetailsFromDraft = ownerFormKeys => {
    const ownerDetails = []
    let ownersCount = -1
    ownerFormKeys.forEach((key) => {
      const currentOwnerIndex = key.split("_")[1]
      if (parseInt(currentOwnerIndex) > ownersCount) ownersCount = currentOwnerIndex
      const ownerInfo = this.configOwner(currentOwnerIndex)
      ownerDetails.push({ index: ownersCount, Component: ownerInfo })
    })
    return {
      ownerDetails,
      totalowners: ownersCount,
    }
  }

  fetchDraftDetails = async (draftId) => {
    const { draftRequest, ownerInfoArr } =this.state;
    try {
      let draftsResponse=await httpRequest("pt-services-v2/drafts/_search","_search",[{key: "userId", value: 23278}],draftRequest)
      const currentDraft = draftsResponse.drafts.find(res => res.id === draftId)
      const ownerFormKeys = Object.keys(currentDraft.draftRecord).filter(formName => formName.indexOf("ownerInfo") !== -1)
      const { ownerDetails, totalowners } = this.configOwnersDetailsFromDraft(ownerFormKeys)
      const activeTab = get(currentDraft, "draftRecord.selectedTabIndex", 0)
      this.setState({
        ownerInfoArr: ownerDetails,
        ownersCount: totalowners,
        formValidIndexArray: range(0, activeTab),
        selected: activeTab,
      }, () => {
        this.props.updatePTForms(currentDraft.draftRecord)
        this.onTabClick(activeTab)
      })
    } catch (e) {
      console.log(e)
    }
  }

  getAssessmentId = (queryString) => {
    console.log("queryString", queryString)
    const assessmentString = queryString.indexOf("?") !== -1 && queryString.split("?")[1].split("&").find(params => params.split("=")[0] === "assessmentId")
    return assessmentString && assessmentString.split("=")[1]
  }

  componentDidMount() {
    let { hash } = this.props.location
    const assessmentId = this.getAssessmentId(hash)
    const draftId =  assessmentId || fetchFromLocalStorage("draftId");
    if (draftId) this.fetchDraftDetails(draftId)
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
    const {callDraft,pay,estimate} =this;
    const { selected,formValidIndexArray } = this.state;
    const { setRoute, displayFormErrorsAction, form } = this.props;
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

        estimate();

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

  estimate=async ()=>{
    let {prepareFormData}=this.props;
    try {
      let estimateResponse=await httpRequest("pt-calculator-v2/propertytax/_estimate","_estimate",[],{CalculationCriteria:[{assessmentYear:"2018-2-19",tenantId:localStorage.getItem("tenant-id"),property:prepareFormData.Properties[0]}]});
      console.log(estimateResponse);
    } catch (e) {
      alert(e);
    }
  }

  pay=async ()=>{
    let {prepareFormData}=this.props;
    try {
      let createPropertyResponse=await httpRequest("pt-services-v2/property/_create","_create",[],{Properties:prepareFormData.Properties});
      console.log(createPropertyResponse);
    } catch (e) {
      alert(e);
    }
  }
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
  const { form,common } = state || {};
  return { form ,prepareFormData:common.prepareFormData};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteForm: (formKey) => dispatch(deleteForm(formKey)),
    setRoute: (route) => dispatch(setRoute(route)),
    displayFormErrorsAction: (formKey) => dispatch(displayFormErrors(formKey)),
    updatePTForms: (forms) => dispatch(updatePTForms(forms)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
