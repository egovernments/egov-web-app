"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmployeeData = exports.deactivateEmployeeApiCall = exports.createUpdateEmployee = exports.handleCreateUpdateEmployee = exports.furnishEmployeeData = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("../../../../..//ui-utils/commons");

var _utils = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SET ALL SIMPLE DATES IN YMD FORMAT
var setDateInYmdFormat = function setDateInYmdFormat(obj, values) {
  values.forEach(function (element) {
    (0, _set2.default)(obj, element, (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element)));
  });
};

// SET ALL MULTIPLE OBJECT DATES IN YMD FORMAT
var setAllDatesInYmdFormat = function setAllDatesInYmdFormat(obj, values) {
  values.forEach(function (element) {
    var elemObject = (0, _get2.default)(obj, "" + element.object, []) === null ? [] : (0, _get2.default)(obj, "" + element.object, []);

    var _loop = function _loop(i) {
      element.values.forEach(function (item) {
        (0, _set2.default)(obj, element.object + "[" + i + "]." + item, (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element.object + "[" + i + "]." + item)));
      });
    };

    for (var i = 0; i < elemObject.length; i++) {
      _loop(i);
    }
  });
};

// SET ALL MULTIPLE OBJECT EPOCH DATES YEARS
var setAllYears = function setAllYears(obj, values) {
  values.forEach(function (element) {
    var elemObject = (0, _get2.default)(obj, "" + element.object, []) === null ? [] : (0, _get2.default)(obj, "" + element.object, []);

    var _loop2 = function _loop2(i) {
      element.values.forEach(function (item) {
        var ymd = (0, _utils.epochToYmdDate)((0, _get2.default)(obj, element.object + "[" + i + "]." + item));
        var year = ymd ? ymd.substring(0, 4) : null;
        year && (0, _set2.default)(obj, element.object + "[" + i + "]." + item, year);
      });
    };

    for (var i = 0; i < elemObject.length; i++) {
      _loop2(i);
    }
  });
};

var setRolesData = function setRolesData(obj) {
  var roles = (0, _get2.default)(obj, "user.roles", []);
  var newRolesArray = [];
  roles.forEach(function (element) {
    newRolesArray.push({
      label: element.name,
      value: element.code
    });
  });
  (0, _set2.default)(obj, "user.roles", newRolesArray);
};

var returnEmptyArrayIfNull = function returnEmptyArrayIfNull(value) {
  if (value === null || value === undefined) {
    return [];
  } else {
    return value;
  }
};

var furnishEmployeeData = exports.furnishEmployeeData = function furnishEmployeeData(state, dispatch) {
  var employeeObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee", []);
  setDateInYmdFormat(employeeObject[0], ["dateOfAppointment", "user.dob"]);
  setAllDatesInYmdFormat(employeeObject[0], [{ object: "assignments", values: ["fromDate", "toDate"] }, { object: "serviceHistory", values: ["serviceFrom", "serviceTo"] }]);
  setAllYears(employeeObject[0], [{ object: "education", values: ["yearOfPassing"] }, { object: "tests", values: ["yearOfPassing"] }]);
  setRolesData(employeeObject[0]);
  dispatch((0, _actions.prepareFinalObject)("Employee", employeeObject));
};

var handleCreateUpdateEmployee = exports.handleCreateUpdateEmployee = function handleCreateUpdateEmployee(state, dispatch) {
  var uuid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].uuid", null);
  if (uuid) {
    createUpdateEmployee(state, dispatch, "UPDATE");
  } else {
    createUpdateEmployee(state, dispatch, "CREATE");
  }
};

var createUpdateEmployee = exports.createUpdateEmployee = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, action) {
    var tenantId, queryObject, employeeObject, jurisdictions, i, assignments, _i, serviceHistory, _i2, education, _i3, educationYearOfPassing, tests, _i4, testsYearOfPassing, roles, processedRoles, response, employeeId, _response, _employeeId;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }];
            employeeObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee", []);

            // SET TENANT IDS IF THEY DO NOT ALREADY EXIST

            !(0, _get2.default)(employeeObject[0], "tenantId") && (0, _set2.default)(employeeObject[0], "tenantId", tenantId);
            !(0, _get2.default)(employeeObject[0], "user.tenantId") && (0, _set2.default)(employeeObject[0], "user.tenantId", tenantId);

            //SET TENANT IDS IN ALL NEWLY ADDED JURISDICTIONS, DOESNT CHANGE ALREADY PRESENT
            jurisdictions = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "jurisdictions", []));

            for (i = 0; i < jurisdictions.length; i++) {
              (0, _set2.default)(employeeObject[0], "jurisdictions[" + i + "].tenantId", tenantId);
            }

            (0, _set2.default)(employeeObject[0], "dateOfAppointment", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "dateOfAppointment")));
            (0, _set2.default)(employeeObject[0], "user.dob", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "user.dob")));

            assignments = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "assignments", []));

            for (_i = 0; _i < assignments.length; _i++) {
              (0, _set2.default)(employeeObject[0], "assignments[" + _i + "].fromDate", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "assignments[" + _i + "].fromDate")));
              (0, _set2.default)(employeeObject[0], "assignments[" + _i + "].toDate", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "assignments[" + _i + "].toDate")));
            }

            serviceHistory = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "serviceHistory", []));

            for (_i2 = 0; _i2 < serviceHistory.length; _i2++) {
              (0, _set2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceFrom", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceFrom")));
              (0, _set2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceTo", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "serviceHistory[" + _i2 + "].serviceTo")));
            }

            // FORMAT EDUCATION PASSING DATES TO EPOCH
            education = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "education", []));

            for (_i3 = 0; _i3 < education.length; _i3++) {
              educationYearOfPassing = (0, _get2.default)(employeeObject[0], "education[" + _i3 + "].yearOfPassing");

              (0, _set2.default)(employeeObject[0], "education[" + _i3 + "].yearOfPassing", (0, _utils.convertDateToEpoch)(educationYearOfPassing + "-01-01"));
            }

            // FORMAT TESTS PASSING DATES TO EPOCH
            tests = returnEmptyArrayIfNull((0, _get2.default)(employeeObject[0], "tests", []));

            for (_i4 = 0; _i4 < tests.length; _i4++) {
              testsYearOfPassing = (0, _get2.default)(employeeObject[0], "tests[" + _i4 + "].yearOfPassing");

              (0, _set2.default)(employeeObject[0], "tests[" + _i4 + "].yearOfPassing", (0, _utils.convertDateToEpoch)(testsYearOfPassing + "-01-01"));
            }

            // PROCESS ALL ROLES IN REQUIRED FORMAT
            roles = (0, _get2.default)(employeeObject[0], "user.roles", []);
            processedRoles = roles.map(function (item) {
              return {
                code: item.value,
                name: item.label
              };
            });

            (0, _set2.default)(employeeObject[0], "user.roles", processedRoles);

            if (!(action === "CREATE")) {
              _context.next = 34;
              break;
            }

            _context.prev = 21;
            _context.next = 24;
            return (0, _commons.createEmployee)(queryObject, employeeObject);

          case 24:
            response = _context.sent;
            employeeId = (0, _get2.default)(response, "Employees[0].code");

            window.location.href = "/egov-ui-framework/hrms/acknowledgement?purpose=create&status=success&applicationNumber=" + employeeId;
            _context.next = 32;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](21);

            furnishEmployeeData(state, dispatch);

          case 32:
            _context.next = 46;
            break;

          case 34:
            if (!(action === "UPDATE")) {
              _context.next = 46;
              break;
            }

            _context.prev = 35;
            _context.next = 38;
            return (0, _commons.updateEmployee)(queryObject, employeeObject);

          case 38:
            _response = _context.sent;
            _employeeId = _response && (0, _get2.default)(_response, "Employees[0].code");

            window.location.href = "/egov-ui-framework/hrms/acknowledgement?purpose=update&status=success&applicationNumber=" + _employeeId;
            _context.next = 46;
            break;

          case 43:
            _context.prev = 43;
            _context.t1 = _context["catch"](35);

            furnishEmployeeData(state, dispatch);

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[21, 29], [35, 43]]);
  }));

  return function createUpdateEmployee(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var deactivateEmployeeApiCall = exports.deactivateEmployeeApiCall = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var tenantId, queryObject, employeeObject, response, employeeId;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }];
            employeeObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee", []);

            (0, _set2.default)(employeeObject[0], "isActive", false);
            (0, _set2.default)(employeeObject[0], "deactivationDetails[0].effectiveFrom", (0, _utils.convertDateToEpoch)((0, _get2.default)(employeeObject[0], "deactivationDetails[0].effectiveFrom")));
            _context2.prev = 5;
            _context2.next = 8;
            return (0, _commons.updateEmployee)(queryObject, employeeObject);

          case 8:
            response = _context2.sent;
            employeeId = response && (0, _get2.default)(response, "Employees[0].code");

            window.location.href = "/egov-ui-framework/hrms/acknowledgement?purpose=deactivate&status=success&applicationNumber=" + employeeId;
            (0, _utils.showHideAdhocPopup)(state, dispatch);
            _context2.next = 16;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](5);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[5, 14]]);
  }));

  return function deactivateEmployeeApiCall(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getEmployeeData = exports.getEmployeeData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, employeeId) {
    var queryObject, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            queryObject = [{
              key: "codes",
              value: employeeId
            }];
            _context3.next = 3;
            return (0, _commons.getSearchResults)(queryObject);

          case 3:
            response = _context3.sent;

            dispatch((0, _actions.prepareFinalObject)("Employee", (0, _get2.default)(response, "Employees")));
            furnishEmployeeData(state, dispatch);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getEmployeeData(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();