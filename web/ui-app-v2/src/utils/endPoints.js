export const LOCALATION = {
  GET: {
    URL: "localization/messages/v1/_search",
    ACTION: "_search",
  },
};

export const COMPLAINT = {
  GET: {
    URL: "rainmaker-pgr/v1/requests/_search",
    ACTION: "_search",
  },
};

export const TENANT = {
  GET: {
    URL: "egov-mdms-service/v1/_get",
    ACTION: "_search",
  },
};

export const FILE_UPLOAD = {
  POST: {
    URL: "filestore/v1/files",
  },
};

export const CATEGORY = {
  GET: {
    URL: "egov-mdms-service/v1/_search",
    ACTION: "_search",
  },
};

export const AUTH = {
  LOGOUT: {
    URL: "/user/_logout",
    ACTION: "_logout",
  },
};

export const USER = {
  SEARCH: {
    URL: "/user/_search",
    ACTION: "search",
  },
  UPDATE: {
    URL: "/profile/_update",
    ACTION: "create",
  },
};

export const OTP = {
  RESEND: {
    URL: "/user-otp/v1/_send",
    ACTION: "_send",
  },
};
