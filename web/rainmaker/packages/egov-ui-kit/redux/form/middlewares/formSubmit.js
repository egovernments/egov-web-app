"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _actionTypes = require("../actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("../actions");

var _actions2 = require("egov-ui-kit/redux/auth/actions");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _actions4 = require("egov-ui-kit/redux/complaints/actions");

var _actions5 = require("egov-ui-kit/redux/mdms/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formSubmit = function formSubmit(store) {
  return function (next) {
    return function (action) {
      var type = action.type,
          formKey = action.formKey,
          payload = action.payload,
          form = action.form;

      var dispatch = store.dispatch;

      if (type == actionTypes.SUBMIT_FORM_COMPLETE) {
        // complete the form submit complete action
        next(action);
        var state = store.getState();
        var _state$form$formKey = state.form[formKey],
            redirectionRoute = _state$form$formKey.redirectionRoute,
            idJsonPath = _state$form$formKey.idJsonPath,
            toast = _state$form$formKey.toast;

        //for Mdms Screens

        if (formKey.includes("MDMS")) {
          var _state$mdms = state.mdms,
              moduleName = _state$mdms.moduleName,
              masterName = _state$mdms.masterName;
          var saveUrl = action.saveUrl;

          console.log(saveUrl);
          var _state$form$formKey2 = state.form[formKey],
              editToast = _state$form$formKey2.editToast,
              createToast = _state$form$formKey2.createToast;

          var mdmsToast = saveUrl.includes("_create") ? createToast : editToast;
          delete payload.ResponseInfo;
          var mdmsResponse = payload.MdmsRes;
          var newMdmsRow = mdmsResponse[moduleName][masterName][0];
          var currentMdmsData = state.mdms.data[moduleName][masterName];
          dispatch((0, _actions5.dataFetchComplete)({ MdmsRes: (0, _defineProperty3.default)({}, moduleName, (0, _defineProperty3.default)({}, masterName, (0, _commons.mergeMDMSDataArray)(currentMdmsData, newMdmsRow))) }, moduleName, masterName));
          if (mdmsToast && mdmsToast.length) {
            dispatch((0, _actions3.toggleSnackbarAndSetText)(true, mdmsToast, false));
          }
        }

        // for login/register flow
        if (formKey === "otp") {
          redirectionRoute = "/citizen/pt-payment";
          delete payload.ResponseInfo;
          dispatch((0, _actions2.authenticated)(payload));
        }
        //employee login authenticated
        if (formKey === "employeeLogin") {
          delete payload.ResponseInfo;
          dispatch((0, _actions2.authenticated)(payload));
        }

        // for profile update
        if (formKey === "profile") {
          delete payload.responseInfo;
          dispatch((0, _actions2.userProfileUpdated)(payload));
        }

        // use a flag reset true or false
        if (formKey !== "login" && formKey !== "register" && formKey !== "profile" && formKey !== "employeeLogin" && formKey !== "profileEmployee" && formKey !== "employeeForgotPasswd") {
          dispatch((0, _actions.resetForm)(formKey));
        }

        if (formKey === "comment") {
          dispatch((0, _actions4.fetchComplaints)([{ key: "serviceRequestId", value: decodeURIComponent(window.location.href.split("/").pop()) }]));
        }

        if (formKey === "assignComplaint") {
          if (payload && payload.actionHistory && payload.actionHistory[0].actions[0].action === "assign") {
            dispatch((0, _actions3.setRoute)("/employee/complaint-assigned/" + encodeURIComponent(payload.services[0].serviceRequestId)));
          } else if (payload && payload.actionHistory && payload.actionHistory[0].actions[0].action === "reassign") {
            dispatch((0, _actions3.setRoute)("/employee/complaint-reassigned/" + encodeURIComponent(payload.services[0].serviceRequestId)));
          }
        }

        if (redirectionRoute && redirectionRoute.length) {
          redirectionRoute = idJsonPath ? (0, _commons.addQueryArg)(redirectionRoute, [{ key: "id", value: (0, _get2.default)(payload, idJsonPath) }]) : redirectionRoute;
          dispatch((0, _actions3.setRoute)(redirectionRoute));
        }

        if (toast && toast.length) {
          dispatch((0, _actions3.toggleSnackbarAndSetText)(true, toast, false));
        }
      } else {
        next(action);
      }
    };
  };
};

exports.default = formSubmit;