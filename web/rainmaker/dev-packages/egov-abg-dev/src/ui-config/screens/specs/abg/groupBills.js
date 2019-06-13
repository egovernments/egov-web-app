import {
  getCommonHeader,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  abgSearchCard,
  mergeDownloadButton
} from "./groupBillResource/groupBillSearch";
import { getBoundaryData } from "../../../../ui-utils/commons";
import { searchResults } from "./groupBillResource/searchResults";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { httpRequest } from "../../../../ui-utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

const tenantId = "pb.amritsar";

const header = getCommonHeader({
  labelName: "Group Bills",
  labelKey: "ABG_COMMON_HEADER"
});
const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const getMDMSData = async (action, state, dispatch) => {
  const tenantId = "pb.amritsar";
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "BillingService",
          masterDetails: [
            {
              name: "BusinessService"
            }
          ]
        },
        {
          moduleName: "egf-master",
          masterDetails: [{ name: "FinancialYear" }]
        }
      ]
    }
  };
  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const getData = async (action, state, dispatch) => {
  await getMDMSData(action, state, dispatch);
};

const abgSearchAndResult = {
  uiFramework: "material-ui",
  name: "groupBills",
  beforeInitScreen: (action, state, dispatch) => {
    getData(action, state, dispatch).then(responseAction => {
      const queryObj = [{ key: "tenantId", value: tenantId }];
      getBoundaryData(action, state, dispatch, queryObj);
    });
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "groupBills"
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
        abgSearchCard,
        breakAfterSearch: getBreak(),
        // progressStatus,
        searchResults,
        breakAfterSearchResults: getBreak(),
        mergeDownloadButton
      }
    }
  }
};

export default abgSearchAndResult;
