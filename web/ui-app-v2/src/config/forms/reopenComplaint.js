const formConfig = {
  name: "reopenComplaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    media: {
      id: "media-upload",
      file: true,
      jsonPath: "actionInfo[0].media",
      errorMessage: "CS_FILE_UPLOAD_FAILED",
    },

    comments: {
      id: "comments-reopen",
      jsonPath: "actionInfo[0].comments",
    },
    textarea: {
      id: "textarea",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
      value: "",
    },
  },
  submit: {
    label: "CORE_COMMON_CONTINUE",
    id: "reopencomplaint-submit-action",
  },
  action: "_update",
  redirectionRoute: "/citizen/complaint-submitted",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
