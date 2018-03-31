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
  },
  action: "_update",
  saveUrl: "/rainmaker-pgr/v1/requests/_update",
};

export default formConfig;
