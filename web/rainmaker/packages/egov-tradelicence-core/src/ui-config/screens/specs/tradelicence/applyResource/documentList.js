export const documentList = {
  uiFramework: "custom-molecules-local",
  componentPath: "DocumentList",
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
    buttonLabel: "UPLOAD FILE",
    description: "Only .jpg and .pdf files. 500kb max file size.",
    inputProps: {
      accept: "image/*, .pdf, .png, .jpeg"
    },
    maxFileSize: 5000
  }
};
