import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Icon, Button } from "components";
import Label from "egov-ui-kit/utils/translationNode";
import { deleteForm, updateForms, displayFormErrors } from "egov-ui-kit/redux/form/actions";
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
import { getPlotAndFloorFormConfigPath } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import { setRoute, toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
import formHoc from "egov-ui-kit/hocs/form";
import { validateForm } from "egov-ui-kit/redux/form/utils";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getQueryValue, getFinancialYearFromQuery, getEstimateFromBill } from "egov-ui-kit/utils/PTCommon";
import { get, set, range, isEmpty, isEqual } from "lodash";
import { fetchFromLocalStorage, trimObj } from "egov-ui-kit/utils/commons";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import { fetchGeneralMDMSData, updatePrepareFormDataFromDraft, MDMSFetchSuccess, generalMDMSFetchSuccess } from "egov-ui-kit/redux/common/actions";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import { getDocumentTypes } from "modules/citizen/PropertyTax/FormWizard/utils/mdmsCalls";
import { fetchMDMDDocumentTypeSuccess } from "redux/store/actions";
import { getAllOwnerDetails, getOwnerShipDetails, convertRawDataToFormConfig } from "modules/citizen/PropertyTax/FormWizard/utils/convertToFormConfig"
import "./index.css";

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
        //tenantId: localStorage.getItem("tenant-id"),
        userId: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
        draftRecord: {},
      },
    },
    totalAmountToBePaid: 100,
    draftByIDResponse: {},
    isFullPayment: true,
    partialAmountError: "",
  };

  updateDraftinLocalStorage = async (draftInfo, assessmentNumber) => {
    localStorage.setItem("draftId", draftInfo.id);
    this.setState(
      {
        draftRequest: { draft: draftInfo },
      },
      async () => {
        if (assessmentNumber) {
          let { draftRequest, selected } = this.state;
          const { form, prepareFormData } = this.props;
          const assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;
          draftRequest.draft = {
            ...draftRequest.draft,
            assessmentNumber: assessmentNo,
            draftRecord: {
              ...draftRequest.draft.draftRecord,
              selectedTabIndex: assessmentNumber ? selected : selected + 1,
              ...form,
              assessmentNumber: assessmentNo,
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
        return;
      }
    );
  };

  callDraft = async (formArray = [], assessmentNumber = "") => {
    let { draftRequest, selected } = this.state;
    const { form, prepareFormData, location } = this.props;
    const { search } = location;
    if (!draftRequest.draft.id) {
      draftRequest.draft.tenantId = getQueryValue(search, "tenantId") || prepareFormData.Properties[0].tenantId;
      draftRequest.draft.draftRecord = {
        selectedTabIndex: selected + 1,
        ...form,
      };
      try {
        let draftResponse = await httpRequest("pt-services-v2/drafts/_create", "_cretae", [], draftRequest);
        const draftInfo = draftResponse.drafts[0];

        this.updateDraftinLocalStorage(draftInfo, assessmentNumber);
      } catch (e) {
        alert(e);
      }
    } else {
      const assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;
      draftRequest.draft = {
        ...draftRequest.draft,
        assessmentNumber: assessmentNo,
        tenantId: getQueryValue(search, "tenantId") || prepareFormData.Properties[0].tenantId,
        draftRecord: {
          ...draftRequest.draft.draftRecord,
          selectedTabIndex: assessmentNumber ? selected : selected + 1,
          ...form,
          assessmentNumber: assessmentNo,
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
  };

  configOwner = (ownersCount) =>
    formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${ownersCount}`, path: "PropertyTaxPay", isCoreConfiguration: true })(OwnerInformation);

  addOwner = (isMultiple) => {
    const { ownerInfoArr, ownersCount } = this.state;
    const OwnerInfoHOC = this.configOwner(ownersCount);
    this.setState(
      {
        ownerInfoArr: [...ownerInfoArr, { index: ownersCount, Component: OwnerInfoHOC }],
        ownersCount: ownersCount + 1,
      },
      () => {
        if (isMultiple) {
          this.addOwner();
        }
      }
    );
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

  getTargetPropertiesDetails = (propertyDetails) => propertyDetails.sort((property1, property2) => get(property1, "auditDetails.createdTime", 2) - get(property2, "auditDetails.createdTime", 1))

  fetchDraftDetails = async (draftId, isReassesment, draftUuid) => {
    const { draftRequest } = this.state;
    const { toggleSpinner, updatePrepareFormDataFromDraft, fetchGeneralMDMSData, fetchMDMDDocumentTypeSuccess, location } = this.props;
    const uuid = draftUuid ? draftUuid : get(JSON.parse(localStorage.getItem("user-info")), "uuid");
    const { search } = location;
    const financialYearFromQuery = getFinancialYearFromQuery();
    const propertyId = getQueryValue(search, "propertyId");
    const assessmentId = getQueryValue(search, "assessmentId");
    const tenantId = getQueryValue(search, "tenantId");
    const isCompletePayment = getQueryValue(search, "isCompletePayment");

    try {
      //toggleSpinner();
      //const ownerFromResponseIn = convertRawDataToFormConfig(responseee)

      let currentDraft
      if (!isReassesment) {
        let draftsResponse = await httpRequest(
          "pt-services-v2/drafts/_search",
          "_search",
          [
            // {
            //   key: "userId",
            //   value: uuid,
            // },
            {
              key: isReassesment ? "assessmentNumber" : "id",
              value: draftId,
            },
            {
              key: "tenantId",
              value: getQueryValue(search, "tenantId"),
            },
          ],
          draftRequest
        );
        currentDraft = draftsResponse.drafts.find((res) => get(res, "assessmentNumber", "") === draftId || get(res, "id", "") === draftId);
      } else {
        let searchPropertyResponse = await httpRequest(
          "pt-services-v2/property/_search",
          "_search",
          [
            {
              key: "tenantId",
              value: tenantId,
            },
            {
              key: "ids",
              value: getQueryValue(search, "propertyId"),//"PT-107-001278",
            },
          ]
        );
        searchPropertyResponse = {
          ...searchPropertyResponse,
          Properties: [{
            ...searchPropertyResponse.Properties[0],
            propertyDetails: this.getTargetPropertiesDetails(searchPropertyResponse.Properties[0].propertyDetails)
          }],
        }
        const ownerFromResponseIn = convertRawDataToFormConfig(searchPropertyResponse.Properties[0])//convertRawDataToFormConfig(responseee)
        currentDraft = {
          draftRecord: {
            ...ownerFromResponseIn,
            selectedTabIndex: 3,
            prepareFormData: searchPropertyResponse,//prepareFormData2,
          }
        }
      }

      //const currentDraft = searchPropertyResponse.drafts.find((res) => get(res, "assessmentNumber", "") === draftId || get(res, "id", "") === draftId);
      //searchPropertyResponse.drafts.find((res) => get(res, "assessmentNumber", "") === draftId || get(res, "id", "") === draftId);

      if (!currentDraft) {
        throw new Error("draft not found");
      }

      const prepareFormData2 = currentDraft.draftRecord.prepareFormData

      this.setState({
        draftByIDResponse: currentDraft,
      });

      const ownerFormKeys = Object.keys(currentDraft.draftRecord).filter((formName) => formName.indexOf("ownerInfo_") !== -1);
      const { ownerDetails, totalowners } = this.configOwnersDetailsFromDraft(ownerFormKeys);
      const activeTab = get(currentDraft, "draftRecord.selectedTabIndex", 0) > 3 ? 3 : get(currentDraft, "draftRecord.selectedTabIndex", 0);
      const activeModule = get(currentDraft, "draftRecord.propertyAddress.fields.city.value", "");
      if (!!activeModule) {
        let requestBody = {
          MdmsCriteria: {
            tenantId: activeModule,
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
        const payload = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], requestBody);
        this.props.generalMDMSFetchSuccess(payload, "PropertyTax", [
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
        const documentTypeMdms = await getDocumentTypes();
        if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);
      }
      updatePrepareFormDataFromDraft(get(currentDraft, "draftRecord.prepareFormData", {}));
      this.props.updatePTForms(currentDraft.draftRecord);

      //Get estimate from bill in case of complete payment
      const billResponse =
        activeTab === 3 && isCompletePayment && (await this.callGetBill(propertyId, assessmentId, financialYearFromQuery, tenantId));
      const estimateFromGetBill = billResponse ? getEstimateFromBill(billResponse.Bill) : [];
      this.setState(
        {
          ownerInfoArr: ownerDetails,
          ownersCount: totalowners,
          financialYearFromQuery: get(currentDraft, "draftRecord.financialYear.fields.button.value"),
          formValidIndexArray: range(0, activeTab),
          selected: activeTab,
          draftRequest: {
            draft: {
              ...draftRequest.draft,
              id: null,
              assessmentNumber: currentDraft.assessmentNumber,
              draftRecord: currentDraft.draftRecord,
            },
          },
          estimation: estimateFromGetBill,
          totalAmountToBePaid: (estimateFromGetBill && estimateFromGetBill[0].totalAmount) || 0,
          billResponse,
        },
        () => {
          //this.onTabClick(activeTab)
          //toggleSpinner();
          {
            if (activeTab === 3 && !isCompletePayment) {
              this.estimate().then((estimateResponse) => {
                if (estimateResponse) {
                  this.setState({
                    estimation: estimateResponse && estimateResponse.Calculation,
                    totalAmountToBePaid: get(estimateResponse, "Calculation[0].totalAmount", 0),
                  });
                }
              });
            }
          }
        }
      );
    } catch (e) {
      console.log("e",e)
      //toggleSpinner();
    }
  };

  componentWillReceiveProps = (nextprops) => {
    if (!isEqual(nextprops, this.props)) {
      let inputType = document.getElementsByTagName("input");
      for (let input in inputType) {
        if (inputType[input].type === "number") {
          inputType[input].addEventListener("mousewheel", function() {
            this.blur();
          });
        }
      }
    }
  };

  componentDidMount = async () => {
    let { renderCustomTitleForPt, fetchGeneralMDMSData, fetchMDMDDocumentTypeSuccess, toggleSpinner } = this.props;
    toggleSpinner()
    try {
      let { search } = this.props.location;
      const assessmentId = getQueryValue(search, "assessmentId") || fetchFromLocalStorage("draftId");
      const isReassesment = !!getQueryValue(search, "isReassesment");
      const isFreshAssesment = getQueryValue(search, "type");
      const tenantId = getQueryValue(search, "tenantId");
      const propertyId = getQueryValue(search, "propertyId");
      const draftUuid = getQueryValue(search, "uuid");
      const documentTypeMdms = await getDocumentTypes();
      if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);

      if (assessmentId) {
        let requestBody = {
          MdmsCriteria: {
            tenantId: tenantId,
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
                  {
                    name: "OwnerTypeDocument",
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
          "Rebate",
          "Penalty",
          "Interest",
          "FireCess",
        ]);
        await this.fetchDraftDetails(assessmentId, isReassesment, draftUuid);
      }

      const { ownerInfoArr } = this.state;

      if (ownerInfoArr.length < 2) {
        this.addOwner(true);
      }

      const financialYearFromQuery = getFinancialYearFromQuery();
      this.setState({
        financialYearFromQuery,
      });
      const customTitle = isReassesment
        ? `Property Assessment (${financialYearFromQuery}) : Property Tax Unique ID - ${propertyId}`
        : `Property Assessment (${financialYearFromQuery}) : New Property`;

      renderCustomTitleForPt(customTitle);
      toggleSpinner()
    } catch (e) {
      console.log("e")
      this.prop.toggleSpinner()
    }
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
            addOwner={() => {
              this.addOwner(false);
            }}
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

  updateTotalAmount = (value, isFullPayment, errorText) => {
    this.setState({
      totalAmountToBePaid: value,
      isFullPayment,
      partialAmountError: errorText,
    });
  };

  renderStepperContent = (selected, fromReviewPage) => {
    const { renderPlotAndFloorDetails, getOwnerDetails, updateTotalAmount } = this;
    const { estimation, totalAmountToBePaid, financialYearFromQuery } = this.state;
    const { form, currentTenantId, search } = this.props;
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
        return (
          <div className="review-pay-tab">
            <ReviewForm
              onTabClick={this.onTabClick}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
              estimationDetails={estimation}
              financialYr={financialYearFromQuery}
              totalAmountToBePaid={totalAmountToBePaid}
              updateTotalAmount={updateTotalAmount}
              currentTenantId={currentTenantId}
              isPartialPaymentInValid={
                get(this.state, "estimation[0].totalAmount", 1) < 100 ||
                get(form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant"
              }
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
                const isTotalUnitSizeValid = plotDetails.fields.plotSize ? validateUnitandPlotSize(plotDetails, form) : true;
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
        const estimateCall = () => {
          estimate().then((estimateResponse) => {
            if (estimateResponse) {
              this.setState({
                estimation: estimateResponse && estimateResponse.Calculation,
                totalAmountToBePaid: 1,
                valueSelected: "Full_Amount",
              });
            }
          });
        };
        if (ownershipType) {
          const isOwnershipTypeFormValid = validateForm(ownershipType);
          if (isOwnershipTypeFormValid) {
            const ownershipTypeSelected = get(ownershipType, "fields.typeOfOwnership.value");
            if (ownershipTypeSelected === "SINGLEOWNER") {
              const { ownerInfo } = form;
              const isOwnerInfoFormValid = validateForm(ownerInfo);
              if (isOwnerInfoFormValid) {
                callDraft();
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] }, estimateCall());
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
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] }, estimateCall());
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
                this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] }, estimateCall());
              }
            }
          } else {
            displayFormErrorsAction("ownershipType");
          }
        }

        break;
      case 3:
        pay();
        break;
    }
  };

  callGetBill = async (propertyId, assessmentNumber, assessmentYear, tenantId) => {
    const { location, toggleSpinner } = this.props;
    const { isFullPayment, totalAmountToBePaid, estimation } = this.state;
    const { search } = location;
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    toggleSpinner();
    const queryObj = [
      { key: "propertyId", value: propertyId },
      { key: "assessmentNumber", value: assessmentNumber },
      { key: "assessmentYear", value: assessmentYear },
      { key: "tenantId", value: tenantId },
    ];
    !isCompletePayment && queryObj.push({ key: "amountExpected", value: isFullPayment ? estimation[0].totalAmount : totalAmountToBePaid });

    try {
      const billResponse = await httpRequest("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});
      toggleSpinner();
      return billResponse;
    } catch (e) {
      toggleSpinner();
      console.log(e);
    }
  };

  callPGService = async (propertyId, assessmentNumber, assessmentYear, tenantId) => {
    const { isFullPayment, totalAmountToBePaid, billResponse } = this.state;
    let { history, toggleSpinner, location } = this.props;
    const { search } = location;
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    // const queryObj = [
    //   { key: "propertyId", value: propertyId },
    //   { key: "assessmentNumber", value: assessmentNumber },
    //   { key: "assessmentYear", value: assessmentYear },
    //   { key: "tenantId", value: tenantId },
    //   { key: "amountExpected", value: isFullPayment ? estimation[0].totalAmount : totalAmountToBePaid },
    // ];
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
      const getBill = !isCompletePayment ? await this.callGetBill(propertyId, assessmentNumber, assessmentYear, tenantId) : billResponse;
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
          localStorage.setItem("assessmentYear", assessmentYear);
          window.location = redirectionUrl;
        } else {
          toggleSpinner();
          let moduleId = get(goToPaymentGateway, "Transaction.moduleId");
          let tenantId = get(goToPaymentGateway, "Transaction.tenantId");
          history.push("/property-tax/payment-success/" + moduleId.split(":")[0] + "/" + tenantId + "/" + moduleId.split(":")[1]);
        }
      } catch (e) {
        toggleSpinner();
        console.log(e);
      }
    } catch (e) {
      toggleSpinner();
      console.log(e);
    }
  };

  getSingleOwnerInfo = () => {
    const { ownerInfo } = this.props.form;
    const ownerObj = {
      documents: [{}],
    };
    Object.keys(ownerInfo.fields).map((field) => {
      const jsonPath = ownerInfo.fields[field].jsonPath;
      if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
          get(ownerInfo, `fields.${field}.value`, undefined) || null;
      } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || "Male";
      } else {
        ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] = get(ownerInfo, `fields.${field}.value`, undefined) || null;
      }
    });
    const ownerArray = [ownerObj];
    return ownerArray;
  };

  getMultipleOwnerInfo = () => {
    let { form } = this.props;
    return Object.keys(form)
      .filter((formkey) => formkey.indexOf("ownerInfo_") !== -1)
      .reduce((acc, curr, currIndex, arr) => {
        const ownerData = [...acc];
        const currForm = form[curr];
        const ownerObj = {
          documents: [{}],
        };
        Object.keys(currForm.fields).map((field) => {
          const jsonPath = currForm.fields[field].jsonPath;
          if (jsonPath.toLowerCase().indexOf("document") !== -1) {
            ownerObj.documents[0][jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
              get(form, `${curr}.fields.${field}.value`, undefined) || null;
          } else if (jsonPath.toLowerCase().indexOf("gender") !== -1) {
            ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
              get(form, `${curr}.fields.${field}.value`, undefined) || "Male";
          } else {
            ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
              get(form, `${curr}.fields.${field}.value`, undefined) || null;
          }
        });
        ownerData.push(ownerObj);
        return ownerData;
      }, []);
  };

  getInstituteInfo = () => {
    const { institutionAuthority, institutionDetails } = this.props.form;
    const ownerObj = {};
    const instiObj = {};
    Object.keys(institutionAuthority.fields).map((field) => {
      const jsonPath = institutionAuthority.fields[field].jsonPath;
      ownerObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
        get(institutionAuthority, `fields.${field}.value`, undefined) || null;
    });
    Object.keys(institutionDetails.fields).map((field) => {
      const jsonPath = institutionDetails.fields[field].jsonPath;
      instiObj[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
        get(institutionDetails, `fields.${field}.value`, undefined) || null;
    });
    instiObj.designation = get(institutionAuthority, "fields.designation.value", "");
    const ownerArray = [ownerObj];
    return { instiObj, ownerArray };
  };

  estimate = async () => {
    let { toggleSpinner, form, common, location } = this.props;
    let { search } = location;
    let prepareFormData = { ...this.props.prepareFormData };
    toggleSpinner();
    if (get(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined))
      delete prepareFormData.Properties[0].propertyDetails[0].institution;
    const financialYearFromQuery = getFinancialYearFromQuery();
    const selectedownerShipCategoryType = get(form, "ownershipType.fields.typeOfOwnership.value", "");
    try {
      if (financialYearFromQuery) {
        set(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
      }
      if (selectedownerShipCategoryType === "SINGLEOWNER") {
        set(prepareFormData, "Properties[0].propertyDetails[0].owners", this.getSingleOwnerInfo());
        set(
          prepareFormData,
          "Properties[0].propertyDetails[0].ownershipCategory",
          get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
        );
        set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
      }
      if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
        set(prepareFormData, "Properties[0].propertyDetails[0].owners", this.getMultipleOwnerInfo());
        set(
          prepareFormData,
          "Properties[0].propertyDetails[0].ownershipCategory",
          get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
        );
        set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
      }
      if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
        const { instiObj, ownerArray } = this.getInstituteInfo();
        set(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
        set(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
        set(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", get(form, "ownershipType.fields.typeOfOwnership.value", ""));
        set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", get(form, "institutionDetails.fields.type.value", ""));
      }
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
      toggleSpinner();
      return estimateResponse;
    } catch (e) {
      toggleSpinner();
      if (e.message) {
        alert(e.message);
      } else this.props.toggleSnackbarAndSetText(true, "Error calculating tax", true);
    }
  };

  pay = async () => {
    const { callPGService, callDraft } = this;
    const { financialYearFromQuery } = this.state;
    let { toggleSpinner, location, form, common } = this.props;
    let prepareFormData = { ...this.props.prepareFormData };
    if (get(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined))
      delete prepareFormData.Properties[0].propertyDetails[0].institution;
    let { search } = location;
    const propertyId = getQueryValue(search, "propertyId");
    const assessmentId = getQueryValue(search, "assessmentId");
    const tenantId = getQueryValue(search, "tenantId");
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    const propertyMethodAction = !!propertyId ? "_update" : "_create";
    const selectedownerShipCategoryType = get(form, "ownershipType.fields.typeOfOwnership.value", "");
    toggleSpinner();
    if (financialYearFromQuery) {
      set(prepareFormData, "Properties[0].propertyDetails[0].financialYear", financialYearFromQuery);
    }
    if (!!propertyId) {
      set(prepareFormData, "Properties[0].propertyId", propertyId);
      set(prepareFormData, "Properties[0].propertyDetails[0].assessmentNumber", assessmentId);
    }

    if (selectedownerShipCategoryType === "SINGLEOWNER") {
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", this.getSingleOwnerInfo());
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].ownershipCategory",
        get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
      );
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
    }

    if (selectedownerShipCategoryType === "MULTIPLEOWNERS") {
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", this.getMultipleOwnerInfo());
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].ownershipCategory",
        get(common, `generalMDMSDataById.SubOwnerShipCategory[${selectedownerShipCategoryType}].ownerShipCategory`, "INDIVIDUAL")
      );
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", selectedownerShipCategoryType);
    }
    if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
      const { instiObj, ownerArray } = this.getInstituteInfo();
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
      set(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
      set(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", get(form, "ownershipType.fields.typeOfOwnership.value", ""));
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", get(form, "institutionDetails.fields.type.value", ""));
    }

    try {
      if (isCompletePayment) {
        callPGService(propertyId, assessmentId, financialYearFromQuery, tenantId);
      } else {
        //Remove null units and do sqyd to sqft conversion.
        const properties = this.normalizePropertyDetails(prepareFormData.Properties);
        let createPropertyResponse = await httpRequest(`pt-services-v2/property/${propertyMethodAction}`, `${propertyMethodAction}`, [], {
          Properties: properties,
        });
        callDraft([], get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"));
        callPGService(
          get(createPropertyResponse, "Properties[0].propertyId"),
          get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"),
          get(createPropertyResponse, "Properties[0].propertyDetails[0].financialYear"),
          get(createPropertyResponse, "Properties[0].tenantId")
        );
      }
    } catch (e) {
      toggleSpinner();
      alert(e);
    }
  };

  onTabClick = (index) => {
    const { formValidIndexArray, selected, draftByIDResponse } = this.state;
    const { location } = this.props;
    let { search } = location;
    let draftUuidId = draftByIDResponse.userId;
    let currentUuidId = get(JSON.parse(localStorage.getItem("user-info")), "uuid");
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    const isReassesment = getQueryValue(search, "isReassesment");
    // form validation checks needs to be written here
    // fetchDraftDetails();
    if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
      false
        ? isCompletePayment || draftUuidId !== currentUuidId
          ? alert("Not authorized to edit this property details")
          : this.setState({
              selected: index,
              formValidIndexArray: range(0, index),
            })
        : this.setState({
            selected: index,
            formValidIndexArray: range(0, index),
          });
    } else {
    }
  };

  validateUnitandPlotSize = (plotDetails, form) => {
    let isValid = true;
    Object.keys(form).forEach((formKey, ind) => {
      if (formKey.startsWith("customSelect_")) {
        const floorCardIndex = formKey.split("_")[1];
        const { fields } = form[formKey];
        const floorNo = fields.floorName.value;
        const unitTotal = Object.keys(form).reduce((unitTotal, key) => {
          if (key.startsWith(`floorDetails_${floorCardIndex}_`)) {
            const form1 = form[key];
            if (form1 && form1.fields.builtArea.value) {
              unitTotal += parseFloat(form1.fields.builtArea.value);
            }
          }
          return unitTotal;
        }, 0);
        const plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
        if (unitTotal > plotSizeInFt) {
          alert(`Total area of floor ${floorNo} has exceeded the plot size`);
          isValid = false;
        }
      }
    });
    return isValid;
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
    const propertyInfo = trimObj(JSON.parse(JSON.stringify(properties)));
    const property = propertyInfo[0] || {};
    let { search } = this.props.location;
    const isReassesment = !!getQueryValue(search, "isReassesment");
    const propertyId = getQueryValue(search, "propertyId");
    if (isReassesment && propertyId) {
      property.propertyId = propertyId;
    }
    const { propertyDetails } = property;
    const units = propertyDetails[0].units.filter((item, ind) => {
      return item !== null;
    });
    var sumOfUnitArea = 0;
    units.forEach((unit) => {
      let unitAreaInSqYd = parseFloat(unit.unitArea) / 9;
      unit.unitArea = Math.round(unitAreaInSqYd * 1000) / 1000;
      sumOfUnitArea += unit.unitArea;
    });
    if (propertyDetails[0].propertySubType === "SHAREDPROPERTY") {
      propertyDetails[0].buildUpArea = sumOfUnitArea;
    }
    propertyDetails[0].units = units;

    return propertyInfo;
  };

  closeDeclarationDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onPayButtonClick = () => {
    const { isFullPayment, partialAmountError, totalAmountToBePaid } = this.state;
    if (!isFullPayment && partialAmountError) return;
    if (totalAmountToBePaid % 1 === 0) {
      this.setState({ dialogueOpen: true });
    } else {
      alert("Amount cannot be a fraction!");
    }
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
          footer={null}
          fontSize
          formValidIndexArray={formValidIndexArray}
          updateIndex={this.updateIndex}
          backLabel="PT_COMMONS_GO_BACK"
          nextLabel={selected === 3 ? "PT_HOME_PAY1" : "PT_COMMONS_NEXT"}
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
  const { propertyAddress } = form;
  const { city } = (propertyAddress && propertyAddress.fields && propertyAddress.fields) || {};
  const currentTenantId = (city && city.value) || "pb";
  return { form, prepareFormData: common.prepareFormData, currentTenantId, common };
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
    generalMDMSFetchSuccess: (payload, moduleName, masterArray) => dispatch(generalMDMSFetchSuccess(payload, moduleName, masterArray)),
    fetchMDMDDocumentTypeSuccess: (data) => dispatch(fetchMDMDDocumentTypeSuccess(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
