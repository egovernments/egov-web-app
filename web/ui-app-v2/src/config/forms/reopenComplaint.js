const formConfig = {
  name: "reopenComplaint",
  fields: {
    question: {
      id: "question",
      jsonPath: "actionInfo[0].comments",
    },
    media: {
      id: "media-upload",
      jsonPath: "actionInfo.media",
      errorMessage: "CS_FILE_UPLOAD_FAILED",
    },
    reopencomments: {
      id: "reopen-comments",
      jsonPath: "actionInfo[0].comments",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
    },
  },
  action: "_update",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
