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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intialState = {
  dropDownData: {}
};

var commonReducer = function commonReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];

  switch (action.type) {
    case commonTypes.SET_DROPDOWN_DATA:
      return (0, _extends4.default)({}, state, {
        dropDownData: (0, _extends4.default)({}, state.dropDownData, (0, _defineProperty3.default)({}, action.key, action.payload))
      });
    case commonTypes.EMPLOYEE_FETCH_SUCCESS:
      var employeeById = (0, _commons.transformById)(action.payload.Employee, "id");
      return (0, _extends4.default)({}, state, {
        loading: false,
        employeeById: (0, _extends4.default)({}, state.employeeById, employeeById)
      });
    case commonTypes.EMPLOYEE_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
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
        cities: [].concat((0, _toConsumableArray3.default)(cities))
      });
    case commonTypes.MDMS_FETCH_ERROR:
      return (0, _extends4.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    default:
      return state;
  }
};
exports.default = commonReducer;