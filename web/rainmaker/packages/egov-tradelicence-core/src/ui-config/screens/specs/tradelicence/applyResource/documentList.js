export const documentList = {
  uiFramework: "custom-molecules",
  componentPath: "DocumentList",
  props: {
    documents: [
      {
        name: "Owner’s ID Proof ",
        required: true
      },
      {
        name: "Owner’s Address Proof ",
        uploaded: true,
        fileName: "filename.jpg"
      },
      {
        name: "Business ID Proof "
      }
    ],
    buttonLabel: "UPLOAD FILE",
    description: "Only .jpg and .pdf files. 500kb max file size."
  }
};
