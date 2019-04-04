import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonParagraph,
  getCommonSubHeader,
  getCommonTitle
} from "egov-ui-framework/ui-config/screens/specs/utils";

export const documentDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Required Documents",
      labelKey: "NOC_APPLICANT_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  subText: getCommonParagraph({
    labelName:
      "Only one file can be uploaded for one document. If multiple files need to be uploaded then please combine all files in a pdf and then upload",
    labelKey: "NOC_DOCUMENT_DETAILS_SUBTEXT"
  }),
  break: getBreak(),
  documentList: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-noc",
    componentPath: "DocumentListContainer",
    props: {
      documents: [
        {
          name: "Identity Proof ",
          required: true,
          jsonPath: "Trade[0].ownerId",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: 10, label: "Ten" },
              { value: 20, label: "Twenty" },
              { value: 30, label: "Thirty" }
            ]
          }
        },
        {
          name: "Address Proof ",
          required: true,
          jsonPath: "Trade[0].ownerId",
          selector: {
            inputLabel: "Select Document",
            menuItems: [
              { value: 10, label: "Ten" },
              { value: 20, label: "Twenty" },
              { value: 30, label: "Thirty" }
            ]
          }
        },
        {
          name: "Site Plan ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Ground Floor Plan ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Owner's Checklist as per NBC ",
          jsonPath: "Trade[0].businessProof"
        },
        {
          name: "Copy of Provisional fire NoC ",
          jsonPath: "Trade[0].businessProof"
        }
      ],
      buttonLabel: {
        labelName: "UPLOAD FILE",
        labelKey: "TL_BUTTON_UPLOAD FILE"
      },
      // description: "Only .jpg and .pdf files. 6MB max file size.",
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      maxFileSize: 6000
    }
  }
});