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
  getCurrentFinancialYear
} from "../utils";
import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { footer } from "./applyResource/footer";
import { tradeReviewDetails } from "./applyResource/tradeReviewDetails";
import { tradeDetails } from "./applyResource/tradeDetails";
import { tradeLocationDetails } from "./applyResource/tradeLocationDetails";
import { tradeOwnerDetails } from "./applyResource/tradeOwnerDetails";
import { documentList } from "./applyResource/documentList";
// import { httpRequest } from "mihy-ui-framework/ui-utils";
// import { updatePFOforSearchResults } from "mihy-ui-framework/ui-utils/commons";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";

const stepsData = ["Trade Details", "Owner Details", "Documents", "Summary"];
const stepper = getStepperObject({ props: { activeStep: 0 } }, stepsData);
const queryValue = getQueryArg(window.location.href, "applicationNumber");

const header = getCommonContainer({
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

const tradeDocumentDetails = getCommonCard({
  header: getCommonTitle({
    labelName: "Please Upload the Required Documents for Verification",
    labelKey: "TL_NEW-UPLOAD-DOCS_HEADER"
  }),
  // paragraph: getCommonParagraph({
  //   labelName:
  //     "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
  //   labelKey: "TL_NEW-UPLOAD-DOCS_SUBHEADER"
  // }),
  documentList
});

const getMdmsData = async (action, state, dispatch) => {
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
    payload = commonTransform(payload, "MdmsRes.TradeLicense.TradeType");
    payload = commonTransform(
      payload,
      "MdmsRes.common-masters.OwnerShipCategory"
    );
    payload = commonTransform(payload, "MdmsRes.common-masters.StructureType");
    set(
      payload,
      "MdmsRes.TradeLicense.TradeTypeTransformed",
      objectToDropdown(get(payload, "MdmsRes.TradeLicense.TradeType", []))
    );
    set(
      payload,
      "MdmsRes.common-masters.StructureTypeTransformed",
      objectToDropdown(get(payload, "MdmsRes.common-masters.StructureType", []))
    );
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

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    if (queryValue) {
      updatePFOforSearchResults(action, state, dispatch, queryValue);
    }
    getMdmsData(action, state, dispatch);
    const tenantId = localStorage.getItem("tenant-id");
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
        formwizardFirstStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            tradeDetails,
            tradeLocationDetails
          }
        },
        formwizardSecondStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            tradeOwnerDetails
          },
          visible: false
        },
        formwizardThirdStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            tradeDocumentDetails
          },
          visible: false
        },
        formwizardFourthStep: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            tradeReviewDetails
          },
          visible: false
        },
        footer
      }
    }
  }
};

export default screenConfig;
