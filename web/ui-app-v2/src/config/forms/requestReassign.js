const formConfig = {
  name: "requestReassign",
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
  },
  submit: {
    label: "REQUEST RE_ASSIGN",
    id: "reopencomplaint-submit-action",
  },
  action: "_update",
  redirectionRoute: "/employee/reassign-success",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
