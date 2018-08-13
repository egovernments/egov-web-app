import React, { Component } from "react";
import WizardComponent from "./components/WizardComponent";
import { Icon, Button } from "components";
import { MDMS } from "egov-ui-kit/utils/endPoints";

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
import PaymentDetails from "modules/employee/PropertyTax/FormWizard/components/PaymentDetails";
import "./index.css";

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
    totalAmountToBePaid: 0,
    isFullPayment: true,
    valueSelected: "Full_Amount",
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
        selectedTabIndex: assessmentNumber ? selected : selected + 1,
        ...form,
        assessmentNumber,
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

  updateTotalAmount = (value, isFullPayment) => {
    console.log(value);
    this.setState({
      totalAmountToBePaid: value,
      isFullPayment,
    });
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

      const currentDraft = draftsResponse.drafts.find((res) => get(res, "draftRecord.assessmentNumber", "") === draftId);
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
      console.log(e);
    }
  };

  getAssessmentId = (query, key) => get(queryString.parse(query), key, undefined);

  componentWillMount = () => {};

  componentDidMount = async () => {
    let { history } = this.props;
    let { search } = this.props.location;
    let financialYearFromQuery = window.location.search.split("FY=")[1];
    if (financialYearFromQuery) {
      financialYearFromQuery = financialYearFromQuery.split("&")[0];
      this.setState({
        financialYearFromQuery,
      });
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
    this.getImportantDates(financialYearFromQuery);
    if (this.props.location.search.split("&").length > 3) {
      try {
        let pgUpdateResponse = await httpRequest("pg-service/transaction/v1/_update" + search, "_update", [], {});
        console.log(pgUpdateResponse);
        let moduleId = get(pgUpdateResponse, "Transaction[0].moduleId");
        if (get(pgUpdateResponse, "Transaction[0].txnStatus") === "FAILURE") {
          history.push("/property-tax/payment-failure/" + moduleId.split("-", 3).join("-"));
        } else {
          history.push("/property-tax/payment-success/" + moduleId.split("-", 3).join("-"));
        }
      } catch (e) {
        alert(e);
        // history.push("/property-tax/payment-success/"+moduleId.split("-",(moduleId.split("-").length-1)).join("-"))
      }
    }
  };

  getImportantDates = async (financialYearFromQuery) => {
    console.log("hit", financialYearFromQuery);
    try {
      let ImpDatesResponse = await httpRequest(MDMS.GET.URL, MDMS.GET.ACTION, [], {
        MdmsCriteria: {
          tenantId: "pb",
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
        const intrest = this.findCorrectDateObj(financialYearFromQuery, Interest);
        const fireCess = this.findCorrectDateObj(financialYearFromQuery, FireCess);
        const rebate = this.findCorrectDateObj(financialYearFromQuery, Rebate);
        const penalty = this.findCorrectDateObj(financialYearFromQuery, Penalty);
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

  findCorrectDateObj = (financialYear, category) => {
    const categoryYear = category.reduce((categoryYear, item) => {
      const year = item.fromFY && item.fromFY.slice(0, 4);
      categoryYear.push(year);
      return categoryYear;
    }, []);
    const assessYear = financialYear && financialYear.slice(0, 4);
    let chosenDateObj = {};
    const index = categoryYear.indexOf(assessYear);
    if (index > -1) {
      chosenDateObj = category[index];
    } else {
      categoryYear.sort((a, b) => a > b);
      for (let i = 0; i < categoryYear.length; i++) {
        if (assessYear > categoryYear[i]) {
          chosenDateObj = category[i - 1];
          break;
        }
      }
    }
    return chosenDateObj;
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
    console.log(estimation);
    let { totalAmount } = estimation[0] || {};
    if (e.target.value === "Full_Amount") {
      this.setState({ totalAmountToBePaid: totalAmount, valueSelected: "Full_Amount" });
    } else {
      this.setState({ totalAmountToBePaid: 0, valueSelected: "Partial_Amount" });
    }
  };

  renderStepperContent = (selected, fromReviewPage) => {
    const { renderPlotAndFloorDetails, getOwnerDetails, updateEstimate } = this;
    const { draftRequest, estimation, totalAmountToBePaid, financialYearFromQuery, importantDates, valueSelected } = this.state;
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
          <div>
            <ReviewForm
              updateIndex={this.updateIndex}
              stepZero={this.renderStepperContent(0, fromReviewPage)}
              stepOne={this.renderStepperContent(1, fromReviewPage)}
              stepTwo={this.renderStepperContent(2, fromReviewPage)}
              estimationDetails={estimation}
              updateEstimate={updateEstimate}
              importantDates={importantDates}
              // financialYr={financialYear ? financialYear.fields.button : {}}
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
          />
        );
      default:
        return null;
    }
  };

  updateIndex = (index) => {
    const { callDraft, pay, estimate, createReceipt, validateUnitandPlotSize } = this;
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
              totalAmountToBePaid: estimateResponse && estimateResponse.Calculation && estimateResponse.Calculation[0].totalAmount,
              valueSelected: "Full_Amount",
            });
          }
        });

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
      const plotSizeInFt = parseFloat(plotDetails.fields.plotSize.value) * 9;
      if (unitTotal > plotSizeInFt) {
        return false;
      } else return true;
    } else return true;
  };

  callPGService = async (propertyId, assessmentNumber, assessmentYear, tenantId) => {
    const { updateIndex } = this;
    const queryObj = [
      { key: "propertyId", value: propertyId },
      { key: "assessmentNumber", value: assessmentNumber },
      { key: "assessmentYear", value: assessmentYear },
    ];
    this.setState({ propertyDetails: { propertyId, assessmentNumber, assessmentYear, tenantId } });
    try {
      const getBill = await httpRequest("pt-calculator-v2/propertytax/_getbill", "_create", queryObj, {});
      const { Bill } = getBill;
      this.setState({ Bill });
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
    const dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let dt = dateObj.getDate();
    dt = dt < 10 ? "0" + dt : dt;
    month = month < 10 ? "0" + month : month;
    return dt + "-" + month + "-" + year;
  };

  createReceipt = async () => {
    const { prepareFormData } = this.props;
    const { Bill, propertyDetails } = this.state;
    const { assessmentNumber, propertyId, tenantId, assessmentYear } = propertyDetails;
    prepareFormData.Receipt[0].Bill[0] = { ...Bill[0], ...prepareFormData.Receipt[0].Bill[0] };
    if (!get(prepareFormData, "Receipt[0].instrument.instrumentType.name")) {
      set(prepareFormData, "Receipt[0].instrument.instrumentType.name", "Cash");
    }
    set(prepareFormData, "Receipt[0].Bill[0].billDetails[0].amountPaid", this.state.totalAmountToBePaid); //hardcoded -- needs to change
    get(prepareFormData, "Receipt[0].instrument.transactionDate") &&
      set(
        prepareFormData,
        "Receipt[0].instrument.transactionDate",
        this.changeDateToFormat(get(prepareFormData, "Receipt[0].instrument.transactionDate"))
      );
    set(prepareFormData, "Receipt[0].instrument.amount", this.state.totalAmountToBePaid);
    set(prepareFormData, "Receipt[0].tenantId", get(prepareFormData, "Receipt[0].Bill[0].tenantId"));
    const formData = {
      Receipt: prepareFormData["Receipt"],
    };
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
        this.props.history.push(`payment-success/${propertyId}/${tenantId}/${assessmentNumber}`);
      } else {
        console.log(getReceipt);
      }
    } catch (e) {
      console.log(e);
      this.props.history.push(`payment-failure/${propertyId}/${tenantId}/${assessmentNumber}/${assessmentYear}`);
    }
  };

  estimate = async () => {
    let { prepareFormData } = this.props;
    const { draft } = this.state.draftRequest;
    const { financialYearFromQuery } = this.state;
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
      // console.log(estimateResponse.Calculation);
      // this.setState({
      //   estimation: estimateResponse && estimateResponse.Calculation,
      // });
      return estimateResponse;
    } catch (e) {
      alert(e);
    }
  };

  pay = async () => {
    const { callPGService, callDraft } = this;
    let { prepareFormData } = this.props;
    try {
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].citizenInfo.mobileNumber",
        get(prepareFormData, "Properties[0].propertyDetails[0].owners[0].mobileNumber")
      );
      set(
        prepareFormData,
        "Properties[0].propertyDetails[0].citizenInfo.name",
        get(prepareFormData, "Properties[0].propertyDetails[0].owners[0].name")
      );
      set(prepareFormData, "Properties[0].address.locality.area", "Area3");
      const properties = this.normalizePropertyDetails(prepareFormData.Properties);
      let createPropertyResponse = await httpRequest("pt-services-v2/property/_create", "_create", [], { Properties: properties });
      callDraft([], get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"));
      callPGService(
        get(createPropertyResponse, "Properties[0].propertyId"),
        get(createPropertyResponse, "Properties[0].propertyDetails[0].assessmentNumber"),
        get(createPropertyResponse, "Properties[0].propertyDetails[0].financialYear"),
        get(createPropertyResponse, "Properties[0].tenantId")
      );
    } catch (e) {
      alert(e);
    }
  };

  normalizePropertyDetails = (properties) => {
    const propertyInfo = JSON.parse(JSON.stringify(properties));
    const property = propertyInfo[0] || {};
    const { propertyDetails } = property;
    const buildUpAreaInFt = propertyDetails[0].buildUpArea && parseFloat(propertyDetails[0].buildUpArea) * 9;
    const landAreaInFt = propertyDetails[0].landArea && parseFloat(propertyDetails[0].landArea) * 9;
    const units = propertyDetails[0].units.filter((item, ind) => {
      return item !== null;
    });
    propertyDetails[0].units = units;
    propertyDetails[0].buildUpArea = buildUpAreaInFt;
    propertyDetails[0].landArea = landAreaInFt;
    return propertyInfo;
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
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM1_HEADER_MESSAGE" />;
      case 1:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM2_HEADER_MESSAGE" />;
      case 2:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM3_HEADER_MESSAGE" />;
      case 3:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM4_HEADER_MESSAGE" />;
      case 4:
        return <Label containerStyle={{ marginTop: 12 }} fontSize="16px" color="#484848" label="PT_FORM5_HEADER_MESSAGE" />;
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
    this.setState({ dialogueOpen: true });
    const { form } = this.props;
    const formKeysToValidate = ["cardInfo", "cashInfo", "chequeInfo", "demandInfo"];
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
          backLabel="PT_COMMONS_GO_BACK"
          nextLabel={selected === 4 ? "PT_HOME_PAY" : "PT_COMMONS_NEXT"}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormWizard);
