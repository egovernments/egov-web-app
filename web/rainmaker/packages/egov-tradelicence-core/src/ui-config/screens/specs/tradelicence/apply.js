import {
  getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";

import { prepareFinalObject } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { footer } from "./applyResource/footer";
import { tradeReviewDetails } from "./applyResource/tradeReviewDetails";
import { tradeDetails } from "./applyResource/tradeDetails";
import { tradeLocationDetails } from "./applyResource/tradeLocationDetails";
import { tradeOwnerDetails } from "./applyResource/tradeOwnerDetails";
import { documentList } from "./applyResource/documentList";
import { httpRequest } from "../../../../ui-utils/api";

const stepsData = ["Trade Details", "Owner Details", "Documents", "Summary"];
const stepper = getStepperObject({ props: { activeStep: 0 } }, stepsData);
const queryValue = getQueryArg(window.location.href, "number");

const header = getCommonContainer({
  header: getCommonHeader("Payment for New Trade License (2018-2019)"),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const tradeDocumentDetails = getCommonCard({
  header: getCommonTitle(
    "Please Upload the Required Documents for Verification"
  ),
  paragraph: getCommonParagraph(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
  ),
  documentList
});

const getSearchResults = async (action, state, dispatch) => {
  let queryObject = [
    { key: "tenantId", value: "pb.amritsar" },
    { key: "applicationNumber", value: queryValue }
  ];
  try {
    const payload = await httpRequest(
      "post",
      "/tl-services/v1/_search",
      "",
      queryObject
    );
    console.log("payload...", payload);
    dispatch(prepareFinalObject("Licenses[0]", payload.Licenses[0]));
  } catch (e) {
    console.log(e);
  }
};

const getMdmsData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: "pb",
      moduleDetails: [
        {
          moduleName: "TradeLicense",
          masterDetails: [{ name: "TradeType" }, { name: "AccessoriesCategory" }]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            { name: "StructureType" },
            { name: "OwnerType" },
            { name: "OwnerShipCategory" },
            { name: "DocumentType" }
          ]
        }
      ]
    }
  }
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    console.log("payload...", payload);
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
      getSearchResults(action, state, dispatch);
    }
    getMdmsData();
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
                xs: "12",
                sm: "10"
              },
              ...header
            },
            helpSection: {
              componentPath: "Button",
              props: {
                color: "primary"
              },
              gridDefination: {
                xs: "12",
                sm: "2",
                align: "right"
              },
              children: {
                buttonLabel: getLabel("help ?")
              }
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
