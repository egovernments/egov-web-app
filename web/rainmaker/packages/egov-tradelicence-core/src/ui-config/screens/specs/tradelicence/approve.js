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
  getUploadFilesMultiple
} from "../utils";
import { footerApprove } from "./approveResource/footer";
import { updatePFOforSearchResults } from "ui-utils/commons";
import set from "lodash/set";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];

const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Trade License Application (2018-2019)",
    labelKey: "TL_APPROVAL_REJ_MESSAGE_HEAD"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const getApproveCard = queryValuePurpose => {
  return getCommonCard({
    headerOne:
      queryValuePurpose === "cancel"
        ? getCommonSubHeader({
            labelName: "Please provide Cancellation remarks",
            labelKey: "TL_CANCEL_CHECKLIST_HEAD"
          })
        : getCommonSubHeader({
            labelName:
              "Please provide the following details on the basis of your field verification",
            labelKey: "TL_APPROVAL_CHECKLIST_HEAD"
          }),
    paragraphOne: getContainerWithElement({
      children: {
        paragraph: getCommonParagraph({
          labelName:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
        })
      },
      props: {
        style: {
          marginTop: "8px"
        }
      }
    }),
    headerTwo: getContainerWithElement({
      children: {
        subHeader: getSubHeaderLabel()
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
            "Licenses[0].tradeLicenseDetail.additionalDetail.approveChecklist.safetyNorms"
          ),

    hygieneMeasure:
      queryValuePurpose === "cancel"
        ? {}
        : getRadioGroupWithLabel(
            "Are Hygiene Levels Satisfactory?",
            "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_2",
            radioButtonLabels,
            "Licenses[0].tradeLicenseDetail.additionalDetail.approveChecklist.hygieneLevels"
          ),

    localityMeasure:
      queryValuePurpose === "cancel"
        ? {}
        : getRadioGroupWithLabel(
            "Is Locality harmed/disturbed by this trade?",
            "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_3",
            radioButtonLabels,
            "Licenses[0].tradeLicenseDetail.additionalDetail.approveChecklist.localityHarmed"
          ),

    commentSection: getContainerWithElement({
      children: {
        childrenomment: getApprovalTextField()
      },
      props: {
        style: {
          marginTop: "20px"
        }
      }
    }),

    uploadFileHeader: getCommonSubHeader({
      labelName: "Upload Document",
      labelKey: "TL_APPROVAL_UPLOAD_HEAD"
    }),
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
      "All information in the application are true upto best of my knowledge",
      "Licenses[0].tradeLicenseDetail.additionalDetail.approveCheck"
    )
  });
};

// const tradeDetails =

const screenConfig = {
  uiFramework: "material-ui",
  name: "approve",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        header,

        approveForm: {
          uiFramework: "custom-atoms",
          componentPath: "Div"
          // children: {
          //   tradeDetails
          // }
        },
        footerApprove
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    const queryValuePurpose = getQueryArg(window.location.href, "purpose");
    const queryValueAN = getQueryArg(window.location.href, "applicationNumber");
    if (queryValueAN) {
      updatePFOforSearchResults(action, state, dispatch, queryValueAN);
    }
    const data = getApproveCard(queryValuePurpose);
    set(
      action,
      "screenConfig.components.div.children.approveForm.children.form",
      data
    );
    return action;
  }
};

export default screenConfig;
