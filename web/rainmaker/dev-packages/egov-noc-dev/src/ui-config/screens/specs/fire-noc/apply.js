import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCurrentFinancialYear } from "../utils";
import { footer } from "./applyResource/footer";
import { nocDetails } from "./applyResource/nocDetails";
import { propertyDetails } from "./applyResource/propertyDetails";
import { propertyLocationDetails } from "./applyResource/propertyLocationDetails";
import { applicantDetails } from "./applyResource/applicantDetails";
import { documentDetails } from "./applyResource/documentDetails";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import set from "lodash/set";
import get from "lodash/get";

export const stepsData = [
  { labelName: "NOC Details", labelKey: "NOC_COMMON_NOC_DETAILS" },
  { labelName: "Property Details", labelKey: "NOC_COMMON_PROPERTY_DETAILS" },
  { labelName: "Applicant Details", labelKey: "NOC_COMMON_APPLICANT_DETAILS" },
  { labelName: "Documents", labelKey: "NOC_COMMON_DOCUMENTS" }
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

const applicationNumberContainer = () => {
  const applicationNumber = getQueryArg(
    window.location.href,
    "applicationNumber"
  );
  if (applicationNumber)
    return {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-noc",
      componentPath: "ApplicationNoContainer",
      props: {
        number: `${applicationNumber}`,
        visibility: "hidden"
      },
      visible: true
    };
  else return {};
};

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Application for Fire NOC (${getCurrentFinancialYear()})`, //later use getFinancialYearDates
    labelKey: "NOC_COMMON_APPLY_NOC"
  }),
  applicationNumber: applicationNumberContainer()
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    nocDetails
  }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    propertyDetails,
    propertyLocationDetails
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
    applicantDetails
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
    documentDetails
  },
  visible: false
};

const getMdmsData = async (action, state, dispatch) => {
  let tenantId = getTenantId();
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "common-masters",
          masterDetails: [{ name: "OwnerType" }, { name: "OwnerShipCategory" }]
        },
        {
          moduleName: "firenoc",
          masterDetails: [{ name: "BuildingType" }, { name: "FireStations" }]
        },
        {
          moduleName: "egov-location",
          masterDetails: [
            {
              name: "TenantBoundary"
              // filter: "$.*.hierarchyType"
            }
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
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const getFirstListFromDotSeparated = list => {
  list = list.map(item => {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [...new Set(list)].map(item => {
    return { code: item };
  });
  return list;
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const applicationNumber = getQueryArg(
      window.location.href,
      "applicationNumber"
    );
    const step = getQueryArg(window.location.href, "step");

    // Set Property City
    dispatch(
      prepareFinalObject(
        "FireNOCs[0].fireNOCDetails.propertyDetails.address.city",
        getTenantId()
      )
    );

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(response => {
      // Set Dropdowns Data
      let buildingUsageTypeData = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
        []
      );
      buildingUsageTypeData = getFirstListFromDotSeparated(
        buildingUsageTypeData
      );
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.DropdownsData.BuildingUsageType",
          buildingUsageTypeData
        )
      );
      let ownershipCategory = get(
        state,
        "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory",
        []
      );
      ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.DropdownsData.OwnershipCategory",
          ownershipCategory
        )
      );
    });

    let pfo = {};
    if (applicationNumber && !step) {
      pfo = {
        fireNOCDetails: {
          propertyDetails: {
            address: {
              city: "pb.amritsar",
              locality: { code: "SUN04" },
              pincode: "500076"
            },
            firestationId: "FS_AMRITSAR_01"
          },
          buildingDetails: {
            buildings: {
              "0": {
                name: "DSR Rainbow Heights",
                usageType: "GROUP_A_RESIDENTIAL",
                usageSubType: "GROUP_A_RESIDENTIAL.SUBDIVISIONA-1",
                noOfFloors: "2",
                noOfBasements: "1",
                plotSize: "1000",
                builtupArea: "650",
                heightOfBuilding: "5000"
              },
              noOfBuildings: "SINGLE"
            }
          },
          fireNOCType: "PROVISIONAL",
          applicantDetails: {
            ownerShipType: "INDIVIDUAL.SINGLEOWNER",
            owners: [
              {
                id: 23442,
                userName: "9167765477",
                salutation: null,
                name: "Avijeet",
                gender: "MALE",
                mobileNumber: "9167765477",
                emailId: "avi7@gm.com",
                altContactNumber: null,
                pan: "bnhpp5432k",
                aadhaarNumber: null,
                permanentAddress: null,
                permanentCity: null,
                permanentPinCode: null,
                correspondenceAddress: "Some correspondance address",
                correspondenceCity: null,
                correspondencePinCode: null,
                addresses: [
                  {
                    pinCode: null,
                    city: null,
                    address: "Some correspondance address",
                    type: "PERMANENT",
                    id: 48685,
                    tenantId: "pb",
                    userId: 23442,
                    addressType: "PERMANENT",
                    lastModifiedDate: null,
                    lastModifiedBy: null
                  }
                ],
                active: true,
                locale: null,
                type: "CITIZEN",
                accountLocked: false,
                accountLockedDate: 0,
                fatherOrHusbandName: "A",
                signature: null,
                bloodGroup: null,
                photo: null,
                identificationMark: null,
                createdBy: 0,
                lastModifiedBy: 1,
                tenantId: "pb",
                roles: [{ code: "CITIZEN", name: "Citizen", tenantId: "pb" }],
                uuid: "d9fb76e8-3c65-4e11-9f5f-2998c0f8b8a6",
                createdDate: 1532962200000,
                lastModifiedDate: 1554819900000,
                dob: "1991-06-28",
                pwdExpiryDate: 1541451000000,
                relationship: "FATHER",
                ownerType: "FREEDOMFIGHTER"
              }
            ]
          }
        }
      };
      dispatch(prepareFinalObject("FireNOCs[0]", pfo));
    }
    if (step && get(state, "screenConfiguration.preparedFinalObject")) {
      pfo = get(state, "screenConfiguration.preparedFinalObject.FireNOCs[0]", {});
    }

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      let intStep = parseInt(step);
      set(
        action.screenConfig,
        "components.div.children.stepper.props.activeStep",
        intStep
      );
      let formWizardNames = [
        "formwizardFirstStep",
        "formwizardSecondStep",
        "formwizardThirdStep",
        "formwizardFourthStep"
      ];
      for (let i = 0; i < 4; i++) {
        set(
          action.screenConfig,
          `components.div.children.${formWizardNames[i]}.visible`,
          i == step
        );
        set(
          action.screenConfig,
          `components.div.children.footer.children.previousButton.visible`,
          step != 0
        );
      }
    }

    // Set defaultValues of radiobuttons and selectors
    let noOfBuildings = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildingDetails.buildings.noOfBuildings",
      "SINGLE"
    );
    set(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildingDetails.buildings.noOfBuildings",
      noOfBuildings
    );
    let nocType = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType",
      "PROVISIONAL"
    );
    set(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType",
      nocType
    );

    // Preset multi-cards
    if (
      get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildingDetails.buildings[0].usageType"
      ) === "Multiple Building"
    ) {
      set(
        action.screenConfig,
        "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.props.style",
        { display: "none" }
      );
      set(
        action.screenConfig,
        "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.props.style",
        {}
      );
    }
    if (
      get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.fireNOCType"
      ) === "PROVISIONAL"
    ) {
      set(
        action.screenConfig,
        "components.div.children.formwizardFirstStep.children.nocDetails.children.cardContent.children.nocDetailsContainer.children.provisionalNocNumber.props.style",
        { visibility: "hidden" }
      );
    }
    if (
      get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
        ""
      ).includes("MULTIPLEOWNERS")
    ) {
      set(
        action.screenConfig,
        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style",
        { display: "none" }
      );
      set(
        action.screenConfig,
        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.multipleApplicantContainer.props.style",
        {}
      );
    } else if (
      get(
        state,
        "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
        ""
      ).includes("INSTITUTIONAL")
    ) {
      set(
        action.screenConfig,
        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.singleApplicantContainer.props.style",
        { display: "none" }
      );
      set(
        action.screenConfig,
        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.institutionContainer.props.style",
        {}
      );
      set(
        action.screenConfig,
        "components.div.children.formwizardThirdStep.children.applicantDetails.children.cardContent.children.applicantTypeContainer.children.applicantSubType.props.style",
        {}
      );
    }

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
    }
  }
};

export default screenConfig;
