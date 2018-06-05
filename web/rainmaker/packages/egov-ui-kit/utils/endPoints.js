"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LOCALATION = exports.LOCALATION = {
  GET: {
    URL: "localization/messages/v1/_search",
    ACTION: "_search"
  }
};

var COMPLAINT = exports.COMPLAINT = {
  GET: {
    URL: "rainmaker-pgr/v1/requests/_search",
    ACTION: "_search"
  }
};

var FILE_UPLOAD = exports.FILE_UPLOAD = {
  POST: {
    URL: "filestore/v1/files"
  }
};

var CATEGORY = exports.CATEGORY = {
  GET: {
    URL: "egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};

var AUTH = exports.AUTH = {
  LOGOUT: {
    URL: "/user/_logout",
    ACTION: "_logout"
  }
};

var USER = exports.USER = {
  SEARCH: {
    URL: "/user/_search",
    ACTION: "search"
  },
  UPDATE: {
    URL: "/profile/_update",
    ACTION: "create"
  }
};

var OTP = exports.OTP = {
  RESEND: {
    URL: "/user-otp/v1/_send",
    ACTION: "_send"
  }
};

var EMPLOYEE = exports.EMPLOYEE = {
  GET: {
    URL: "/hr-employee-v2/employees/_search",
    ACTION: "_search"
  }
};

var CITIZEN = exports.CITIZEN = {
  GET: {
    URL: "/user/v1/_search",
    ACTION: "_search"
  }
};

var MDMS = exports.MDMS = {
  GET: {
    URL: "/egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};

var TENANT = exports.TENANT = {
  POST: {
    URL: "egov-location/location/v11/tenant/_search",
    ACTION: "_search"
  }
};

var SPEC = exports.SPEC = {
  GET: {
    URL: "spec-directory",
    ACTION: "_search"
  }
};

var CITY = exports.CITY = {
  GET: {
    URL: "/egov-mdms-service/v1/_search",
    ACTION: "_search"
  }
};