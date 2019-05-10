import {
  getCommonHeader

  //getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { newCollectionDetailsCard } from "./newCollectionResource/newCollectionDetails";
import { newCollectionFooter } from "./newCollectionResource/newCollectionFooter";
// import { fetchMDMSData } from "egov-ui-kit/redux/common/actions";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "egov-ui-framework/ui-utils/api";

const header = getCommonHeader({
  labelName: "New Collection",
  labelKey: "UC_COMMON_HEADER"
});
const tenantId = "pb.amritsar";
// const tenantId = getTenantId();
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
        }
      ]
    }
  };
  // can be combined into one mdms call
  // fetchMDMSData(requestBody);

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
