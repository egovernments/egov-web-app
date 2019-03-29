export const documentList = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-tradelicence",
  componentPath: "DocumentListContainer",
  props: {
    buttonLabel: {
      labelName: "UPLOAD FILE",
      labelKey: "TL_BUTTON_UPLOAD FILE"
    },
    description: "Only .jpg and .pdf files. 6MB max file size.",
    inputProps: {
      accept: "image/*, .pdf, .png, .jpeg"
    },
    documentTypePrefix: "TL_",
    maxFileSize: 6000
  }
};
