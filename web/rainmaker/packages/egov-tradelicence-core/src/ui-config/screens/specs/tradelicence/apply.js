import {
  getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getCommonParagraph
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import get from "lodash/get";
import set from "lodash/set";

import {
  commonTransform,
  objectToDropdown,
  getCurrentFinancialYear,
  getAllDataFromBillingSlab
} from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { footer } from "./applyResource/footer";
import { tradeReviewDetails } from "./applyResource/tradeReviewDetails";
import { tradeDetails } from "./applyResource/tradeDetails";
import { tradeLocationDetails } from "./applyResource/tradeLocationDetails";
import { tradeOwnerDetails } from "./applyResource/tradeOwnerDetails";
import { documentList } from "./applyResource/documentList";
import { httpRequest } from "../../../../ui-utils";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";

export const stepsData = [
  "Trade Details",
  "Owner Details",
  "Documents",
  "Summary"
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);
export const queryValue = getQueryArg(
  window.location.href,
  "applicationNumber"
);

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Apply for New Trade License (${getCurrentFinancialYear()})`,
    labelKey: "TL_COMMON_APPL_NEW_LICe"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
});

export const tradeDocumentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Required Documents",
      labelKey: "TL_NEW-UPLOAD-DOCS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  paragraph: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "TL_NEW-UPLOAD-DOCS_SUBHEADER"
  }),
  documentList
});

export const getMdmsData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: "pb",
      moduleDetails: [
        {
          moduleName: "TradeLicense",
          masterDetails: [
            { name: "TradeType" },
            { name: "AccessoriesCategory" }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            { name: "StructureType" },
            { name: "OwnerType" },
            { name: "OwnerShipCategory" },
            { name: "DocumentType" },
            { name: "UOM" }
          ]
        },
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        }
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    set(
      payload,
      "MdmsRes.TradeLicense.MdmsTradeType",
      get(payload, "MdmsRes.TradeLicense.TradeType", [])
    );
    payload = commonTransform(payload, "MdmsRes.TradeLicense.TradeType");
    payload = commonTransform(
      payload,
      "MdmsRes.common-masters.OwnerShipCategory"
    );
    // payload = commonTransform(payload, "MdmsRes.common-masters.StructureType");
    set(
      payload,
      "MdmsRes.TradeLicense.TradeTypeTransformed",
      objectToDropdown(get(payload, "MdmsRes.TradeLicense.TradeType", []))
    );
    // set(
    //   payload,
    //   "MdmsRes.common-masters.StructureTypeTransformed",
    //   objectToDropdown(get(payload, "MdmsRes.common-masters.StructureType", []))
    // );
    set(
      payload,
      "MdmsRes.common-masters.OwnerShipCategoryTransformed",
      objectToDropdown(
        get(payload, "MdmsRes.common-masters.OwnerShipCategory", [])
      )
    );
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (action, state, dispatch, queryValue) => {
  await getMdmsData(action, state, dispatch);
  if (queryValue) {
    await updatePFOforSearchResults(action, state, dispatch, queryValue);
  } else {
    //hardcoding license type to permanent
    dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    dispatch(prepareFinalObject("LicensesTemp", []));
  }
};

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    tradeDetails,
    tradeLocationDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    tradeOwnerDetails
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    tradeDocumentDetails
  },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  children: {
    tradeReviewDetails
  },
  visible: false
};

const setTradeDropdowns = (state, action, dispatch) => {
  const tradeSubTypes = get(
    state.screenConfiguration.preparedFinalObject,
    "Licenses[0].tradeLicenseDetail.tradeUnits",
    []
  );
  if (tradeSubTypes.length > 0) {
    try {
      tradeSubTypes.forEach((tradeSubType, i) => {
        const tradeCat = tradeSubType.tradeType.split(".")[0];
        const tradeType = tradeSubType.tradeType.split(".")[1];
        // console.log(
        //   get(
        //     action,
        //     `components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[${i}].item${i}.children.cardContent.children.tradeUnitCardContainer.children.tradeCategory.props.data`
        //   ),
        //   objectToDropdown(
        //     get(
        //       state.screenConfiguration.preparedFinalObject,
        //       `applyScreenMdmsData.TradeLicense.TradeType.${tradeCat}`,
        //       []
        //     )
        //   )
        // );
        set(
          action,
          `components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[${i}].item${i}.children.cardContent.children.tradeUnitCardContainer.children.tradeCategory.props.data`,
          objectToDropdown(
            get(
              state.screenConfiguration.preparedFinalObject,
              `applyScreenMdmsData.TradeLicense.TradeType.${tradeCat}`,
              []
            )
          )
        );
        set(
          action,
          `components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[${i}].item${i}.children.cardContent.children.tradeUnitCardContainer.children.tradeSubType.props.data`,
          get(
            state.screenConfiguration.preparedFinalObject,
            `applyScreenMdmsData.TradeLicense.TradeType.${tradeCat}.${tradeType}`,
            []
          )
        );
      });
    } catch (e) {
      console.log(e);
    }
  }
  return action;
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const queryValue = getQueryArg(window.location.href, "applicationNumber");
    getData(action, state, dispatch, queryValue);
    getAllDataFromBillingSlab(localStorage.getItem("tenant-id"), dispatch);
    //For Employee, city dropdown will be disabled and prefilled with employee tenantId.
    const tenantId = localStorage.getItem("tenant-id");
    let props = get(
      action.screenConfig,
      "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
      {}
    );
    props.value = tenantId;
    props.disabled = true;
    set(
      action.screenConfig,
      "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.props",
      props
    );
    dispatch(
      prepareFinalObject(
        "Licenses[0].tradeLicenseDetail.address.city",
        tenantId
      )
    );
    //hardcoding license type to permanent
    set(
      action.screenConfig,
      "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLicenseType.props.value",
      "PERMANENT"
    );
    //Call and set boundary dropdown data, since there is no handleField for city in employee app
    const queryObj = [{ key: "tenantId", value: tenantId }];
    getBoundaryData(action, state, dispatch, queryObj);

    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        footer
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "apply"
      }
    }
  }
};

export default screenConfig;
