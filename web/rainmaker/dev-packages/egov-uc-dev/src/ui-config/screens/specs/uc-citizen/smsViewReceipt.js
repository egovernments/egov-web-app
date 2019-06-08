import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { generateCitizenReciept } from "../utils/recieptPdf";
import { getSearchResults } from "../../../../ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";

const fetchAndGenerate = async (dispatch, receiptNo, tenantId) => {
  const queryObj = [
    {
      key: "receiptNumbers",
      value: receiptNo
    },
    {
      key: "tenantId",
      value: tenantId
    }
  ];
  const response = await getSearchResults(queryObj);
  dispatch(prepareFinalObject("receiptSearchResponse", response));
  let pdfGenerateData = {};
  pdfGenerateData["Receipt No"] = receiptNo;
  await generateCitizenReciept(pdfGenerateData);
};

const ucViewReceipt = {
  uiFramework: "material-ui",
  name: "viewReceiptFromSMS",
  beforeInitScreen: (action, state, dispatch) => {
    // const mobileNo = getQueryArg(window.location.href, "mobileNo");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const receiptNo = getQueryArg(window.location.href, "receiptNo");
    fetchAndGenerate(dispatch, receiptNo, tenantId);

    return action;
  },
  components: {
    div: {}
  }
};

export default ucViewReceipt;
