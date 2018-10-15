"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.epochToYmd = exports.getTranslatedLabel = exports.transformById = exports.isFileValid = exports.getFileSize = exports.getImageUrlByFile = exports.getDateInEpoch = exports.trimObj = exports.fetchFromLocalStorage = exports.persistInLocalStorage = exports.slugify = exports.isFieldEmpty = exports.addQueryArg = exports.getQueryArg = exports.addComponentJsonpath = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _api = require("mihy-ui-framework/ui-utils/api");

var _actions = require("mihy-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addComponentJsonpath = exports.addComponentJsonpath = function addComponentJsonpath(components) {
  var jsonPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "components";

  for (var componentKey in components) {
    if (components.hasOwnProperty(componentKey)) {
      if (components[componentKey].children) {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
        var childJsonpath = components[componentKey].componentJsonpath + ".children";
        addComponentJsonpath(components[componentKey].children, childJsonpath);
      } else {
        components[componentKey].componentJsonpath = jsonPath + "." + componentKey;
      }
    }
  }
  return components;
};

var getQueryArg = exports.getQueryArg = function getQueryArg(url, name) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var addQueryArg = exports.addQueryArg = function addQueryArg(url) {
  var queries = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var urlParts = url.split("?");
  var path = urlParts[0];
  var queryParts = urlParts.length > 1 ? urlParts[1].split("&") : [];
  queries.forEach(function (query) {
    var key = query.key;
    var value = query.value;
    var newQuery = key + "=" + value;
    queryParts.push(newQuery);
  });
  var newUrl = path + "?" + queryParts.join("&");
  return newUrl;
};

var isFieldEmpty = exports.isFieldEmpty = function isFieldEmpty(field) {
  if (field === undefined || field === null) {
    return true;
  }
  if ((typeof field === "undefined" ? "undefined" : (0, _typeof3.default)(field)) !== "object") {
    field = field.toString().trim();
    return (0, _isEmpty2.default)(field);
  }
  return false;
};

var slugify = exports.slugify = function slugify(term) {
  return term.toLowerCase().replace(/\s+/, "-");
};

var persistInLocalStorage = exports.persistInLocalStorage = function persistInLocalStorage(obj) {
  Object.keys(obj).forEach(function (objKey) {
    var objValue = obj[objKey];
    window.localStorage.setItem(objKey, objValue);
  }, undefined);
};

var fetchFromLocalStorage = exports.fetchFromLocalStorage = function fetchFromLocalStorage(key) {
  return window.localStorage.getItem(key) || null;
};

var trimObj = exports.trimObj = function trimObj(obj) {
  if (!Array.isArray(obj) && (typeof obj === "undefined" ? "undefined" : (0, _typeof3.default)(obj)) !== "object") return obj;
  for (var key in obj) {
    obj[key.trim()] = typeof obj[key] === "string" ? obj[key].trim() : trimObj(obj[key]);
    if (key === "") delete obj[key];
  }
  return obj;
};

var getDateInEpoch = exports.getDateInEpoch = function getDateInEpoch() {
  return new Date().getTime();
};

var getImageUrlByFile = exports.getImageUrlByFile = function getImageUrlByFile(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var fileurl = e.target.result;
      resolve(fileurl);
    };
  });
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileValid = exports.isFileValid = function isFileValid(file, acceptedFiles) {
  var mimeType = file["type"];
  return mimeType && acceptedFiles && acceptedFiles.indexOf(mimeType.split("/")[1]) > -1 || false;
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var epochToYmd = exports.epochToYmd = function epochToYmd(et) {
  // Return null if et already null
  if (!et) return null;
  // Return the same format if et is already a string (boundary case)
  if (typeof et === "string") return et;
  var formatted_date = new Date(et).toISOString().substr(0, 10);
  return formatted_date;
};