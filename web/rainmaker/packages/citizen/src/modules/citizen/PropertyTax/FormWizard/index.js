import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Icon,Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { deleteForm, updateForms } from "egov-ui-kit/redux/form/actions";
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
import set from "lodash/set";
import { fetchFromLocalStorage } from "egov-ui-kit/utils/commons";
import range from "lodash/range";
import queryString from "query-string";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import { fetchGeneralMDMSData } from "egov-ui-kit/redux/common/actions";
import "./index.css";

class FormWizard extends Component {
  state = {
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndexArray: [],
    ownersCount: 0,
    draftRequest: {
      draft: {
        tenantId: localStorage.getItem("tenant-id"),
        userId: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
        draftRecord: {},
      },
    },
  };

  updateDraftinLocalStorage = (draftInfo) => {
    localStorage.setItem("draftId", draftInfo.id);
    this.setState({
      draftRequest: { draft: draftInfo },
    });
  };

  callDraft = async (formArray = []) => {
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
        const draftInfo = draftResponse.drafts[0];
        this.updateDraftinLocalStorage(draftInfo);
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
        const draftInfo = draftResponse.drafts[0];
        this.updateDraftinLocalStorage(draftInfo);
      } catch (e) {
        alert(e);
      }
    }
    // }
  };

  configOwner = (ownersCount) => formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${ownersCount}`, path: "PropertyTaxPay" })(OwnerInformation);

  addOwner = () => {
    const { ownerInfoArr, ownersCount } = this.state;
    const OwnerInfoHOC = this.configOwner(ownersCount);
    this.setState({
      ownerInfoArr: [...ownerInfoArr, { index: ownersCount, Component: OwnerInfoHOC }],
      ownersCount: ownersCount + 1,
    });
  };

  configOwnersDetailsFromDraft = (ownerFormKeys) => {
    const ownerDetails = [];
    let ownersCount = 0;
    ownerFormKeys.forEach((key) => {
      const currentOwnerIndex = parseInt(key.split("_")[1]);
      if (currentOwnerIndex >= ownersCount) ownersCount = currentOwnerIndex;
      const ownerInfo = this.configOwner(currentOwnerIndex);
      ownerDetails.push({ index: ownersCount, Component: ownerInfo });
    });
    if (!ownerDetails.length) {
      ownersCount = 0;
      const ownerInfo = this.configOwner(ownersCount);
      ownerDetails.push({ index: ownersCount, Component: ownerInfo });
    }
    return {
      ownerDetails,
      totalowners: ownersCount + 1,
    };
  };

  fetchDraftDetails = async (draftId) => {
    const { draftRequest } = this.state;
    const { toggleSpinner } = this.props;
    try {
      toggleSpinner();
      let draftsResponse = await httpRequest(
        "pt-services-v2/drafts/_search",
        "_search",
        [{ key: "userId", value: get(JSON.parse(localStorage.getItem("user-info")), "uuid") }],
        draftRequest
      );
      const currentDraft = draftsResponse.drafts.find((res) => res.id === draftId);
      const ownerFormKeys = Object.keys(currentDraft.draftRecord).filter((formName) => formName.indexOf("ownerInfo_") !== -1);
      const { ownerDetails, totalowners } = this.configOwnersDetailsFromDraft(ownerFormKeys);
      const activeTab = get(currentDraft, "draftRecord.selectedTabIndex", 0);
      this.setState(
        {
          ownerInfoArr: ownerDetails,
          ownersCount: totalowners,
          formValidIndexArray: range(0, activeTab),
          selected: activeTab,
          draftRequest: {
            draft: {
              ...draftRequest.draft,
              id: draftId,
            },
          },
        },
        () => {
          this.props.updatePTForms(currentDraft.draftRecord);
          //this.onTabClick(activeTab)
          toggleSpinner();
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  getAssessmentId = (query, key) => get(queryString.parse(query), key, undefined);

  componentDidMount=async()=> {
    let { search } = this.props.location;
    if (this.props.location.search.split("&").length>3) {
      try {
        let pgUpdateResponse = await httpRequest("pg-service/transaction/v1/_update"+search, "_update", [], {});
        console.log(pgUpdateResponse);
      } catch (e) {
        alert(e);
      }
    }
    const assessmentId = this.getAssessmentId(search, "assessmentId") || fetchFromLocalStorage("draftId");
    const isFreshAssesment = this.getAssessmentId(search, "type");
    if (assessmentId && !isFreshAssesment) this.fetchDraftDetails(assessmentId);
    const { fetchGeneralMDMSData } = this.props;
    let requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [
          {
            moduleName: "PropertyTax",
            masterDetails: [
              {
                name: "Floor",
              },
              {
                name: "OccupancyType",
              },
              {
                name: "OwnerShipCategory",
              },
              {
                name: "OwnerType",
              },
              {
                name: "PropertySubType",
              },
              {
                name: "PropertyType",
              },
              {
                name: "SubOwnerShipCategory",
              },
              {
                name: "UsageCategoryDetail",
              },
              {
                name: "UsageCategoryMajor",
              },
              {
                name: "UsageCategoryMinor",
              },
              {
                name: "UsageCategorySubMinor",
              },
            ],
          },
        ],
      },
    };

    fetchGeneralMDMSData(requestBody, "PropertyTax", [
      "Floor",
      "OccupancyType",
      "OwnerShipCategory",
      "OwnerType",
      "PropertySubType",
      "PropertyType",
      "SubOwnerShipCategory",
      "UsageCategoryDetail",
      "UsageCategoryMajor",
      "UsageCategoryMinor",
      "UsageCategorySubMinor",
    ]);
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
      case "SINGLEOWNER":
        return <OwnerInfoHOC disabled={isReviewPage} />;
      case "MULTIPLEOWNERS":
        return (
          <MultipleOwnerInfoHOC
            addOwner={this.addOwner}
            handleRemoveOwner={this.handleRemoveOwner}
            ownerDetails={this.state.ownerInfoArr}
            disabled={isReviewPage}
          />
        );
      case "INSTITUITIONALPRIVATE":
      case "INSTITUITIONALGOVERNMENT":
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
        return (
          <div>
            <PropertyAddressHOC disabled={fromReviewPage} />
          </div>
        );
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
        const { draft } = this.state.draftRequest;
        const { financialYear } = draft.draftRecord;
        return (
          <div>
            <Label
              containerStyle={{ marginTop: 12 }}
              fontSize="16px"
              color="#484848"
              label="Verify the information you have provided and let us know how much you would like to pay against your bill."
            />

            <ReviewForm
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
              estimationDetails={{}}
              financialYr={financialYear ? financialYear.fields.button : {}}
            />
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { callDraft, pay, estimate } = this;
    const { selected, formValidIndexArray } = this.state;
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
            if (ownershipTypeSelected === "SINGLEOWNER") {
              const { ownerInfo } = form;
              const isOwnerInfoFormValid = validateForm(ownerInfo);
              if (isOwnerInfoFormValid) {
                callDraft();
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
              } else {
                displayFormErrorsAction("ownerInfo");
              }
            } else if (ownershipTypeSelected === "MULTIPLEOWNERS") {
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
            } else if (ownershipTypeSelected.toUpperCase().indexOf("INSTITUITION") !== -1) {
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

  callPGService = async (propertyId = "prop12", assessmentNumber = "assess2", assessmentYear = "2018-19") => {
    const queryObj = [
      { key: "propertyId", value: propertyId },
      { key: "assessmentNumber", value: assessmentNumber },
      { key: "assessmentYear", value: assessmentYear },
    ];
    try {
      const getBill = await httpRequest("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});
      console.log(getBill);
      try {
        const requestBody = {
          Transaction: {
            tenantId: localStorage.getItem("tenant-id"),
            txnAmount: get(getBill, "Bill[0].billDetails[0].totalAmount"),
            module: "PT",
            billId: get(getBill, "Bill[0].id"),
            moduleId: get(getBill, "Bill[0].billDetails[0].consumerCode"),
            productInfo: "Property Tax Payment",
            gateway: "AXIS",
            callbackUrl: window.location.href,
          },
        };
        const goToPaymentGateway = await httpRequest("pg-service/transaction/v1/_create", "_create", [], requestBody);
        console.log(goToPaymentGateway);
        const redirectionUrl=get(goToPaymentGateway,"Transaction.redirectUrl");
        window.location=redirectionUrl;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  estimate = async () => {
    let { prepareFormData } = this.props;
    const { draft } = this.state.draftRequest;
    const { financialYear } = draft.draftRecord;
    try {
      set(prepareFormData, "Properties[0].address.locality.area", "Area3");
      let estimateResponse = await httpRequest("pt-calculator-v2/propertytax/_estimate", "_estimate", [], {
        CalculationCriteria: [
          {
            assessmentYear: financialYear && financialYear.fields.button.value,
            tenantId: localStorage.getItem("tenant-id"),
            property: prepareFormData.Properties[0],
          },
        ],
      });
      console.log(estimateResponse);
    } catch (e) {
      alert(e);
    }
  };

  pay = async () => {
    let { prepareFormData } = this.props;
    try {
      set(prepareFormData, "Properties[0].address.locality.area", "Area3");
      let createPropertyResponse = await httpRequest("pt-services-v2/property/_create", "_create", [], { Properties: prepareFormData.Properties });
      console.log(createPropertyResponse);
    } catch (e) {
      alert(e);
    }
  };
  onTabClick = (index) => {
    const { formValidIndexArray, selected } = this.state;
    // form validation checks needs to be written here
    if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
      this.setState({
        selected: index,
        formValidIndexArray: range(0, index),
      });
    } else {
      alert("Please fill required tabs");
    }
  };

  getHeaderLabel = (selected) => {
    switch (selected) {
      case 0:
        return (
          <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="Please provide information to identify the property." />
        );
      case 1:
        return (
          <Label
            containerStyle={{ marginTop: 12 }}
            fontSize="16px"
            color="#484848"
            label="Please provide information to define the property. The Property Tax will be calculated based on this."
          />
        );
      case 2:
        return (
          <Label
            containerStyle={{ marginTop: 12 }}
            fontSize="16px"
            color="#484848"
            label="Verify the information you have provided and let us know how much you would like to pay against your bill."
          />
        );
    }
  };

  getFooterLabel = (selected) => {
    if (selected === 0) {
      return (
        <div
          className="rainmaker-displayInline"
          style={{ padding: "12px 0px 12px 16px", border: "1px solid #5aaafa", borderLeft: "5px solid #5aaafa" }}
        >
          <Icon action="action" name="info" color="#30588c" />
          <Label
            containerStyle={{ marginLeft: 16 }}
            fontSize="14px"
            color="#484848"
            label="If you do not have an existing Property ID, please visit your Municipal office with your Payment Receipt and you will be provided one."
          />
        </div>
      );
    }
  };

  render() {
    const { renderStepperContent, getHeaderLabel, getFooterLabel } = this;
    const { selected, ownerInfoArr, formValidIndexArray } = this.state;
    const fromReviewPage = selected === 3;
    return (
      <div className="wizard-form-main-cont">
        <WizardComponent
          content={renderStepperContent(selected, fromReviewPage)}
          onTabClick={this.onTabClick}
          selected={selected}
          header={getHeaderLabel(selected)}
          footer={getFooterLabel(selected)}
          formValidIndexArray={formValidIndexArray}
          updateIndex={this.updateIndex}
          backLabel="GO BACK"
          nextLabel={selected === 3 ? "PAY" : "NEXT"}
          ownerInfoArr={ownerInfoArr}
        />
        <Button
          label={"Call Pg"}
          onClick={()=>{this.callPGService()}}
          labelStyle={{ letterSpacing: 0.7, padding: 0, color: "#fe7a51" }}
          buttonStyle={{ border: "1px solid #fe7a51" }}
          style={{ marginRight: 45, width: "36%" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { form, common } = state || {};
  return { form, prepareFormData: common.prepareFormData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteForm: (formKey) => dispatch(deleteForm(formKey)),
    setRoute: (route) => dispatch(setRoute(route)),
    displayFormErrorsAction: (formKey) => dispatch(displayFormErrors(formKey)),
    updatePTForms: (forms) => dispatch(updateForms(forms)),
    toggleSpinner: () => dispatch(toggleSpinner()),
    fetchGeneralMDMSData: (requestBody, moduleName, masterName) => dispatch(fetchGeneralMDMSData(requestBody, moduleName, masterName)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
