"use strict";

// var store=require('../store');

var common = require("../Common");
var axios = require("axios");

var instance = axios.create({
  baseURL: window.location.origin,
  // timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

var counter = 0;

//document.cookie = "SESSIONID=75dedd21-1145-4745-a8aa-1790a737b7c5; JSESSIONID=Nw2kKeNF6Eu42vtXypb3kP4fER1ghjXNMNISiIF5.ip-10-0-0-100; Authorization=Basic Og==";

var authToken = localStorage.getItem("token");

//request info from cookies
var requestInfo = {
  apiId: "org.egov.pt",
  ver: "1.0",
  ts: "27-06-2017 10:30:12",
  action: "asd",
  did: "4354648646",
  key: "xyz",
  msgId: "654654",
  requesterId: "61",
  authToken: authToken
};

var tenantId = localStorage.getItem("tenantId") ? localStorage.getItem("tenantId") : "default";

function extractErrorMsg(errorObj, localeCode, descriptionCode) {
  var translatedErrorMsg = common.translate(errorObj[localeCode]);
  if (errorObj[localeCode] === translatedErrorMsg) return errorObj[descriptionCode] || translatedErrorMsg;else return translatedErrorMsg;
}

module.exports = {
  commonApiPost: function commonApiPost(context) {
    var queryObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var doNotOverride = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var isTimeLong = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var noPageSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var authToken = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "";
    var userInfo = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
    var isStateLevel = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    var offset = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

    var url = context;
    if (url && url[url.length - 1] === "/") url = url.substring(0, url.length - 1);
    if (!doNotOverride) {
      if (url.split("?").length > 1) {
        url += "&tenantId=" + (localStorage.getItem("tenantId") ? isStateLevel ? localStorage.getItem("tenantId").split(".")[0] : localStorage.getItem("tenantId") : "default");
      } else {
        url += "?tenantId=" + (localStorage.getItem("tenantId") ? isStateLevel ? localStorage.getItem("tenantId").split(".")[0] : localStorage.getItem("tenantId") : "default");
      }
    } else {
      url += "?";
    }
    for (var variable in queryObject) {
      if (typeof queryObject[variable] !== "undefined") {
        url += "&" + variable + "=" + queryObject[variable];
      }
    }

    if (/_search/.test(context) && !noPageSize) {
      url += "&pageSize=200";
    } else {
      url += "&pageSize=" + noPageSize;
    }

    url += "&offset=" + offset;

    requestInfo.authToken = localStorage.getItem("token");
    if (isTimeLong) {
      requestInfo.ts = new Date().getTime();
    }

    if (authToken) {
      requestInfo["authToken"] = authToken;
    }

    body["RequestInfo"] = requestInfo;

    if (userInfo) {
      body["RequestInfo"]["userInfo"] = userInfo;
    }

    return instance.post(url, body).then(function (response) {
      return response.data;
    }).catch(function (response) {
      try {
        if (response && response.response && response.response.data && response.response.data[0] && response.response.data[0].error) {
          var _err = response.response.data[0].error.message || "";
          if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
            for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
              _err += "\n " + response.response.data[0].error.errorFields[i].message + " ";
            }
            throw new Error(_err);
          }
        } else if (response && response.response && response.response.data && response.response.data.error) {
          // let _err = common.translate(response.response.data.error.fields[0].code);
          var _err2 = "";

          _err2 = response.response.data.error.message ? response.response.data.error.fields ? "a) " + extractErrorMsg(response.response.data.error, "message", "description") + " : " : extractErrorMsg(response.response.data.error, "message", "description") : "";
          var fields = response.response.data.error.fields || [];
          for (var i = 0; i < fields.length; i++) {
            _err2 += i + 1 + ") " + extractErrorMsg(fields[i], "code", "message") + ".";
          }
          throw new Error(_err2);
        } else if (response && response.response && response.response.data && response.response.data.Errors) {
          // let _err = common.translate(response.response.data.error.fields[0].code);
          var _err3 = "";
          // _err=response.response.data.error.message?"a) "+extractErrorMsg(response.response.data.error, "message", "description")+" : ":"";
          // let fields=response.response.data.error.fields;
          if (response.response.data.Errors.length == 1) {
            _err3 += common.translate(response.response.data.Errors[0].message) + ".";
          } else {
            for (var i = 0; i < response.response.data.Errors.length; i++) {
              _err3 += i + 1 + ") " + common.translate(response.response.data.Errors[i].message) + ".";
            }
          }

          throw new Error(_err3);
        } else if (response && response.response && response.response.data && response.response.data.hasOwnProperty("Data")) {
          var _err4 = common.translate(response.response.data.Message) + ".";
          throw new Error(_err4);
        } else if (response && response.response && !response.response.data && response.response.status === 400) {
          if (counter == 0) {
            document.title = "eGovernments";
            var locale = localStorage.getItem("locale");
            var _tntId = localStorage.getItem("tenantId") || "default";
            var lang_response = localStorage.getItem("lang_response");
            localStorage.clear();
            localStorage.setItem("locale", locale);
            localStorage.setItem("tenantId", _tntId);
            localStorage.setItem("lang_response", lang_response);
            alert("Session expired. Please login again.");
            //localStorage.reload = true;
            throw new Error("");
          }
        } else if (response) {
          throw new Error("Oops! Something isn't right. Please try again later.");
        } else {
          throw new Error("Server returned unexpected error. Please contact system administrator.");
        }
      } catch (e) {
        if (e.message) {
          throw new Error(e.message);
        } else throw new Error("Oops! Something isn't right. Please try again later.");
      }
    });
  },
  commonApiGet: function commonApiGet(context) {
    var queryObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var doNotOverride = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var noPageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var url = context;
    if (!doNotOverride) url += "?tenantId=" + (localStorage.getItem("tenantId") || "default");else url += "?";
    for (var variable in queryObject) {
      if (typeof queryObject[variable] !== "undefined") {
        url += "&" + variable + "=" + queryObject[variable];
      }
    }

    if (/_search/.test(context) && !noPageSize) {
      url += "&pageSize=500";
    }
    return instance.get(url).then(function (response) {
      return response.data;
    }).catch(function (response) {
      if (response && response.response && response.response.data && response.response.data[0] && (response.response.data[0].error || response.response.data[0].Errors[0])) {
        var _err = response.response.data[0].error.message || "";
        if (response.response.data[0].error.errorFields && Object.keys(response.response.data[0].error.errorFields).length) {
          for (var i = 0; i < response.response.data[0].error.errorFields.length; i++) {
            _err += "\n " + response.response.data[0].error.errorFields[i].message + " ";
          }
          throw new Error(_err);
        }
      } else {
        throw new Error("Something went wrong, please try again later.");
      }
    });
  },
  getAll: function getAll(arrayOfRequest) {
    return instance.all(arrayOfRequest).then(axios.spread(function (acct, perms) {
      // Both requests are now complete
    }));
  }
};