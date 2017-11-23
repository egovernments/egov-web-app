var dat = {
  "legal.update": {
    numCols: 12 / 3,
    title:"parawisecomments.create.document.title",
    // searchUrl:
    //   "/lcms-services/legalcase/case/_search?code={id}",
    url:
      "/lcms-services/legalcase/parawisecomment/_update",
    tenantIdRequired: true,
    useTimestamp: true,
    objectName: "cases",
    documentsPath:"cases[0].parawiseComments[0]",
    groups: [
      {
        label: "legal.parawisecomments.create.group.title.parawiseComment",
        name: "parawiseComments",
        fields: [
          {
            name: "parawiseCommentsAskedDate",
            jsonPath: "parawiseCommentsAskedDate",
            label: "legal.parawisecomments.create.dateOfCommentsAsked",
            pattern: "",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          },
          {
            name: "parawiseCommentsReceivedDate",
            jsonPath:
              "parawiseCommentsReceivedDate",
            label: "legal.parawisecomments.create.dateOfCommentsReceived",
            pattern: "",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          },
          {
            name: "hodProvidedDate",
            jsonPath: "hodProvidedDate",
            label: "legal.parawisecomments.create.dateOfInfoProvidedByHod",
            pattern: "",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          },
          {
            name: "resolutionDate",
            jsonPath: "resolutionDate",
            label: "legal.parawisecomments.create.resolutionDate",
            pattern: "",
            type: "datePicker",
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          },
          {
            name: "caseReferenceNo",
            jsonPath: "cases[0].caseRefernceNo",
            label: "legal.parawisecomments.create.caseReferenceNo",
            pattern: "",
            type: "text",
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          },
          {
            name: "paraWiseComments",
            jsonPath: "paraWiseComments",
            label: "legal.parawisecomments.create.group.parawiseComments",
            pattern: "",
            type: "textarea",
            fullWidth:true,
            isRequired: true,
            isDisabled: false,
            requiredErrMsg: "",
            patternErrMsg: ""
          }
        ]
      },
      {
        name: "documents",
        label: "legal.parawisecomments.create.group.title.uploadDocument",
        fields: [
          {
            name: "documents",
            jsonPath: "documents",
            label: "legal.create.sectionApplied",
            type: "fileTable",
            isRequired: false,
            isDisabled: false,
            patternErrMsg: "",
            fileList: {
               name:"documentName",
                id:"fileStoreId"
            },
            fileCount: 3
          }
        ]
      }
    ]
  }
};

export default dat;