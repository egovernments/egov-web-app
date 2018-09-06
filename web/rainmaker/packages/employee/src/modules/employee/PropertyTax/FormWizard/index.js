import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Icon, Button } from "components";
import { MDMS } from "egov-ui-kit/utils/endPoints";
import { toggleSnackbarAndSetText } from "egov-ui-kit/redux/app/actions";
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
import ReviewForm from "./components/ReviewForm";
import FloorsDetails from "./components/Forms/FloorsDetails";
import PlotDetails from "./components/Forms/PlotDetails";
import { getPlotAndFloorFormConfigPath } from "./utils/assessInfoFormManager";
import isEmpty from "lodash/isEmpty";
import MultipleOwnerInfoHOC from "./components/Forms/MultipleOwnerInfo";
import { connect } from "react-redux";
import { setRoute } from "egov-ui-kit/redux/app/actions";
import formHoc from "egov-ui-kit/hocs/form";
import { validateForm } from "egov-ui-kit/redux/form/utils";
import { displayFormErrors } from "egov-ui-kit/redux/form/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getQueryValue, findCorrectDateObj, getFinancialYearFromQuery, getEstimateFromBill } from "egov-ui-kit/utils/PTCommon";
import { get, set, isEqual } from "lodash";
import { fetchFromLocalStorage, trimObj } from "egov-ui-kit/utils/commons";
import range from "lodash/range";
import { toggleSpinner } from "egov-ui-kit/redux/common/actions";
import { fetchGeneralMDMSData, generalMDMSFetchSuccess, updatePrepareFormDataFromDraft } from "egov-ui-kit/redux/common/actions";
import PaymentDetails from "modules/employee/PropertyTax/FormWizard/components/PaymentDetails";
import { getDocumentTypes } from "modules/employee/PropertyTax/FormWizard/utils/mdmsCalls";
import { fetchMDMDDocumentTypeSuccess } from "redux/store/actions";
import "./index.css";
import { lchmod } from "fs";

export const normalizePropertyDetails = (properties, props) => {
  let { search } = props.location;
  const propertyInfo = trimObj(JSON.parse(JSON.stringify(properties)));
  const property = propertyInfo[0] || {};
  const { propertyDetails } = property;
  const isReassesment = !!getQueryValue(search, "isReassesment");
  const propertyId = getQueryValue(search, "propertyId");
  const units = propertyDetails[0].units.filter((item, ind) => {
    return item !== null;
  });
  if (isReassesment && propertyId) {
    property.propertyId = propertyId;
  }
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

class FormWizard extends Component {
  state = {
    dialogueOpen: false,
    financialYearFromQuery: "",
    selected: 0,
    ownerInfoArr: [],
    showOwners: false,
    formValidIndexArray: [],
    ownersCount: 0,
    estimation: [],
    importantDates: {},
    draftRequest: {
      draft: {
        tenantId: localStorage.getItem("tenant-id"),
        userId: get(JSON.parse(localStorage.getItem("user-info")), "uuid"),
        draftRecord: {},
      },
    },
    propertyDetails: {},
    bill: [],
    partialAmountError: "",
    totalAmountToBePaid: 100,
    isFullPayment: true,
    valueSelected: "Full_Amount",
  };

  updateDraftinLocalStorage = (draftInfo, assessmentNumber) => {
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
        this.updateDraftinLocalStorage(draftInfo, assessmentNumber);
      } catch (e) {
        alert(e);
      }
    } else {
      const assessmentNo = assessmentNumber || draftRequest.draft.assessmentNumber;
      draftRequest.draft.draftRecord = {
        selectedTabIndex: assessmentNumber ? selected : selected + 1,
        ...form,
        assessmentNumber: assessmentNo,
        prepareFormData,
      };
      draftRequest.draft.assessmentNumber = assessmentNo;
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

  updateTotalAmount = (value, isFullPayment, errorText) => {
    this.setState({
      totalAmountToBePaid: value,
      isFullPayment,
      partialAmountError: errorText,
    });
  };

  configOwner = (ownersCount) =>
    formHoc({ formKey: "ownerInfo", copyName: `ownerInfo_${ownersCount}`, path: "PropertyTaxPay", isCoreConfiguration: true })(OwnerInformation);

  addOwner = (isMultiple = false) => {
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

  fetchDraftDetails = async (draftId, isReassesment, draftUuid) => {
    const { draftRequest } = this.state;
    const { toggleSpinner, fetchMDMDDocumentTypeSuccess, updatePrepareFormDataFromDraft, location } = this.props;
    // const uuid = draftUuid ? draftUuid : get(JSON.parse(localStorage.getItem("user-info")), "uuid");
    const { search } = location;
    const financialYearFromQuery = getFinancialYearFromQuery();
    const propertyId = getQueryValue(search, "propertyId");
    const assessmentId = getQueryValue(search, "assessmentId");
    const tenantId = getQueryValue(search, "tenantId");
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    this.getImportantDates();
    try {
      toggleSpinner();
      let draftsResponse = await httpRequest(
        "pt-services-v2/drafts/_search",
        "_search",
        [
          // { key: "userId", value: uuid },
          {
            key: isReassesment ? "assessmentNumber" : "id",
            value: draftId,
          },
          {
            key: "tenantId",
            value: tenantId,
          },
        ],
        draftRequest
      );

      const currentDraft = draftsResponse.drafts.find(
        (res) => get(res, "draftRecord.assessmentNumber", "") === draftId || get(res, "id", "") === draftId
      );
      if (!currentDraft) {
        throw new Error("draft not found");
      }
      const ownerFormKeys = Object.keys(currentDraft.draftRecord).filter((formName) => formName.indexOf("ownerInfo_") !== -1);
      const { ownerDetails, totalowners } = this.configOwnersDetailsFromDraft(ownerFormKeys);
      const activeTab = get(currentDraft, "draftRecord.selectedTabIndex", 0);
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
      if (isCompletePayment) {
        const billResponse =
          activeTab >= 3 && isCompletePayment && (await this.callGetBill(propertyId, assessmentId, financialYearFromQuery, tenantId));
        const estimateFromGetBill = billResponse ? getEstimateFromBill(billResponse.Bill) : [];
        this.setState({
          estimation: estimateFromGetBill,
          totalAmountToBePaid: (estimateFromGetBill && estimateFromGetBill[0] && estimateFromGetBill[0].totalAmount) || 0,
          Bill: billResponse && billResponse.Bill,
        });
      }
      this.setState(
        {
          ownerInfoArr: ownerDetails,
          ownersCount: totalowners,
          formValidIndexArray: range(0, activeTab),
          selected: activeTab,
          draftRequest: {
            draft: {
              ...draftRequest.draft,
              id: null,
              assessmentNumber: currentDraft.assessmentNumber,
            },
          },
        },
        () => {
          //this.onTabClick(activeTab)
          toggleSpinner();
          {
            if (activeTab >= 3 && !isCompletePayment) {
              this.estimate().then((estimateResponse) => {
                if (estimateResponse) {
                  this.setState({
                    estimation: estimateResponse && estimateResponse.Calculation,
                    totalAmountToBePaid: get(estimateResponse, "Calculation[0].totalAmount", 0),
                  });
                }
              });
            }
            if (activeTab === 4) this.pay();
          }
        }
      );
    } catch (e) {
      toggleSpinner();
      console.log(e);
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
    let { location, fetchMDMDDocumentTypeSuccess, renderCustomTitleForPt, toggleSpinner } = this.props;
    let { search } = location;
    toggleSpinner();
    const propertyId = getQueryValue(search, "propertyId");
    const isReassesment = !!getQueryValue(search, "isReassesment");
    const draftUuid = getQueryValue(search, "uuid");
    const assessmentId = getQueryValue(search, "assessmentId") || fetchFromLocalStorage("draftId");

    if (assessmentId) {
      await this.fetchDraftDetails(assessmentId, isReassesment, draftUuid);
    }

    const { ownerInfoArr } = this.state;

    if (ownerInfoArr.length < 2) {
      this.addOwner(true);
    }

    const documentTypeMdms = await getDocumentTypes();
    if (!!documentTypeMdms) fetchMDMDDocumentTypeSuccess(documentTypeMdms);

    const financialYearFromQuery = getFinancialYearFromQuery();
    this.setState({
      financialYearFromQuery,
    });
    const customTitle = isReassesment
      ? `Property Assessment (${financialYearFromQuery}) : Property Tax Unique ID - ${propertyId}`
      : `Property Assessment (${financialYearFromQuery}) : New Property`;

    renderCustomTitleForPt(customTitle);
    toggleSpinner();

    // if (this.props.location.search.split("&").length > 3) {
    //   try {
    //     let pgUpdateResponse = await httpRequest("pg-service/transaction/v1/_update" + search, "_update", [], {});
    //     let moduleId = get(pgUpdateResponse, "Transaction[0].moduleId");
    //     if (get(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
    //       history.push("/property-tax/payment-failure/" + moduleId.split("-", 3).join("-"));
    //     } else {
    //       history.push("/property-tax/payment-success/" + moduleId.split("-", 3).join("-"));
    //     }
    //   } catch (e) {
    //     alert(e);
    //     // history.push("/property-tax/payment-success/"+moduleId.split("-",(moduleId.split("-").length-1)).join("-"))
    //   }
    // }
  };

  getImportantDates = async () => {
    const { currentTenantId } = this.props;
    const financialYearFromQuery = getFinancialYearFromQuery();
    try {
      let ImpDatesResponse = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], {
        MdmsCriteria: {
          tenantId: currentTenantId,
          moduleDetails: [
            {
              moduleName: "PropertyTax",
              masterDetails: [
                {
                  name: "Rebate",
                },
                {
                  name: "Penalty",
                },
                {
                  name: "Interest",
                },
                {
                  name: "FireCess",
                },
              ],
            },
          ],
        },
      });
      if (ImpDatesResponse && ImpDatesResponse.MdmsRes.PropertyTax) {
        const { Interest, FireCess, Rebate, Penalty } = ImpDatesResponse.MdmsRes.PropertyTax;
        const intrest = findCorrectDateObj(financialYearFromQuery, Interest);
        const fireCess = findCorrectDateObj(financialYearFromQuery, FireCess);
        const rebate = findCorrectDateObj(financialYearFromQuery, Rebate);
        const penalty = findCorrectDateObj(financialYearFromQuery, Penalty);
        this.setState({
          importantDates: {
            intrest,
            fireCess,
            rebate,
            penalty,
          },
        });
      }
    } catch (e) {
      alert(e);
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

  updateEstimate = () => {
    this.estimate().then((estimateResponse) => {
      if (estimateResponse) {
        this.setState({
          estimation: estimateResponse ? estimateResponse.Calculation : [],
          totalAmountToBePaid: estimateResponse && estimateResponse.Calculation && estimateResponse.Calculation[0].totalAmount,
          valueSelected: "Full_Amount",
        });
      }
    });
  };

  onRadioButtonChange = (e) => {
    let { estimation } = this.state;
    let { totalAmount } = estimation[0] || {};
    if (e.target.value === "Full_Amount") {
      this.setState({ totalAmountToBePaid: totalAmount, valueSelected: "Full_Amount", partialAmountError: "" });
    } else {
      this.setState({ totalAmountToBePaid: 100, valueSelected: "Partial_Amount" });
    }
  };

  renderStepperContent = (selected, fromReviewPage) => {
    const { renderPlotAndFloorDetails, getOwnerDetails, updateEstimate } = this;
    const { draftRequest, estimation, totalAmountToBePaid, financialYearFromQuery, importantDates, valueSelected, partialAmountError } = this.state;
    const { onRadioButtonChange, updateTotalAmount } = this;
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
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
              estimationDetails={estimation}
              updateEstimate={updateEstimate}
              importantDates={importantDates}
              totalAmount={totalAmountToBePaid}
            />
          </div>
        );
      case 4:
        return (
          <PaymentDetails
            onRadioButtonChange={onRadioButtonChange}
            updateTotalAmount={updateTotalAmount}
            estimationDetails={estimation}
            financialYr={financialYearFromQuery}
            totalAmountToBePaid={totalAmountToBePaid}
            optionSelected={valueSelected}
            importantDates={importantDates}
            partialAmountError={partialAmountError}
            isPartialPaymentInValid={
              get(this.state, "estimation[0].totalAmount", 1) < 100 ||
              get(this.props.form, "basicInformation.fields.typeOfBuilding.value", "").toLowerCase() === "vacant"
            }
          />
        );
      default:
        return null;
    }
  };

  onTabClick = (index) => {
    const { formValidIndexArray, selected } = this.state;
    const { location } = this.props;
    let { search } = location;
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    if (formValidIndexArray.indexOf(index) !== -1 && selected >= index) {
      !isCompletePayment
        ? this.setState({
            selected: index,
            formValidIndexArray: range(0, index),
          })
        : alert("Not authorized to edit this property details");
    } else {
      // alert("Please fill required tabs");
    }
  };

  updateIndex = (index) => {
    const { callDraft, pay, estimate, createReceipt, validateUnitandPlotSize } = this;
    const { selected, formValidIndexArray, financialYearFromQuery } = this.state;
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
        this.getImportantDates();
        break;
      case 2:
        const { ownershipType } = form;
        const estimateCall = () => {
          estimate().then((estimateResponse) => {
            if (estimateResponse) {
              this.setState({
                estimation: estimateResponse && estimateResponse.Calculation,
                totalAmountToBePaid: estimateResponse && estimateResponse.Calculation && estimateResponse.Calculation[0].totalAmount,
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
        this.setState({ selected: index, formValidIndexArray: [...formValidIndexArray, selected] });
        break;
      case 4:
        this.setState({ selected: index, formValidIndexArray: range(0, index) });
        break;
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
    const { updateIndex } = this;
    const { isFullPayment, totalAmountToBePaid, estimation } = this.state;
    const { search } = this.props.location;
    const isCompletePayment = getQueryValue(search, "isCompletePayment");
    // const queryObj = [
    //   { key: "propertyId", value: propertyId },
    //   { key: "assessmentNumber", value: assessmentNumber },
    //   { key: "assessmentYear", value: assessmentYear },
    //   { key: "amountExpected", value: isFullPayment ? estimation[0].totalAmount : totalAmountToBePaid },
    // ];
    this.setState({ propertyDetails: { propertyId, assessmentNumber, assessmentYear, tenantId } });
    try {
      if (!isCompletePayment) {
        const getBill = await this.callGetBill(propertyId, assessmentNumber, assessmentYear, tenantId);
        const { Bill } = getBill && getBill;
        this.setState({ Bill });
      }
      // try {
      //   const requestBody = {
      //     Transaction: {
      //       tenantId: localStorage.getItem("tenant-id"),
      //       txnAmount: get(getBill, "Bill[0].billDetails[0].totalAmount"),
      //       module: "PT",
      //       billId: get(getBill, "Bill[0].id"),
      //       moduleId: get(getBill, "Bill[0].billDetails[0].consumerCode"),
      //       productInfo: "Property Tax Payment",
      //       gateway: "AXIS",
      //       callbackUrl: window.location.href,
      //     },
      //   };
      //   const goToPaymentGateway = await httpRequest("pg-service/transaction/v1/_create", "_create", [], requestBody);
      //   const redirectionUrl = get(goToPaymentGateway, "Transaction.redirectUrl");
      //   window.location = redirectionUrl;
      // } catch (e) {
      //   console.log(e);
      // }
      updateIndex(4);
    } catch (e) {
      console.log(e);
    }
  };

  changeDateToFormat = (date) => {
    return new Date(date).getTime();
  };

  getSingleOwnerInfo = () => {
    const { ownerInfo } = this.props.form;
    const ownerObj = {
      document: {},
    };
    Object.keys(ownerInfo.fields).map((field) => {
      const jsonPath = ownerInfo.fields[field].jsonPath;
      if (jsonPath.toLowerCase().indexOf("document") !== -1) {
        ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
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
          document: {},
        };
        Object.keys(currForm.fields).map((field) => {
          const jsonPath = currForm.fields[field].jsonPath;
          if (jsonPath.toLowerCase().indexOf("document") !== -1) {
            ownerObj.document[jsonPath.substring(jsonPath.lastIndexOf(".") + 1, jsonPath.length)] =
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

  createReceipt = async () => {
    const { prepareFormData } = this.props;
    const { Bill, propertyDetails } = this.state;
    const { assessmentNumber, propertyId, tenantId, assessmentYear } = propertyDetails;
    // if (
    //   !get(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate") ||
    //   !get(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptNumber")
    // ) {
    //   set(prepareFormData, "Receipt[0].Bill", []); //Fix for re-filling of form - prepareFormData retains the old bill - But Why?
    // }
    set(prepareFormData, "Receipt[0].Bill[0].billDetails[0].amountPaid", 0);
    prepareFormData.Receipt[0].Bill[0] = { ...Bill[0], ...prepareFormData.Receipt[0].Bill[0] };
    prepareFormData.Receipt[0].Bill[0].billDetails[0] = { ...Bill[0].billDetails[0], ...prepareFormData.Receipt[0].Bill[0].billDetails[0] };
    if (!get(prepareFormData, "Receipt[0].instrument.instrumentType.name")) {
      set(prepareFormData, "Receipt[0].instrument.instrumentType.name", "Cash");
    }
    set(prepareFormData, "Receipt[0].Bill[0].billDetails[0].amountPaid", this.state.totalAmountToBePaid);
    set(prepareFormData, "Receipt[0].instrument.tenantId", get(prepareFormData, "Receipt[0].Bill[0].tenantId"));
    get(prepareFormData, "Receipt[0].instrument.transactionDateInput") &&
      set(
        prepareFormData,
        "Receipt[0].instrument.transactionDateInput",
        this.changeDateToFormat(get(prepareFormData, "Receipt[0].instrument.transactionDateInput"))
      );
    get(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate") &&
      set(
        prepareFormData,
        "Receipt[0].Bill[0].billDetails[0].manualReceiptDate",
        this.changeDateToFormat(get(prepareFormData, "Receipt[0].Bill[0].billDetails[0].manualReceiptDate"))
      );
    set(prepareFormData, "Receipt[0].instrument.amount", this.state.totalAmountToBePaid);
    set(prepareFormData, "Receipt[0].tenantId", get(prepareFormData, "Receipt[0].Bill[0].tenantId"));
    const formData = {
      Receipt: prepareFormData["Receipt"],
    };

    if (
      get(prepareFormData, "Receipt[0].instrument.transactionNumber") &&
      get(prepareFormData, "Receipt[0].instrument.transactionNumberConfirm") &&
      get(prepareFormData, "Receipt[0].instrument.transactionNumber") !== get(prepareFormData, "Receipt[0].instrument.transactionNumberConfirm")
    ) {
      this.props.toggleSnackbarAndSetText(true, "Transaction Numbers don't match", true);
      return;
    }

    if (this.state.totalAmountToBePaid === "") {
      this.props.toggleSnackbarAndSetText(true, "Amount to pay can't be empty", true);
      return;
    }

    if (!get(prepareFormData, "Receipt[0].Bill[0].paidBy")) {
      set(prepareFormData, "Receipt[0].Bill[0].paidBy", get(prepareFormData, "Receipt[0].Bill[0].payeeName"));
    }

    try {
      const userInfo = {
        id: 23432,
        userName: "8050579149",
        name: "Gyan",
        type: "CITIZEN",
        mobileNumber: "8050579149",
        emailId: null,
        roles: [
          {
            id: 281,
            name: "Citizen",
            code: "CITIZEN",
          },
        ],
        tenantId: "pb",
        uuid: "7737b382-1bc5-4e84-a57b-b9a9a9ceef46",
      };
      const getReceipt = await httpRequest("collection-services/receipts/_create", "_create", [], formData, [], {
        userInfo,
        ts: 0,
      });
      if (getReceipt && getReceipt.Receipt && getReceipt.Receipt.length) {
        set(prepareFormData, "Receipt[0].Bill", []);
        this.props.history.push(`payment-success/${propertyId}/${tenantId}/${assessmentNumber}/${assessmentYear}`);
      } else {
        console.log(getReceipt);
      }
    } catch (e) {
      console.log(e);
      set(prepareFormData, "Receipt[0].Bill", []);
      this.props.history.push(`payment-failure/${propertyId}/${tenantId}/${assessmentNumber}/${assessmentYear}`);
    }
  };

  estimate = async () => {
    let { form, common, toggleSpinner } = this.props;
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
      const propertyDetails = normalizePropertyDetails(prepareFormData.Properties, this.props);
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
    const financialYearFromQuery = getFinancialYearFromQuery();
    let { form, common, location } = this.props;
    const { search } = location;
    const propertyId = getQueryValue(search, "propertyId");
    const assessmentId = getQueryValue(search, "assessmentId");
    const tenantId = getQueryValue(search, "tenantId");
    const isCompletePayment = getQueryValue(search, "isCompletePayment");

    const propertyMethodAction = !!propertyId ? "_update" : "_create";
    let prepareFormData = { ...this.props.prepareFormData };

    if (get(prepareFormData, "Properties[0].propertyDetails[0].institution", undefined))
      delete prepareFormData.Properties[0].propertyDetails[0].institution;
    const selectedownerShipCategoryType = get(form, "ownershipType.fields.typeOfOwnership.value", "");
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

    set(
      prepareFormData,
      "Properties[0].propertyDetails[0].citizenInfo.mobileNumber",
      get(prepareFormData, "Properties[0].propertyDetails[0].owners[0].mobileNumber")
    );

    if (selectedownerShipCategoryType.toLowerCase().indexOf("institutional") !== -1) {
      const { instiObj, ownerArray } = this.getInstituteInfo();
      set(prepareFormData, "Properties[0].propertyDetails[0].owners", ownerArray);
      set(prepareFormData, "Properties[0].propertyDetails[0].institution", instiObj);
      set(prepareFormData, "Properties[0].propertyDetails[0].ownershipCategory", get(form, "ownershipType.fields.typeOfOwnership.value", ""));
      set(prepareFormData, "Properties[0].propertyDetails[0].subOwnershipCategory", get(form, "institutionDetails.fields.type.value", ""));
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].citizenInfo.mobileNumber",
        get(form, "institutionAuthority.fields.mobile.value", get(form, "institutionAuthority.fields.telephone.value", null))
      );
    }

    try {
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].citizenInfo.name",
        get(prepareFormData, "Properties[0].propertyDetails[0].owners[0].name")
      );

      if (isCompletePayment) {
        callPGService(propertyId, assessmentId, financialYearFromQuery, tenantId);
      } else {
        const properties = normalizePropertyDetails(prepareFormData.Properties, this.props);
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
      alert(e);
    }
  };

  getHeaderLabel = (selected) => {
    switch (selected) {
      case 0:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_EMP_FORM1_HEADER_MESSAGE" />;
      case 1:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_EMP_FORM2_HEADER_MESSAGE" />;
      case 2:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_EMP_FORM3_HEADER_MESSAGE" />;
      case 3:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_EMP_FORM4_HEADER_MESSAGE" />;
      case 4:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_EMP_FORM5_HEADER_MESSAGE" />;
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

  closeDeclarationDialogue = () => {
    this.setState({ dialogueOpen: false });
  };

  onPayButtonClick = () => {
    const { isFullPayment, partialAmountError, totalAmountToBePaid } = this.state;
    if (!isFullPayment && partialAmountError) return;
    if (totalAmountToBePaid % 1 === 0) {
      this.setState({ dialogueOpen: true });
      const { form, prepareFormData } = this.props;
      const formKeysToValidate = ["cardInfo", "cashInfo", "chequeInfo", "demandInfo"];
      let modeOfPaymentExists = false;
      for (let i = 0; i < formKeysToValidate.length; i++) {
        if (Object.keys(form).indexOf(formKeysToValidate[i]) > -1) {
          modeOfPaymentExists = true;
          break;
        }
      }
      if (modeOfPaymentExists) {
        const validateArray = Object.keys(form).reduce((result, item) => {
          if (formKeysToValidate.indexOf(item) > -1) {
            result.push({ formKey: item, formValid: validateForm(form[item]) });
          }
          return result;
        }, []);

        const areFormsValid = validateArray.reduce((result, current) => {
          if (!current.formValid) {
            result = false;
          } else {
            result = true;
          }
          return result;
        }, false);

        if (areFormsValid) {
          this.createReceipt();
        } else {
          validateArray.forEach((item) => {
            if (!item.formValid) {
              this.props.displayFormErrorsAction(item.formKey);
            }
          });
        }
      } else {
        this.createReceipt();
      }
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
          formValidIndexArray={formValidIndexArray}
          updateIndex={this.updateIndex}
          backLabel="PT_COMMONS_GO_BACK"
          nextLabel={selected === 4 ? "PT_COMMONS_NEXT" : "PT_COMMONS_NEXT"}
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
  return { form, currentTenantId, prepareFormData: common.prepareFormData, common };
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
    generalMDMSFetchSuccess: (payload, moduleName, masterArray) => dispatch(generalMDMSFetchSuccess(payload, moduleName, masterArray)),
    fetchMDMDDocumentTypeSuccess: (data) => dispatch(fetchMDMDDocumentTypeSuccess(data)),
    updatePrepareFormDataFromDraft: (prepareFormData) => dispatch(updatePrepareFormDataFromDraft(prepareFormData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
