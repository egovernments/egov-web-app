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

import { footerApprove } from "./applyResource/footer";

const radioButtonLabels = ["Yes", "No", "Not Applicable"];
const queryValue = getQueryArg(window.location.href, "purpose");
const header = getCommonContainer({
  header: getCommonHeader("Trade License Application (2018-2019)"),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number: 5434
    }
  }
});

const tradeDetails = getCommonCard({
  headerOne:
    queryValue === "cancel"
      ? getCommonSubHeader("Please provide Cancellation remarks")
      : getCommonSubHeader(
          "Please provide the following details on the basis of your field verification"
        ),
  paragraphOne: getContainerWithElement(
    {
      paragraph: getCommonParagraph(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
      )
    },
    {
      style: {
        marginTop: "8px"
      }
    }
  ),
  headerTwo: getContainerWithElement(
    {
      subHeader: getSubHeaderLabel()
    },
    {
      style: {
        marginTop: "33px"
      }
    }
  ),
  safetyNorms:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Are Safety Norms Satisfactory?",
          "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_1",
          radioButtonLabels
        ),

  hygieneMeasure:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Are Hygiene Levels Satisfactory?",
          "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_2",
          radioButtonLabels
        ),

  localityMeasure:
    queryValue === "cancel"
      ? {}
      : getRadioGroupWithLabel(
          "Is Locality harmed/disturbed by this trade?",
          "TL_APPROVAL_CHECKLIST_APPROV_CHECKLIST_ITEM_3",
          radioButtonLabels
        ),

  commentSection: getContainerWithElement(
    {
      childrenomment: getApprovalTextField()
    },
    {
      style: {
        marginTop: "20px"
      }
    }
  ),

  uploadFileHeader: getCommonSubHeader("Upload Document"),
  uploadFileInfo: getCommonParagraph(
    "Only .jpg and .pdf files. 5MB max file size.",
    { style: { fontSize: 12, marginBottom: 0 } }
  ),
  uploadFiles: getUploadFilesMultiple(),
  checkBoxContainer: getCheckbox(
    "All information in the application are true upto best of my knowledge"
  )
});

const screenConfig = {
  uiFramework: "material-ui",
  name: "mihytradeliceceapply",
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
          componentPath: "Div",
          children: {
            tradeDetails
          }
        },
        footerApprove
      }
    }
  }
};

export default screenConfig;
