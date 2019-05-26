import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import get from "lodash/get";
import set from "lodash/set";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { convertDateToEpoch } from "../../utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { ifUserRoleExists } from "../../utils";
// import { fetchMDMSData } from "egov-ui-kit/redux/common/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject
} from "egov-ui-framework/ui-redux/screen-configuration/actions";

const tenantId = getTenantId();
export const getRedirectionURL = () => {
  const redirectionURL = ifUserRoleExists("EMPLOYEE") ? "/uc/pay" : "/inbox";
  return redirectionURL;
};

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
  // set(demand[0], "tenantId", "pb.amritsar");
  set(demand[0], "consumerType", "TL");
  // set(demand[0], "payer.uuid", "4446312c-f21b-4cc3-9572-caca4e37225a");
  // set(demand[0], "demandDetails[0].taxHeadMasterCode", "PT_TAX");

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
    if (true) {
      const consumerCode = get(payload, "Demands[0].consumerCode");
      const businessService = get(payload, "Demands[0].businessService");
      await generateBill(consumerCode, tenantId, businessService, dispatch);
    }
  } catch (e) {
    console.log(e);
  }
  console.log("Demands:", demand);
};

const generateBill = async (
  consumerCode,
  tenantId,
  businessService,
  dispatch
) => {
  try {
    const payload = await httpRequest(
      "post",
      `/billing-service/bill/_generate?consumerCode=${consumerCode}&businessService=${businessService}&tenantId=${tenantId}`,
      "",
      [],
      {}
    );
    console.log(payload);
    if (payload && payload.Bill[0]) {
      dispatch(prepareFinalObject("ReceiptTemp[0].Bill", payload.Bill));
      const estimateData = createEstimateData(payload.Bill[0]);
      estimateData &&
        estimateData.length &&
        dispatch(
          prepareFinalObject(
            "applyScreenMdmsData.estimateCardData",
            estimateData
          )
        );
      dispatch(
        prepareFinalObject("applyScreenMdmsData.consumerCode", consumerCode)
      );
      dispatch(
        prepareFinalObject(
          "applyScreenMdmsData.businessService",
          businessService
        )
      );
      dispatch(setRoute(`/uc/pay?tenantId=${tenantId}`));
    }
  } catch (e) {
    console.log(e);
  }
};

const createEstimateData = billObject => {
  const billDetails = billObject && billObject.billDetails;
  let fees =
    billDetails &&
    billDetails[0].billAccountDetails &&
    billDetails[0].billAccountDetails.map(item => {
      return {
        name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
        value: item.amount,
        info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
      };
    });
  return fees;
};
