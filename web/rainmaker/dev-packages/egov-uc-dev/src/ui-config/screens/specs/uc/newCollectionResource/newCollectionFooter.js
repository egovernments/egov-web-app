import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { convertDateToEpoch } from "../../utils";
//import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const tenantId = "pb.amritsar";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};

export const newCollectionFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "NEXT",
        labelKey: "UC_BUTTON_NEXT"
      }),
      nextButtonIcon: {
        uiFramework: "custom-atoms",
        componentPath: "Icon",
        props: {
          iconName: "keyboard_arrow_right"
        }
      }
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => {
        processDemand(state, dispatch);
      }
    }
  }
});

const convertDateFieldToEpoch = (finalObj, jsonPath) => {
  const dateConvertedToEpoch = convertDateToEpoch(get(finalObj, jsonPath));
  set(finalObj, jsonPath, dateConvertedToEpoch);
};

const allDateToEpoch = (finalObj, jsonPaths) => {
  console.log(jsonPaths);
  jsonPaths.forEach(jsonPath => {
    if (get(finalObj, jsonPath)) {
      convertDateFieldToEpoch(finalObj, jsonPath);
    }
  });
};

const processDemand = (state, dispatch) => {
  createDemand(state, dispatch);
  allDateToEpoch(state.screenConfiguration.preparedFinalObject, [
    "Demands[0].taxPeriodFrom",
    "Demands[0].taxPeriodTo"
  ]);
  // billGenerate(state, dispatch);
  console.log("state:", state);
};
const createDemand = async (state, dispatch) => {
  let queryObject = [
    {
      key: "tenantId",
      value: tenantId
    },
    { key: "offset", value: "0" }
  ];
  let demand = get(state.screenConfiguration.preparedFinalObject, "Demands");
  set(demand[0], "tenantId", "pb.amritsar");
  set(demand[0], "consumerCode", "pt-test-newgit-10/apr-2");
  set(demand[0], "payer.uuid", "4446312c-f21b-4cc3-9572-caca4e37225a");
  set(demand[0], "demandDetails[0].taxHeadMasterCode", "PT_TAX");

  try {
    const payload = await httpRequest(
      "post",
      "/billing-service/demand/_create",
      "",
      [],
      {
        Demands: demand
      }
    );
  } catch (e) {}
  console.log("Demands:", demand);
};
// const billGenerate = (state, dispatch) => {
//   console.log("state:", state);
// };
