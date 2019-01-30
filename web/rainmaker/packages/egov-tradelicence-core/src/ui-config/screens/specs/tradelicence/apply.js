import {
  //getStepperObject,
  getCommonHeader,
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getCommonParagraph
} from "egov-ui-framework/ui-config/screens/specs/utils";

import get from "lodash/get";
import set from "lodash/set";

import {
  commonTransform,
  objectToDropdown,
  getCurrentFinancialYear,
  getAllDataFromBillingSlab
} from "../utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
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

import {stepperObject }from "./stepperJson";
export const stepsData = [
  { labelName: "Trade Details", labelKey: "TL_COMMON_TR_DETAILS" },
  { labelName: "Owner Details", labelKey: "TL_COMMON_OWN_DETAILS" },
  { labelName: "Documents", labelKey: "TL_COMMON_DOCS" },
  { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }
];
// export const stepper = getStepperObject(
//   { props: { activeStep: 0 } },
//   stepsData
// );

export const stepper =  {
      componentPath: "StepperWithFooter",
      uiFramework: "custom-containers-local",
      props:{ ...stepperObject, activeStep: 0 }
        




        // steps: stepsData,
        // ...stpperProps.props,
        // screenProps: {
        //   screen: { screenKey: "apply", path: "components.div.children.stepper.props" }, childrens: [{ path: "components.div.children.formwizardFirstStep", errMsg: "Please fill all mandatory fields for Trade Details, then do next !" }, { path: "components.div.children.formwizardSecondStep", errMsg: "Please fill all mandatory fields for Owner Details, then do next !" },
        //   { path: "components.div.children.formwizardThirdStep", errMsg: "" },
        //   { path: "components.div.children.formwizardFourthStep", errMsg: "" }]
        // },
        // screenVaidatePaths: [["tradeDetails.children.cardContent.children.tradeDetailsConatiner.children", "tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children", { dataPath: "tradeDetails.children.cardContent.children.accessoriesCard.props.items", childrenPath: "children.cardContent.children.accessoriesCardContainer.children", isMultiple: true },
        //   {
        //     dataPath: "tradeDetails.children.cardContent.children.tradeUnitCard.props.items",
        //     childrenPath: "children.cardContent.children.tradeUnitCardContainer.children", isMultiple: true
        //   }
        // ]],
        // footerProps: [
        //   {
        //     label: {
        //       labelName: "Previous Step",
        //       labelKey: "TL_COMMON_BUTTON_PREV_STEP"
        //     },
        //     customProps: { variant: "outlined" },
        //     iconProps: { name: "keyboard_arrow_left", position: "before" },
        //     visibleFor: [1, 2, 3],
        //     mode: "previous"
        //   }, {
        //     label: {
        //       labelName: "Next Step",
        //       labelKey: "TL_COMMON_BUTTON_NXT_STEP"
        //     },
        //     iconProps: { name: "keyboard_arrow_right", position: "after" },
        //     customProps: { style: { marginRight: "45px" } },
        //     visibleFor: [0, 1, 2],
        //     mode: "next"
        //   },
        //   {
        //     label: {
        //       labelName: "Submit",
        //       labelKey: "TL_COMMON_BUTTON_SUBMIT"
        //     },
        //     iconProps: { name: "keyboard_arrow_right", position: "after" },
        //     customProps: { style: { marginRight: "45px" } },
        //     visibleFor: [3],
        //   },
        // ]
  
};

// export const queryValue = getQueryArg(
//   window.location.href,
//   "applicationNumber"
// );

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
    set(
      payload,
      "MdmsRes.common-masters.OwnerShipCategoryTransformed",
      objectToDropdown(
        get(payload, "MdmsRes.common-masters.OwnerShipCategory", [])
      )
    );
    const localities = get(
      state.screenConfiguration,
      "preparedFinalObject.applyScreenMdmsData.tenant.localities",
      []
    );
    if (localities && localities.length > 0) {
      payload.MdmsRes.tenant.localities = localities;
    }
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (action, state, dispatch) => {
  const queryValue = getQueryArg(window.location.href, "applicationNumber");
  await getMdmsData(action, state, dispatch);
  await getAllDataFromBillingSlab(localStorage.getItem("tenant-id"), dispatch);

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
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    tradeDetails,
    tradeLocationDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    tradeOwnerDetails
  },
  visible: false
};

export const formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    tradeDocumentDetails
  },
  visible: false
};

export const formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    tradeReviewDetails
  },
  visible: false
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  // hasBeforeInitAsync:true,
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
    dispatch(prepareFinalObject("LicensesTemp", []));
    // getData(action, state, dispatch);
    getData(action, state, dispatch).then(responseAction => {
      const tenantId = localStorage.getItem("tenant-id");
      const queryObj = [{ key: "tenantId", value: tenantId }];
      getBoundaryData(action, state, dispatch, queryObj);
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
    });

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
        // footer
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
