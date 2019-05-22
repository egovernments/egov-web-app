import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { newCollectionDetailsCard } from "./newCollectionResource/newCollectionDetails";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";

const header = getCommonHeader({
  labelName: "New Collection",
  labelKey: "UC_COMMON_HEADER"
});
// const tenantId = "pb.amritsar";
const tenantId = getTenantId();
const setServiceCategory = (businessServiceData, dispatch) => {
  let nestedServiceData = {};
  businessServiceData = [
    {
      businessService: "Taxes.No Dues Certificate",
      code: "TL.No_Dues_Certificate",
      collectionModesNotAllowed: ["DD"],
      partPaymentAllowed: false,
      isAdvanceAllowed: false,
      isVoucherCreationEnabled: true
    },
    {
      businessService: "Advertisement Tax.Hoardings",
      code: "ADVT.Hoardings",
      collectionModesNotAllowed: ["DD"],
      partPaymentAllowed: false,
      isAdvanceAllowed: false,
      isVoucherCreationEnabled: true,
      Status: "ACTIVE"
    },
    {
      businessService: "Advertisement Tax.Unipolls",
      code: "ADVT.Unipolls",
      collectionModesNotAllowed: ["DD"],
      partPaymentAllowed: false,
      isAdvanceAllowed: false,
      isVoucherCreationEnabled: true,
      Status: "ACTIVE"
    }
  ];
  businessServiceData.forEach(item => {
    if (item.code && item.code.indexOf(".") > 0) {
      if (nestedServiceData[item.code.split(".")[0]]) {
        let child = get(
          nestedServiceData,
          `${item.code.split(".")[0]}.child`,
          []
        );
        child.push(item);
        set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
      } else {
        set(
          nestedServiceData,
          `${item.code.split(".")[0]}.code`,
          item.code.split(".")[0]
        );
        set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
      }
    } else {
      set(nestedServiceData, `${item.code}`, item);
    }
  });
  console.log(nestedServiceData);
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.nestedServiceData",
      nestedServiceData
    )
  );
  let serviceCategories = Object.values(nestedServiceData).filter(
    item => item.code
  );
  dispatch(
    prepareFinalObject(
      "applyScreenMdmsData.serviceCategories",
      serviceCategories
    )
  );
};

const getData = async (action, state, dispatch) => {
  let requestBody = {
    MdmsCriteria: {
      tenantId: tenantId,

      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService"
            },
            {
              name: "TaxHeadMaster"
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
      requestBody
    );
    console.log(payload);
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
    setServiceCategory(
      get(payload, "MdmsRes.BillingService.BusinessService", []),
      dispatch
    );
  } catch (e) {
    console.log(e);
  }
  try {
    let payload = null;
    payload = await httpRequest("post", "/egov-idgen/id/_generate", "", [], {
      idRequests: [
        {
          idName: "",
          format: "UC/[CY:dd-MM-yyyy]/[seq_uc_demand_consumer_code]",
          tenantId: `${tenantId}`
        }
      ]
    });
    dispatch(
      prepareFinalObject(
        "Demands[0].consumerCode",
        get(payload, "idResponses[0].id", "")
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const newCollection = {
  uiFramework: "material-ui",
  name: "newCollection",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch);
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "newCollection"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6
              },
              ...header
            }
          }
        },
        newCollectionDetailsCard,
        newCollectionFooter
      }
    }
  }
};

export default newCollection;
