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
  upload: getCommonGrayCard({
    asd: getCommonContainer({
      uploadFileHeader: getCommonSubHeader({
        labelName: "Supporting Documents",
        labelKey: "HR_APPROVAL_UPLOAD_HEAD"
      }),
      uploadButton: {
        uiFramework: "custom-molecules",
        componentPath: "UploadMultipleFiles",
        props: {
          maxFiles: 4,
          jsonPath: "deactivationDocuments",
          inputProps: {
            accept: "image/*, .pdf, .png, .jpeg"
          },
          buttonLabel: { labelName: "UPLOAD FILES" },
          maxFileSize: 5000,
          moduleName: "HR",
          hasLocalization: false,
          style: {
            textAlign: "right"
          }
        }
      }
    })
  })
});
