const formConfig = {
  name: "feedback",
  fields: {
    rating: {
      id: "complaint-rating",
      jsonPath: "services[0].rating",
      required: false,
    },
    selectedSevice: {
      id: "feedback-service",
      jsonPath: "services[0].feedback",
    },
    comments: {
      id: "feedback-comments",
      required: true,
      jsonPath: "actionInfo[0].comments",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
    },
    textarea: {
      id: "textarea",
      hintText: "CS_COMMON_COMMENTS_PLACEHOLDER",
    },
  },
  submit: {
    label: "CS_COMMON_SUBMIT",
    id: "feedback-submit-action",
  },
  action: "_update",
  redirectionRoute: "/citizen/feedback-acknowledgement",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
