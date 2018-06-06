"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchDropdownData = exports.mergeMDMSDataArray = exports.upperCaseFirst = exports.startSMSRecevier = exports.transformComplaintForComponent = exports.findLatestAssignee = exports.getTenantForLatLng = exports.transformLocalizationLabels = exports.getLatestCreationTime = exports.returnSLAStatus = exports.getPropertyFromObj = exports.getNameFromId = exports.isFileImage = exports.getFileSize = exports.getTransformedStatus = exports.isImage = exports.getCityNameByCode = exports.getUserInfo = exports.fetchImages = exports.getTranslatedLabel = exports.prepareFormData = exports.addBodyClass = exports.getBodyClassFromPath = exports.getDateFromEpoch = exports.mapCompIDToName = exports.getCurrentAddress = exports.prepareForm = exports.getRequestUrl = exports.fetchFromLocalStorage = exports.persistInLocalStorage = exports.slugify = exports.isFieldEmpty = exports.addQueryArg = exports.getQueryArg = exports.hyphenSeperatedDateTime = exports.transformById = exports.displayLocalizedStatusMessage = exports.displayStatus = exports.statusToLocalisationKeyMapping = exports.statusToMessageMapping = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("redux/form/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions2 = require("redux/app/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var statusToMessageMapping = exports.statusToMessageMapping = {
  rejected: "Rejected",
  closed: "Closed",
  open: "Opened",
  "re-assign": "Re-assigned",
  assigned: "Assigned",
  resolved: "Resolved",
  reassignrequested: "Re-assign Requested"
};

//status messages in home page and my complaints page
var statusToLocalisationKeyMapping = exports.statusToLocalisationKeyMapping = {
  rejected: "CS_COMMON_STATUS_REJECTED",
  closed: "CS_COMMON_STATUS_CLOSED",
  open: "CS_COMMON_STATUS_SUBMITTED",
  reopened: "CS_COMMON_STATUS_REOPENED",
  reassigned: "CS_COMMON_STATUS_REASSIGNED",
  assigned: "CS_COMMON_STATUS_ASSIGNED",
  resolved: "CS_COMMON_STATUS_RESOLVED",
  reassignrequested: "CS_COMMON_STATUS_REASSIGN_REQUESTED"
};

var displayStatus = exports.displayStatus = function displayStatus(status) {
  return status ? statusToMessageMapping[status.toLowerCase()] : "";
};

var displayLocalizedStatusMessage = exports.displayLocalizedStatusMessage = function displayLocalizedStatusMessage(status) {
  return status ? statusToLocalisationKeyMapping[status.toLowerCase()] : "";
};
var transformById = exports.transformById = function transformById(payload, id) {
  return payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);
    return result;
  }, {});
};

var hyphenSeperatedDateTime = exports.hyphenSeperatedDateTime = function hyphenSeperatedDateTime(d) {
  return d;
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

var getRequestUrl = exports.getRequestUrl = function getRequestUrl(url, params) {
  var query = Object.keys(params).map(function (k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
  }).join("&");
  return url + "?" + query;
};

var prepareForm = exports.prepareForm = function prepareForm(params) {
  var formData = new FormData();
  for (var k in params) {
    formData.append(k, params[k]);
  }
  return formData;
};

var getMonthName = function getMonthName(monthIndex) {
  switch (monthIndex) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      return "";
  }
};

var getCurrLocation = function getCurrLocation() {
  return new Promise(function (resolve) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var currLoc = {};
        currLoc.lat = position.coords.latitude.toFixed(6);
        currLoc.lng = position.coords.longitude.toFixed(6);
        resolve(currLoc);
      });
    }
  });
};

var getCurrentAddress = exports.getCurrentAddress = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var currLoc, url;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getCurrLocation();

          case 2:
            currLoc = _context.sent;
            url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + currLoc.lat + "," + currLoc.lng + "&key=" + _common2.default.MAP_API_KEY;
            _context.prev = 4;
            return _context.abrupt("return", _axios2.default.get(url).then(function (res) {
              if (res.data.status === "OK") {
                if (res.data.results[0]) {
                  var currAddress = {};
                  currAddress.lat = currLoc.lat;
                  currAddress.lng = currLoc.lng;
                  currAddress.address = res.data.results[0].formatted_address;
                  return currAddress;
                }
              }
            }));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](4);

            console.log(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 8]]);
  }));

  return function getCurrentAddress() {
    return _ref.apply(this, arguments);
  };
}();

var mapCompIDToName = exports.mapCompIDToName = function mapCompIDToName(IDObj, compID) {
  return IDObj[compID] ? IDObj[compID].serviceCode : "Default";
};

var getDateFromEpoch = exports.getDateFromEpoch = function getDateFromEpoch(epoch) {
  var dateObj = new Date(epoch);
  var year = dateObj.getFullYear().toString().slice(2, 4);
  var month = getMonthName(dateObj.getMonth() + 1);
  var day = dateObj.getDate();
  return day + "-" + month + "-" + year;
};

var getBodyClassFromPath = exports.getBodyClassFromPath = function getBodyClassFromPath(path) {
  var bodyClass = path.split("/").filter(function (part) {
    return part.trim().length > 0;
  }).join("-");
  return bodyClass;
};

// remove the previous tokens; temp fix
// forEach not present in the prototype chain of some older browsers
var addBodyClass = exports.addBodyClass = function addBodyClass(path) {
  var bodyClass = getBodyClassFromPath(path);
  try {
    document.body.classList.forEach(function (className) {
      return document.body.classList.remove(className);
    });
    bodyClass && document.body.classList.add(bodyClass);
  } catch (error) {}
};

var prepareFormData = exports.prepareFormData = function prepareFormData(form) {
  var formFields = form.fields;
  return Object.keys(formFields).reduce(function (formData, fieldKey) {
    var _formFields$fieldKey = formFields[fieldKey],
        file = _formFields$fieldKey.file,
        jsonPath = _formFields$fieldKey.jsonPath;
    var value = formFields[fieldKey].value;

    if (file) {
      value = (form.files && form.files[fieldKey] || []).map(function (fieldFile) {
        return fieldFile.fileStoreId;
      });
    }
    return (0, _set2.default)(formData, jsonPath, value);
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

var fetchImages = exports.fetchImages = function fetchImages(actionArray) {
  var imageArray = [];
  actionArray.forEach(function (action, index) {
    action.action === "open" && action.media && imageArray.push(action.media);
  });
  return imageArray[0] ? imageArray[0] : [];
};

var getUserInfo = exports.getUserInfo = function getUserInfo() {
  var userInfo = localStorage.getItem("user-info");
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = null;
  }
  return userInfo;
};

var getCityNameByCode = exports.getCityNameByCode = function getCityNameByCode(code, cities) {
  var city = (cities || []).filter(function (city) {
    return city.key === code;
  });
  return city && city.length && city[0].text || "";
};

var isImage = exports.isImage = function isImage(url) {
  var acceptedImageTypes = ["jpg", "jpeg", "png"];
  var urlParts = url && url.split("?");
  var imageType = urlParts && urlParts.length && urlParts[0].split(".") && urlParts[0].split(".").length && urlParts[0].split(".").pop();
  return imageType && acceptedImageTypes.indexOf(imageType) !== -1 || false;
};

//using in Employee Screens

var dateDiffInDays = function dateDiffInDays(a, b) {
  var millsPerDay = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / millsPerDay);
};

var getTransformedStatus = exports.getTransformedStatus = function getTransformedStatus(status) {
  var transformedStatus = "";
  switch (status.toLowerCase()) {
    case "open":
    case "new":
    case "reassignrequested":
      transformedStatus = "UNASSIGNED";
      break;
    case "resolved":
    case "rejected":
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    default:
      transformedStatus = "UNASSIGNED";
      break;
  }
  return transformedStatus;
};

var getFileSize = exports.getFileSize = function getFileSize(file) {
  var size = parseFloat(file.size / 1024).toFixed(2);
  return size;
};

var isFileImage = exports.isFileImage = function isFileImage(file) {
  var mimeType = file["type"];
  return mimeType && mimeType.split("/")[0] == "image" || false;
};

var getNameFromId = exports.getNameFromId = function getNameFromId(obj, id, defaultValue) {
  return obj && id && obj[id] ? obj[id].name : defaultValue;
};

var getPropertyFromObj = exports.getPropertyFromObj = function getPropertyFromObj(obj, id, property, defaultValue) {
  return obj && obj[id] ? obj[id][property] : defaultValue;
};

var returnSLAStatus = exports.returnSLAStatus = function returnSLAStatus(slaHours, submittedTime) {
  var millsToAdd = slaHours * 60 * 60 * 1000;
  var toBeFinishedBy = millsToAdd + submittedTime;
  var daysCount = dateDiffInDays(new Date(Date.now()), new Date(toBeFinishedBy));
  if (daysCount < 0) {
    return Math.abs(daysCount) === 1 ? "Overdue by " + Math.abs(daysCount) + " day" : "Overdue by " + Math.abs(daysCount) + " days";
  } else {
    return Math.abs(daysCount) === 1 ? Math.abs(daysCount) + " day left" : Math.abs(daysCount) + " days left";
  }
};

var getLatestCreationTime = exports.getLatestCreationTime = function getLatestCreationTime(complaint) {
  for (var i = 0; i < complaint.actions.length; i++) {
    if (complaint.actions[i].action === "reopen") {
      return complaint.actions[i].when;
    }
  }
  return complaint.auditDetails.createdTime;
};

var transformLocalizationLabels = exports.transformLocalizationLabels = function transformLocalizationLabels(localizationLabels) {
  var labelsById = transformById(localizationLabels, "code");
  return labelsById;
};

var getTenantForLatLng = exports.getTenantForLatLng = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(lat, lng) {
    var queryObjList, response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            queryObjList = [{ key: "lat", value: lat }, { key: "lng", value: lng }, { key: "tenantId", value: _common2.default.tenantId }];
            response = void 0;

            if (!(lat && lng)) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return (0, _api.httpRequest)(_endPoints.TENANT.POST.URL, _endPoints.TENANT.POST.ACTION, queryObjList);

          case 6:
            response = _context2.sent;
            return _context2.abrupt("return", response.Tenant.code);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            throw new Error(_context2.t0.message);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 10]]);
  }));

  return function getTenantForLatLng(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var findLatestAssignee = exports.findLatestAssignee = function findLatestAssignee(actionArray) {
  for (var i = 0; i < actionArray.length; i++) {
    if (actionArray[i].status === "assigned") {
      return actionArray[i].assignee;
    }
  }
  return null;
};

var transformComplaintForComponent = exports.transformComplaintForComponent = function transformComplaintForComponent(complaints, role, employeeById, citizenById, categoriesById, displayStatus) {
  var defaultPhoneNumber = "";
  var defaultMobileNumber = "";
  var transformedComplaints = Object.values(complaints.byId).map(function (complaintDetail, index) {
    return {
      header: getPropertyFromObj(complaints.categoriesById, complaintDetail.serviceCode, "serviceCode", "NA"),
      date: complaintDetail.auditDetails.createdTime,
      latestCreationTime: getLatestCreationTime(complaintDetail),
      complaintNo: complaintDetail.serviceRequestId,
      images: fetchImages(complaintDetail.actions).filter(function (imageSource) {
        return isImage(imageSource);
      }),
      complaintStatus: complaintDetail.status && getTransformedStatus(complaintDetail.status),
      address: complaintDetail.address ? complaintDetail.address : "Error fetching address",
      reassign: complaintDetail.status === "reassignrequested" ? true : false,
      reassignRequestedBy: complaintDetail.status === "reassignrequested" ? getPropertyFromObj(employeeById, complaintDetail.actions[0].by.split(":")[0], "name", "NA") : "NA",
      submittedBy: complaintDetail && getPropertyFromObj(citizenById, complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[0], "name", "NA"),
      citizenPhoneNumber: complaintDetail && getPropertyFromObj(citizenById, complaintDetail.actions[complaintDetail.actions.length - 1].by.split(":")[0], "mobileNumber", defaultMobileNumber),
      assignedTo: complaintDetail && getPropertyFromObj(employeeById, findLatestAssignee(complaintDetail.actions), "name", "NA"),
      employeePhoneNumber: employeeById && employeeById[findLatestAssignee(complaintDetail.actions)] ? employeeById[findLatestAssignee(complaintDetail.actions)].mobileNumber : defaultPhoneNumber,
      status: role === "citizen" ? displayStatus(complaintDetail.status, complaintDetail.assignee, complaintDetail.actions.filter(function (complaint) {
        return complaint.status;
      })[0].action) : getTransformedStatus(complaintDetail.status) === "CLOSED" ? complaintDetail.rating ? displayStatus(complaintDetail.rating + "/5") : displayStatus(complaintDetail.actions[0].status) : displayStatus(returnSLAStatus(getPropertyFromObj(categoriesById, complaintDetail.serviceCode, "slaHours", "NA"), getLatestCreationTime(complaintDetail)))
    };
  });
  return transformedComplaints;
};

var startSMSRecevier = exports.startSMSRecevier = function startSMSRecevier() {
  try {
    if (typeof androidAppProxy !== "undefined") {
      window.androidAppProxy.requestSMS();
    }
  } catch (error) {}
};

var upperCaseFirst = exports.upperCaseFirst = function upperCaseFirst(word) {
  return word[0].toUpperCase() + word.slice(1, word.length);
};

//Specific for MDMS Screens
var mergeMDMSDataArray = exports.mergeMDMSDataArray = function mergeMDMSDataArray(oldData, newRow) {
  var rawData = [].concat((0, _toConsumableArray3.default)(oldData));
  rawData.forEach(function (item, index) {
    if (item.code === newRow.code) {
      //Update Case
      rawData.splice(index, 1);
    }
  });
  var mergedData = [newRow].concat((0, _toConsumableArray3.default)(rawData));
  return mergedData;
};

var fetchDropdownData = exports.fetchDropdownData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch, dataFetchConfig, formKey, fieldKey) {
    var url, action, requestBody, payloadSpec, dropdownData, ddData, message;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = dataFetchConfig.url, action = dataFetchConfig.action, requestBody = dataFetchConfig.requestBody;

            console.log(dataFetchConfig);
            _context3.prev = 2;
            _context3.next = 5;
            return (0, _api.httpRequest)(url, action, [], requestBody);

          case 5:
            payloadSpec = _context3.sent;
            dropdownData = (0, _get2.default)(payloadSpec, dataFetchConfig.dataPath);
            ddData = dropdownData.reduce(function (ddData, item) {
              ddData.push({ label: item.name, value: item.code });
              return ddData;
            }, []);

            dispatch((0, _actions.setFieldProperty)(formKey, fieldKey, "dropDownData", ddData));
            _context3.next = 16;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](2);
            message = _context3.t0.message;

            dispatch((0, _actions2.toggleSnackbarAndSetText)(true, message, true));
            return _context3.abrupt("return");

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[2, 11]]);
  }));

  return function fetchDropdownData(_x4, _x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();