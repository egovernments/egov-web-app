import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Icon, Button } from "components";
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
import { setRoute, toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
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
import { fetchGeneralMDMSData, updatePrepareFormDataFromDraft } from "egov-ui-kit/redux/common/actions";
import "./index.css";

const customTitle = window.location.search && `Property Assessment (${window.location.search.split("FY=")[1].split("&")[0]}) : New Property`;

class FormWizard extends Component {
  state = {
    financialYearFromQuery: "",
    dialogueOpen: false,
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndexArray: [],
    ownersCount: 0,
    estimation: [],
    draftRequest: {
      draft: {
        tenantId: localStorage.getItem("tenant-id"),
        userId: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
        draftRecord: {},
      },
    },
    totalAmountToBePaid: 0,
    isFullPayment: true,
  };

  updateDraftinLocalStorage = (draftInfo) => {
    localStorage.setItem("draftId", draftInfo.id);
    this.setState({
      draftRequest: { draft: draftInfo },
    });
  };

  callDraft = async (formArray = [], assessmentNumber = "") => {
    let { draftRequest, selected } = this.state;
    // if (formArray) {
    const { form, prepareFormData } = this.props;
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
      draftRequest.draft = {
        ...draftRequest.draft,
        assessmentNumber,
        draftRecord: {
          ...draftRequest.draft.draftRecord,
          selectedTabIndex: assessmentNumber ? selected : selected + 1,
          ...form,
          assessmentNumber,
          prepareFormData,
        },
        prepareFormData,
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

  fetchDraftDetails = async (draftId, isReassesment) => {
    const { draftRequest } = this.state;
    const { toggleSpinner, updatePrepareFormDataFromDraft } = this.props;
    try {
      toggleSpinner();
      let draftsResponse = await httpRequest(
        "pt-services-v2/drafts/_search",
        "_search",
        [
          {
            key: "userId",
            value: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
            key: isReassesment ? "assessmentNumber" : "id",
            value: draftId,
          },
        ],
        draftRequest
      );
      const currentDraft = draftsResponse.drafts.find((res) => get(res, "assessmentNumber", "") === draftId || get(res, "id", "") === draftId);
      const ownerFormKeys = Object.keys(currentDraft.draftRecord).filter((formName) => formName.indexOf("ownerInfo_") !== -1);
      const { ownerDetails, totalowners } = this.configOwnersDetailsFromDraft(ownerFormKeys);
      // const floorDetails = Object.keys(currentDraft.draftRecord).filter(formName => formName.indexOf("floorDetails_"))
      const activeTab = get(currentDraft, "draftRecord.selectedTabIndex", 0);
      updatePrepareFormDataFromDraft(get(currentDraft, "draftRecord.prepareFormData", {}));
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
          // floorDetails,
        },
        () => {
          this.props.updatePTForms(currentDraft.draftRecord);
          //this.onTabClick(activeTab)
          toggleSpinner();
          this.estimate().then((estimateResponse) => {
            if (estimateResponse) {
              this.setState({
                estimation: estimateResponse && estimateResponse.Calculation,
                totalAmountToBePaid: get(estimateResponse, "Calculation[0].totalAmount", 0),
              });
            }
          });
        }
      );
    } catch (e) {
      toggleSpinner();
    }
  };

  getQueryValue = (query, key) => get(queryString.parse(query), key, undefined);

  componentDidMount = async () => {
    let { history, fetchGeneralMDMSData, renderCustomTitleForPt } = this.props;
    let { search } = this.props.location;
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

    await fetchGeneralMDMSData(requestBody, "PropertyTax", [
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
    const assessmentId = this.getQueryValue(search, "assessmentId") || fetchFromLocalStorage("draftId");
    const isReassesment = !!this.getQueryValue(search, "isReassesment");
    const isFreshAssesment = this.getQueryValue(search, "type");
    if (assessmentId && !isFreshAssesment) this.fetchDraftDetails(assessmentId, isReassesment);
    this.addOwner();
    let financialYearFromQuery = window.location.search.split("FY=")[1];
    if (financialYearFromQuery) {
      financialYearFromQuery = financialYearFromQuery.split("&")[0];
      this.setState({
        financialYearFromQuery,
      });
    }
    renderCustomTitleForPt(customTitle);
  };

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
    // let {floorDetails} =this.state;
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
      case "INSTITUTIONALPRIVATE":
      case "INSTITUTIONALGOVERNMENT":
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

  updateTotalAmount = (value, isFullPayment) => {
    this.setState({
      totalAmountToBePaid: value,
      isFullPayment,
    });
  };

  renderStepperContent = (selected, fromReviewPage) => {
    const { renderPlotAndFloorDetails, getOwnerDetails, updateTotalAmount } = this;
    const { estimation } = this.state;

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
        const { draftRequest, estimation, totalAmountToBePaid } = this.state;
        const { draft } = draftRequest;
        const { financialYear } = draft.draftRecord;
        const { form } = this.props
        return (
          <div className="review-pay-tab">
            <ReviewForm
              onTabClick={this.onTabClick}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
              estimationDetails={estimation}
              financialYr={financialYear ? financialYear.fields.button : {}}
              totalAmountToBePaid={totalAmountToBePaid}
              updateTotalAmount={updateTotalAmount}
              isPartialPaymentInValid={get(this.state, "estimation[0].totalAmount", 1) !== 0 || get(form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant"}
            />
          </div>
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { callDraft, pay, estimate, validateUnitandPlotSize } = this;
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
                const isTotalUnitSizeValid = validateUnitandPlotSize(plotDetails, form);
                if (isTotalUnitSizeValid) {
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
                  alert("Plot size can't be less than total ground floor units area");
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
            } else if (ownershipTypeSelected.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
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

        estimate().then((estimateResponse) => {
          if (estimateResponse) {
            this.setState({
              estimation: estimateResponse && estimateResponse.Calculation,
            });
          }
        });

        break;
      case 3:
        pay();
        break;
    }
  };

  callPGService = async (propertyId, assessmentNumber, assessmentYear, tenantId) => {
    const { isFullPayment, totalAmountToBePaid, estimation } = this.state;
    let { history, toggleSpinner } = this.props;
    const queryObj = [
      { key: "propertyId", value: propertyId },
      { key: "assessmentNumber", value: assessmentNumber },
      { key: "assessmentYear", value: assessmentYear },
      { key: "tenantId", value: tenantId },
      { key: "amountToBePaid", value: isFullPayment ? estimation[0].totalAmount : totalAmountToBePaid },
    ];

    let callbackUrl = `${window.origin}/property-tax/payment-redirect-page`;
    if (process.env.NODE_ENV !== "development") {
      const userType = process.env.REACT_APP_NAME === "Citizen" ? "CITIZEN" : "EMPLOYEE";
      if (userType === "CITIZEN") {
        callbackUrl = `${window.origin}/citizen/property-tax/payment-redirect-page`;
      } else {
        callbackUrl = `${window.origin}/employee/property-tax/payment-redirect-page`;
      }
    }
    try {
      const getBill = await httpRequest("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});
      try {
        const requestBody = {
          Transaction: {
            tenantId,
            txnAmount: isFullPayment ? get(getBill, "Bill[0].billDetails[0].totalAmount") : totalAmountToBePaid,
            module: "PT",
            billId: get(getBill, "Bill[0].id"),
            moduleId: get(getBill, "Bill[0].billDetails[0].consumerCode"),
            productInfo: "Property Tax Payment",
            gateway: "AXIS",
            callbackUrl,
          },
        };
        const goToPaymentGateway = await httpRequest("pg-service/transaction/v1/_create", "_create", [], requestBody);
        if (get(getBill, "Bill[0].billDetails[0].totalAmount")) {
          const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl");
          window.location = redirectionUrl;
        } else {
          toggleSpinner();
          let moduleId = get(goToPaymentGateway, "Transaction.moduleId");
          let tenantId = get(goToPaymentGateway, "Transaction.tenantId");
          history.push("/property-tax/payment-success/" + moduleId.split(":")[0] + "/" + tenantId + "/" + moduleId.split(":")[1]);
        }
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      toggleSpinner();
      console.log(e);
    }
  };

  estimate = async () => {
    let { prepareFormData, location } = this.props;
    const { financialYearFromQuery } = this.state;
    const { draft } = this.state.draftRequest;
    const { financialYear } = draft.draftRecord;
    try {
      if (financialYearFromQuery) {
        set(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
      }
      set(prepareFormData, "Properties[0].address.locality.area", "Area3");
      const propertyDetails = this.normalizePropertyDetails(prepareFormData.Properties);
      let estimateResponse = await httpRequest("pt-calculator-v2/propertytax/_estimate", "_estimate", [], {
        CalculationCriteria: [
          {
            assessmentYear: financialYearFromQuery,
            tenantId: prepareFormData.Properties[0] && prepareFormData.Properties[0].tenantId,
            property: propertyDetails[0],
          },
        ],
      });
      return estimateResponse;
    } catch (e) {
      // alert(e);
      this.props.toggleSnackbarAndSetText(true, "Error calculating tax", true);
    }
  };

  pay = async () => {
    const { callPGService, callDraft } = this;
    const { financialYearFromQuery } = this.state;
    let { prepareFormData, toggleSpinner, location } = this.props;
    let { search } = location;
    const propertyId = this.getQueryValue(search, "propertyId");
    const assessmentId = this.getQueryValue(search, "assessmentId");
    const propertyMethodAction = !!propertyId ? "_update" : "_create"
    toggleSpinner();
    if (financialYearFromQuery) {
      set(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
    }

    if (!!propertyId) {
     set(prepareFormData, "Properties[0].propertId", propertyId)
     set(prepareFormData, "Properties[0].propertyDetails[0].assessmentNumber", assessmentId)
    }

    try {
      set(prepareFormData, "Properties[0].address.locality.area", "Area3");
      let createPropertyResponse = await httpRequest(`pt-services-v2/property/${propertyMethodAction}`, `${propertyMethodAction}`, [], { Properties: prepareFormData.Properties });
      callDraft([], get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"));
      callPGService(
        get(createPropertyResponse, "Properties[0].propertyId"),
        get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"),
        get(createPropertyResponse, "Properties[0].propertyDetails[0].financialYear"),
        get(createPropertyResponse, "Properties[0].tenantId")
      );
    } catch (e) {
      toggleSpinner();
      alert(e);
    }
  };

  onTabClick = (index) => {
    const { fetchDraftDetails } = this;
    const { formValidIndexArray, selected } = this.state;
    // form validation checks needs to be written here
    // fetchDraftDetails();
    if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
      this.setState({
        selected: index,
        formValidIndexArray: range(0, index),
      });
    } else {
      alert("Please fill required tabs");
    }
  };

  validateUnitandPlotSize = (plotDetails, form) => {
    let groundFloorIndex = null;
    Object.keys(form).forEach((formKey, ind) => {
      if (formKey.startsWith("customSelect_")) {
        const { fields } = form[formKey];
        if (fields.floorName.value === "0") {
          groundFloorIndex = formKey.split("_")[1];
        }
      }
    });
    if (groundFloorIndex !== null) {
      const unitTotal = Object.keys(form).reduce((unitTotal, key) => {
        if (key.startsWith(`floorDetails_${groundFloorIndex}_`)) {
          const form1 = form[key];
          if (form1 && form1.fields.builtArea.value) {
            unitTotal += parseFloat(form1.fields.builtArea.value);
          }
        }
        return unitTotal;
      }, 0);
      if (unitTotal > parseFloat(plotDetails.fields.plotSize.value)) {
        return false;
      } else return true;
    } else return true;
  };

  getHeaderLabel = (selected) => {
    switch (selected) {
      case 0:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM1_HEADER_MESSAGE" />;
      case 1:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM2_HEADER_MESSAGE" />;
      case 2:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM3_HEADER_MESSAGE" />;
      case 3:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM4_HEADER_MESSAGE" />;
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
          <Label containerStyle={{ marginLeft: 16 }} fontSize="14px" color="#484848" label="PT_FORM1_INFORMATION_MESSAGE" />
        </div>
      );
    }
  };

  normalizePropertyDetails = (properties) => {
    const propertyInfo = JSON.parse(JSON.stringify(properties));
    const property = propertyInfo[0] || {};
    const { propertyDetails } = property;
    const units = propertyDetails[0].units.filter((item, ind) => {
      return item !== null;
    });
    propertyDetails[0].units = units;
    return propertyInfo;
  };

  closeDeclarationDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onPayButtonClick = () => {
    this.setState({ dialogueOpen: true });
  };

  render() {
    const { renderStepperContent, getHeaderLabel, getFooterLabel, onPayButtonClick, closeDeclarationDialogue } = this;
    const { selected, ownerInfoArr, formValidIndexArray, dialogueOpen } = this.state;
    const fromReviewPage = selected === 3;
    const { history } = this.props;
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
          closeDialogue={closeDeclarationDialogue}
          dialogueOpen={dialogueOpen}
          history={history}
          onPayButtonClick={onPayButtonClick}
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
    toggleSnackbarAndSetText: (open, message, error) => dispatch(toggleSnackbarAndSetText(open, message, error)),
    updatePrepareFormDataFromDraft: (prepareFormData) => dispatch(updatePrepareFormDataFromDraft(prepareFormData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
