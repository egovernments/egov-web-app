const formConfig = {
  name: "feedback",
  fields: {
    rating: {
      id: "complaint-rating",
      jsonPath: "services.rating",
      required: true,
    },
    selectedSevice: {
      id: "feedback-service",
      jsonPath: "services.feedback",
      required: true,
    },
    comments: {
      id: "feedback-comments",
      required: true,
      jsonPath: "actionInfo.comments",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
    },
    submit: {
      label: "CORE_COMMON_SUBMIT",
      id: "login-submit-action",
    },
    continue: {
      label: "CORE_COMMON_CONTINUE",
      id: "login-continue-action",
    },
  },
  action: "_update",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
  redirectionRoute: "/citizen/complaint-details?status=resolved",
};

export default formConfig;
