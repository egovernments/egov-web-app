"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require("babel-runtime/helpers/extends");

var _extends4 = _interopRequireDefault(_extends3);

var _actionTypes = require("./actionTypes");

var commonTypes = _interopRequireWildcard(_actionTypes);

var _commons = require("egov-ui-kit/utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intialState = {
  dropDownData: {},
  prepareFormData: {},
  spinner: false
};

var commonReducer = function commonReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case commonTypes.SET_DROPDOWN_DATA:
      return (0, _extends4.default)({}, state, {
        dropDownData: (0, _extends4.default)({}, state.dropDownData, (0, _defineProperty3.default)({}, action.key, action.payload))
      });
    case commonTypes.EMPLOYEE_FETCH_PENDING:
      return (0, _extends4.default)({}, state, {
        loading: true,
        error: false,
        employeeFetchSuccess: false,
        errorMessage: ""
      });
    case commonTypes.EMPLOYEE_FETCH_SUCCESS:
      var employeeById = (0, _commons.transformById)(action.payload.Employee, "id");
      return (0, _extends4.default)({}, state, {
        loading: false,
        employeeFetchSuccess: true,
        employeeById: (0, _extends4.default)({}, state.employeeById, employeeById)
      });
    case commonTypes.EMPLOYEE_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        employeeFetchSuccess: true,
        error: true,
        errorMessage: action.error
      });

    case commonTypes.EMPLOYEE_TO_ASSIGN_FETCH_PENDING:
      return (0, _extends4.default)({}, state, {
        loading: true,
        error: false,
        fetchEmployeeToAssignSuccess: false,
        errorMessage: ""
      });

    case commonTypes.EMPLOYEE_TO_ASSIGN_FETCH_SUCCESS:
      var employeeToAssignById = (0, _commons.transformById)(action.payload.Employee, "id");
      return (0, _extends4.default)({}, state, {
        loading: false,
        fetchEmployeeToAssignSuccess: true,
        employeeToAssignById: (0, _extends4.default)({}, state.employeeToAssignById, employeeToAssignById)
      });
    case commonTypes.EMPLOYEE_TO_ASSIGN_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        fetchEmployeeToAssignSuccess: true,
        error: true,
        errorMessage: action.error
      });
    case commonTypes.CITIZEN_FETCH_SUCCESS:
      var citizenById = (0, _commons.transformById)(action.payload.user, "id");
      return (0, _extends4.default)({}, state, {
        loading: false,
        citizenById: (0, _extends4.default)({}, state.citizenById, citizenById)
      });
    case commonTypes.CITIZEN_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case commonTypes.MDMS_FETCH_SUCCESS:
      var departmentsById = (0, _commons.transformById)(action.payload.MdmsRes["common-masters"].Department, "code");
      var designationsById = (0, _commons.transformById)(action.payload.MdmsRes["common-masters"].Designation, "code");
      var citiesByModule = (0, _commons.transformById)(action.payload.MdmsRes["tenant"].citymodule, "code");
      var cities = action.payload.MdmsRes["tenant"]["tenants"].map(function (item) {
        return (0, _extends4.default)({
          key: item.code,
          text: item.city.name
        }, item);
      });
      return (0, _extends4.default)({}, state, {
        loading: false,
        departmentById: (0, _extends4.default)({}, state.departmentsById, departmentsById),
        designationsById: (0, _extends4.default)({}, state.designationsById, designationsById),
        cities: [].concat((0, _toConsumableArray3.default)(cities)),
        citiesByModule: citiesByModule
      });
    case commonTypes.MDMS_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case commonTypes.PREPARE_FORM_DATA:
      return (0, _extends4.default)({}, state, {
        prepareFormData: (0, _set2.default)(state.prepareFormData, action.jsonPath, action.value ? action.value : null)
      });

    case commonTypes.GENERAL_MDMS_FETCH_SUCCESS:
      var masterArray = action.masterArray,
          key = action.key;

      var generalMDMSDataById = masterArray.reduce(function (result, masterName) {
        result[masterName] = (0, _commons.transformById)(action.payload.MdmsRes[action.moduleName][masterName], key ? key : "code");
        return result;
      }, {});
      return (0, _extends4.default)({}, state, {
        loading: false,
        generalMDMSDataById: generalMDMSDataById
      });

    case commonTypes.GENERAL_MDMS_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });

    case commonTypes.TOGGLE_SPINNER:
      return (0, _extends4.default)({}, state, {
        spinner: !state.spinner
      });
    case commonTypes.SHOW_SPINNER:
      return (0, _extends4.default)({}, state, {
        spinner: true
      });

    case commonTypes.HIDE_SPINNER:
      return (0, _extends4.default)({}, state, {
        spinner: false
      });
    case commonTypes.PREPARE_FORM_DATA_FROM_DRAFT:
      return (0, _extends4.default)({}, state, {
        prepareFormData: action.prepareFormData
      });
    case commonTypes.FETCH_PGR_CONSTANTS:
      return (0, _extends4.default)({}, state, {
        pgrContants: action.data
      });
    default:
      return state;
  }
};
exports.default = commonReducer;