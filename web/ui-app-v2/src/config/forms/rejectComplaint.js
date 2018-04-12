const formConfig = {
  name: "rejectComplaint",
  //idJsonPath: "services[0].serviceRequestId",
  fields: {
    comments: {
      id: "comments-reopen",
      jsonPath: "actionInfo[0].comments",
    },
    textarea: {
      id: "textarea",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
    },
    action: {
      id: "action",
      jsonPath: "actionInfo[0].action",
      value: "reject",
    },
  },
  submit: {
    label: "CS_COMMON_SUBMIT",
    id: "reopencomplaint-submit-action",
  },
  action: "_update",
  redirectionRoute: "/employee/complaint-rejected",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
