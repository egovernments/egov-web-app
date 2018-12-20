export const documentList = {
  uiFramework: "custom-containers-local",
  componentPath: "DocumentListContainer",
  props: {
    // documents: [
    //   {
    //     name: "Owner’s ID Proof ",
    //     required: true,
    //     jsonPath: "Trade[0].ownerId"
    //   },
    //   {
    //     name: "Owner’s Address Proof ",
    //     jsonPath: "Trade[0].addressProof"
    //   },
    //   {
    //     name: "Business ID Proof ",
    //     jsonPath: "Trade[0].businessProof"
    //   }
    // ],
    buttonLabel: {
      labelName: "UPLOAD FILE",
      labelKey: "TL_BUTTON_UPLOAD FILE"
    },
    description: "Only .jpg and .pdf files. 6MB max file size.",
    inputProps: {
      accept: "image/*, .pdf, .png, .jpeg"
    },
    maxFileSize: 6000
  }
};
