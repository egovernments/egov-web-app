import {
  getCommonCard,
  getCommonContainer,
  getCommonParagraph,
  getCommonSubHeader,
  getCommonHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import {
  getRadioGroupWithLabel,
  getApprovalTextField,
  getSubHeaderLabel,
  getCheckbox,
  getContainerWithElement,
  getUploadFilesMultiple,
  getCheckBoxJsonpath,
  getSafetyNormsJson,
  getHygeneLevelJson,
  getLocalityHarmedJson
} from "../utils";
import { footerApprove } from "./approveResource/footer";
import { updatePFOforSearchResults } from "../../../../ui-utils/commons";
import set from "lodash/set";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];
const queryValueAN = getQueryArg(window.location.href, "applicationNumber");

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Trade License Application (2018-2019)",
    labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: queryValueAN
    }
  }
});

const getApproveCard = queryValuePurpose => {
  return getCommonCard({
    headerOne:
      queryValuePurpose === "cancel"
        ? getCommonSubHeader({
            labelName: "Cancellation Remarks",
            labelKey: "TL_CANCEL_CHECKLIST_HEAD"
          })
        : getCommonSubHeader(
            {
              labelName: "Verification Details",
              labelKey: "TL_APPROVAL_CHECKLIST_HEAD"
            },
            {
              style: {
                fontSize: "20px"
              }
            }
          ),
    headerTwo: getContainerWithElement({
      children: {
        subHeader: getSubHeaderLabel(queryValuePurpose)
      },
      props: {
        style: {
          marginTop: "33px"
        }
      }
    }),
    safetyNorms:
      queryValuePurpose === "cancel"
        ? {}
        : getRadioGroupWithLabel(
            "Are Safety Norms Satisfactory?",
            "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_1",
            radioButtonLabels,
            getSafetyNormsJson(queryValuePurpose),
            "Yes"
          ),

    hygieneMeasure:
      queryValuePurpose === "cancel"
        ? {}
        : getRadioGroupWithLabel(
            "Are Hygiene Levels Satisfactory?",
            "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_2",
            radioButtonLabels,
            getHygeneLevelJson(queryValuePurpose),
            "Yes"
          ),

    localityMeasure:
      queryValuePurpose === "cancel"
        ? {}
        : getRadioGroupWithLabel(
            "Is Locality harmed/disturbed by this trade?",
            "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_3",
            radioButtonLabels,
            getLocalityHarmedJson(queryValuePurpose),
            "No"
          ),

    commentSection: getContainerWithElement({
      children: {
        div: getApprovalTextField(queryValuePurpose)
      },
      props: {
        style: {
          marginTop: 20
        }
      }
    }),
    commentInfo: getCommonParagraph(
      {
        labelName: "Max. Character Limit 500*"
      },
      {
        style: {
          fontSize: 12,
          marginBottom: 0,
          color: "rgba(0, 0, 0, 0.6000000238418579)"
        }
      }
    ),
    uploadFileHeader: getCommonSubHeader(
      {
        labelName: "Supporting Documents",
        labelKey: "TL_APPROVAL_UPLOAD_HEAD"
      },
      {
        style: { marginTop: 15 }
      }
    ),
    uploadFileInfo: getCommonParagraph(
      {
        labelName: "Only .jpg and .pdf files. 5MB max file size."
      },
      {
        style: {
          fontSize: 12,
          marginBottom: 0,
          marginTop: 5,
          color: "rgba(0, 0, 0, 0.6000000238418579)"
        }
      }
    ),
    uploadFiles: getUploadFilesMultiple(
      "Licenses[0].tradeLicenseDetail.verificationDocuments"
    ),
    checkBoxContainer: getCheckbox(
      "All information provided above is true up to the best of my knowledge.",
      getCheckBoxJsonpath(queryValuePurpose)
    )
  });
};

const getTopChildren = (
  queryValueAN,
  queryValueTenantId,
  queryValuePurpose
) => {
  return {
    header,
    getApproveCard: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        form: getApproveCard(queryValuePurpose)
      }
    },
    footerApprove: footerApprove(
      queryValueAN,
      queryValueTenantId,
      queryValuePurpose
    )
  };
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "approve",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const queryValuePurpose = getQueryArg(window.location.href, "purpose");
    const queryValueAN = getQueryArg(window.location.href, "applicationNumber");
    const queryValueTenantId = getQueryArg(window.location.href, "tenantId");

    if (queryValueAN) {
      updatePFOforSearchResults(
        action,
        state,
        dispatch,
        queryValueAN,
        queryValuePurpose
      );
    }
    const data = getTopChildren(
      queryValueAN,
      queryValueTenantId,
      queryValuePurpose
    );
    set(action, "screenConfig.components.div.children", data);
    return action;
  }
};

export default screenConfig;
