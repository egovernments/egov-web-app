"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSpecs = exports.dataFetchComplete = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("../common/actions");

var commonActions = _interopRequireWildcard(_actions);

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _commons = require("egov-ui-kit/utils/commons");

var _api = require("egov-ui-kit/utils/api");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var specsFetchPending = function specsFetchPending() {
  return {
    type: actionTypes.SPECS_FETCH_PENDING
  };
};

var specsFetchComplete = function specsFetchComplete(payload, moduleName, masterName) {
  return {
    type: actionTypes.SPECS_FETCH_COMPLETE,
    payload: payload,
    moduleName: moduleName,
    masterName: masterName
  };
};

var specsFetchError = function specsFetchError(error) {
  return {
    type: actionTypes.SPECS_FETCH_ERROR,
    error: error
  };
};

var dataFetchPending = function dataFetchPending() {
  return {
    type: actionTypes.DATA_FETCH_PENDING
  };
};

var dataFetchComplete = exports.dataFetchComplete = function dataFetchComplete(payload, moduleName, masterName) {
  return {
    type: actionTypes.DATA_FETCH_COMPLETE,
    payload: payload,
    moduleName: moduleName,
    masterName: masterName
  };
};

var dataFetchError = function dataFetchError(error) {
  return {
    type: actionTypes.DATA_FETCH_ERROR,
    error: error
  };
};

var mapFloatingLabelText = function mapFloatingLabelText(rawText) {
  return rawText.split(".").pop();
};

var transformRawTypeToFormat = function transformRawTypeToFormat(rawType) {
  switch (rawType) {
    case "text":
      return "textfield";
    case "checkbox":
      return "checkbox";
    case "singleValueList":
      return "singleValueList";
    default:
      return "textfield";
  }
};

var createMDMSGenericSpecs = function createMDMSGenericSpecs(moduleName, masterName, tenantId) {
  return {
    moduleName: {
      id: "MDMS_moduleName",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.moduleName",
      value: moduleName
    },
    masterName: {
      id: "MDMS_masterName",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.masterName",
      value: masterName
    },
    topLevelTenantId: {
      id: "MDMS_tenantIdtopLevel",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.tenantId",
      value: tenantId
    },
    tenantId: {
      id: "MDMS_tenantId",
      required: true,
      type: null,
      dontReset: true,
      jsonPath: "MasterMetaData.masterData[0].tenantId",
      value: tenantId
    }
  };
};

var transform = function transform(rawSpecs, moduleName, tenantId) {
  return (0, _extends4.default)({}, rawSpecs, {
    values: rawSpecs.values.reduce(function (result, current) {
      if (current.name != "tenantId") {
        var master = (0, _commons.upperCaseFirst)(current.name);
        result["fields"] = (0, _extends4.default)({}, result["fields"], (0, _defineProperty3.default)({}, current.name, {
          id: current.name,
          type: transformRawTypeToFormat(current.type),
          required: current.isRequired,
          jsonPath: current.jsonPath.replace("MdmsMetadata", "MasterMetaData"),
          floatingLabelText: mapFloatingLabelText(current.label),
          errorMessage: current.patternErrorMsg,
          hintText: "",
          pattern: current.pattern,
          value: "",
          disabled: current.isDisabled,
          //To make API call and initialise field, if Reqd.
          dataFetchConfig: current.type === "singleValueList" ? {
            url: _endPoints.MDMS.GET.URL,
            action: _endPoints.MDMS.GET.ACTION,
            queryParams: {},
            requestBody: {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: moduleName,
                  masterDetails: [{
                    name: master
                  }]
                }]
              }
            },
            dataPath: "MdmsRes[" + moduleName + "][" + master + "]"
          } : null
        }));
      }
      return result;
    }, {})
  });
};

var fetchSpecs = exports.fetchSpecs = function fetchSpecs(queryObject, moduleName, masterName, tenantId, requestBody) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var payloadSpec, specs, fields, formConfig, payloadData;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(specsFetchPending());
              dispatch(dataFetchPending());
              _context.prev = 2;
              _context.next = 5;
              return (0, _api.httpRequest)(_endPoints.SPEC.GET.URL + "/" + moduleName + "/" + masterName, _endPoints.SPEC.GET.ACTION, queryObject);

            case 5:
              payloadSpec = _context.sent;
              specs = transform(payloadSpec, moduleName, tenantId);
              fields = specs.values.fields;
              formConfig = {
                fields: (0, _extends4.default)({}, fields, createMDMSGenericSpecs(moduleName, masterName, tenantId)),
                name: "MDMS_" + masterName,
                submit: { type: "submit", label: "CORE_COMMON_CONTINUE" },
                saveUrl: "egov-mdms-create/v1/_create",
                editUrl: "egov-mdms-create/v1/_update",
                editToast: "Updated Successfully",
                createToast: "Created Successfully"
              };

              dispatch((0, _actions2.initForm)(formConfig));
              dispatch(specsFetchComplete(payloadSpec, moduleName, masterName));
              _context.prev = 11;
              _context.next = 14;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 14:
              payloadData = _context.sent;

              dispatch(dataFetchComplete(payloadData, moduleName, masterName));
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](11);

              dispatch(dataFetchError(_context.t0.message));

            case 21:
              _context.next = 26;
              break;

            case 23:
              _context.prev = 23;
              _context.t1 = _context["catch"](2);

              dispatch(specsFetchError(_context.t1.message));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[2, 23], [11, 18]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};