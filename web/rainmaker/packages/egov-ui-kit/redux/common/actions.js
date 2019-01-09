"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchpgrConstants = exports.updatePrepareFormDataFromDraft = exports.hideSpinner = exports.showSpinner = exports.toggleSpinner = exports.fetchGeneralMDMSData = exports.fetchEmployeeToAssign = exports.fetchMDMSData = exports.fetchCitizens = exports.fetchEmployees = exports.generalMDMSFetchSuccess = exports.prepareFormData = exports.setDropDownData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _api = require("egov-ui-kit/utils/api");

var _endPoints = require("egov-ui-kit/utils/endPoints");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setDropDownData = exports.setDropDownData = function setDropDownData(key, payload) {
  return { type: actionTypes.SET_DROPDOWN_DATA, key: key, payload: payload };
};

var employeeFetchPending = function employeeFetchPending() {
  return {
    type: actionTypes.EMPLOYEE_FETCH_PENDING
  };
};

var employeeFetchSuccess = function employeeFetchSuccess(payload) {
  return {
    type: actionTypes.EMPLOYEE_FETCH_SUCCESS,
    payload: payload
  };
};

var employeeFetchError = function employeeFetchError(error) {
  return {
    type: actionTypes.EMPLOYEE_FETCH_ERROR,
    error: error
  };
};

var employeeToAssignFetchSuccess = function employeeToAssignFetchSuccess(payload) {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_SUCCESS,
    payload: payload
  };
};

var employeeToAssignFetchPending = function employeeToAssignFetchPending() {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_PENDING
  };
};

var employeeToAssignFetchError = function employeeToAssignFetchError(error) {
  return {
    type: actionTypes.EMPLOYEE_TO_ASSIGN_FETCH_ERROR,
    error: error
  };
};

var citizenFetchSuccess = function citizenFetchSuccess(payload) {
  return {
    type: actionTypes.CITIZEN_FETCH_SUCCESS,
    payload: payload
  };
};

var citizenFetchError = function citizenFetchError(error) {
  return {
    type: actionTypes.CITIZEN_FETCH_ERROR,
    error: error
  };
};

var MDMSFetchSuccess = function MDMSFetchSuccess(payload) {
  return {
    type: actionTypes.MDMS_FETCH_SUCCESS,
    payload: payload
  };
};

var MDMSFetchError = function MDMSFetchError(error) {
  return {
    type: actionTypes.MDMS_FETCH_ERROR,
    error: error
  };
};

var prepareFormData = exports.prepareFormData = function prepareFormData(jsonPath, value) {
  return {
    type: actionTypes.PREPARE_FORM_DATA,
    jsonPath: jsonPath,
    value: value
  };
};

var generalMDMSFetchSuccess = exports.generalMDMSFetchSuccess = function generalMDMSFetchSuccess(payload, moduleName, masterArray, key) {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_SUCCESS,
    payload: payload,
    moduleName: moduleName,
    masterArray: masterArray,
    key: key
  };
};

var generalMDMSFetchError = function generalMDMSFetchError(error) {
  return {
    type: actionTypes.GENERAL_MDMS_FETCH_ERROR,
    error: error
  };
};

var fetchEmployees = exports.fetchEmployees = function fetchEmployees(queryObj) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(employeeFetchPending());
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)(_endPoints.EMPLOYEE.GET.URL, _endPoints.EMPLOYEE.GET.ACTION, queryObj);

            case 4:
              payload = _context.sent;

              dispatch(employeeFetchSuccess(payload));
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);

              dispatch(employeeFetchError(_context.t0.message));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 8]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchCitizens = exports.fetchCitizens = function fetchCitizens() {
  var requestBody = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var requestParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _api.httpRequest)(_endPoints.CITIZEN.GET.URL, _endPoints.CITIZEN.GET.ACTION, requestParams, requestBody);

            case 3:
              payload = _context2.sent;

              dispatch(citizenFetchSuccess(payload));
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);

              dispatch(citizenFetchError(_context2.t0.message));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

var fetchMDMSData = exports.fetchMDMSData = function fetchMDMSData(requestBody) {
  return function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 3:
              payload = _context3.sent;

              dispatch(MDMSFetchSuccess(payload));
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);

              dispatch(MDMSFetchError(_context3.t0.message));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }();
};

var fetchEmployeeToAssign = exports.fetchEmployeeToAssign = function fetchEmployeeToAssign(queryObj, requestBody) {
  return function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              dispatch(employeeToAssignFetchPending());
              _context4.prev = 1;
              _context4.next = 4;
              return (0, _api.httpRequest)(_endPoints.EMPLOYEE_ASSIGN.GET.URL, _endPoints.EMPLOYEE_ASSIGN.GET.ACTION, queryObj, requestBody);

            case 4:
              payload = _context4.sent;

              dispatch(employeeToAssignFetchSuccess(payload));
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](1);

              dispatch(employeeToAssignFetchError(_context4.t0.message));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[1, 8]]);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }();
};

var fetchGeneralMDMSData = exports.fetchGeneralMDMSData = function fetchGeneralMDMSData(requestBody, moduleName, masterArray, key, tenantId) {
  if (!requestBody) {
    var genRequestBody = {
      MdmsCriteria: {
        tenantId: tenantId,
        moduleDetails: [{
          moduleName: moduleName,
          masterDetails: masterArray.map(function (item) {
            return {
              name: item
            };
          })
        }]
      }
    };
  }
  return function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody || genRequestBody);

            case 3:
              payload = _context5.sent;

              dispatch(generalMDMSFetchSuccess(payload, moduleName, masterArray, key));
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);

              dispatch(generalMDMSFetchError(_context5.t0.message));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 7]]);
    }));

    return function (_x7) {
      return _ref5.apply(this, arguments);
    };
  }();
};

var toggleSpinner = exports.toggleSpinner = function toggleSpinner() {
  return {
    type: actionTypes.TOGGLE_SPINNER
  };
};

var showSpinner = exports.showSpinner = function showSpinner() {
  return {
    type: actionTypes.SHOW_SPINNER
  };
};

var hideSpinner = exports.hideSpinner = function hideSpinner() {
  return {
    type: actionTypes.HIDE_SPINNER
  };
};

var updatePrepareFormDataFromDraft = exports.updatePrepareFormDataFromDraft = function updatePrepareFormDataFromDraft(prepareFormData) {
  return {
    type: actionTypes.PREPARE_FORM_DATA_FROM_DRAFT,
    prepareFormData: prepareFormData
  };
};

var fetchpgrConstantSuccess = function fetchpgrConstantSuccess(data) {
  return {
    type: actionTypes.FETCH_PGR_CONSTANTS,
    data: data
  };
};

var fetchpgrConstants = exports.fetchpgrConstants = function fetchpgrConstants() {
  return function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(dispatch) {
      var requestBody, payload;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              requestBody = {
                MdmsCriteria: {
                  tenantId: "pb",
                  moduleDetails: [{
                    moduleName: "RAINMAKER-PGR",
                    masterDetails: [{
                      name: "UIConstants"
                    }]
                  }]
                }
              };
              _context6.prev = 1;
              _context6.next = 4;
              return (0, _api.httpRequest)(_endPoints.MDMS.GET.URL, _endPoints.MDMS.GET.ACTION, [], requestBody);

            case 4:
              payload = _context6.sent;

              dispatch(fetchpgrConstantSuccess(payload.MdmsRes));
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](1);

              dispatch(generalMDMSFetchError(_context6.t0));

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[1, 8]]);
    }));

    return function (_x8) {
      return _ref6.apply(this, arguments);
    };
  }();
};