"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchComplaintCategories = exports.fetchComplaints = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _actions = require("../common/actions");

var commonActions = _interopRequireWildcard(_actions);

var _endPoints = require("utils/endPoints");

var _api = require("utils/api");

var _lodash = require("lodash");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//checking users there in action history
var checkUsers = function checkUsers(dispatch, state, actionHistory, hasUsers) {
  if (hasUsers) {
    var employeeIds = [],
        userIds = [];
    actionHistory.forEach(function (actions) {
      actions.actions.forEach(function (action) {
        if (action.by) {
          var _getUserEmployeeId = getUserEmployeeId(action.by),
              userId = _getUserEmployeeId.userId,
              employeeId = _getUserEmployeeId.employeeId;

          if (userId) userIds.push(userId);
          if (employeeId) employeeIds.push(employeeId);
        }
        if (action.assignee) {
          var _getUserEmployeeId2 = getUserEmployeeId(action.assignee),
              _userId = _getUserEmployeeId2.userId,
              _employeeId = _getUserEmployeeId2.employeeId;

          if (_userId) userIds.push(_userId);
          if (_employeeId) employeeIds.push(_employeeId);
        }
      });
    });
    var common = state.common;

    if (employeeIds.length > 0) {
      var cachedEmployeeIds = [];
      if (common && common.employeeById) {
        cachedEmployeeIds = Object.keys(common.employeeById);
      }
      var value = (0, _lodash.uniq)((0, _lodash.difference)(employeeIds, cachedEmployeeIds)).join(",");
      if (value.length) dispatch(commonActions.fetchEmployees([{ key: "id", value: value }]));
    }
    if (userIds.length > 0) {
      var cachedUserIds = [];
      if (common && common.citizenById) {
        cachedUserIds = Object.keys(common.citizenById);
      }
      var id = (0, _lodash.uniq)((0, _lodash.difference)(userIds, cachedUserIds));
      if (id.length) dispatch(commonActions.fetchCitizens({ tenantId: localStorage.getItem("tenant-id"), id: id }));
    }
  }
};

//get user and employee id from action
var getUserEmployeeId = function getUserEmployeeId(user) {
  var splitArray = user.split(":");
  var id = splitArray[0];
  var role = splitArray[1];
  if (role && role.toLowerCase() === "citizen") {
    return { userId: id };
  } else {
    return { employeeId: id };
  }
};

// complaint categories success
var complaintCategoriesFetchSucess = function complaintCategoriesFetchSucess(payload) {
  return {
    type: actionTypes.COMPLAINTS_CATEGORIES_FETCH_SUCCESS,
    payload: payload
  };
};

var complaintCategoriesFetchError = function complaintCategoriesFetchError(error) {
  return {
    type: actionTypes.COMPLAINTS_CATEGORIES_FETCH_ERROR,
    error: error
  };
};

// complaints actions
var complaintFetchPending = function complaintFetchPending() {
  return {
    type: actionTypes.COMPLAINTS_FETCH_PENDING
  };
};

var complaintFetchComplete = function complaintFetchComplete(payload) {
  return {
    type: actionTypes.COMPLAINTS_FETCH_COMPLETE,
    payload: payload
  };
};

var complaintFetchError = function complaintFetchError(error) {
  return {
    type: actionTypes.COMPLAINTS_FETCH_ERROR,
    error: error
  };
};

var fetchComplaints = exports.fetchComplaints = function fetchComplaints(queryObject) {
  var hasUsers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch, getState) {
      var payload;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(complaintFetchPending());
              _context.prev = 1;
              _context.next = 4;
              return (0, _api.httpRequest)(_endPoints.COMPLAINT.GET.URL, _endPoints.COMPLAINT.GET.ACTION, queryObject);

            case 4:
              payload = _context.sent;

              checkUsers(dispatch, getState(), payload.actionHistory, hasUsers);
              dispatch(complaintFetchComplete(payload));
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);

              dispatch(complaintFetchError(_context.t0.message));

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 9]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};

var fetchComplaintCategories = exports.fetchComplaintCategories = function fetchComplaintCategories() {
  //Fetching Complaint Categories from MDMS
  var requestBody = {
    MdmsCriteria: {
      tenantId: _common2.default.tenantId,
      moduleDetails: [{
        moduleName: "RAINMAKER-PGR",
        masterDetails: [{
          name: "ServiceDefs"
        }]
      }]
    }
  };

  return function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch) {
      var payload;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _api.httpRequest)(_endPoints.CATEGORY.GET.URL, _endPoints.CATEGORY.GET.ACTION, [], requestBody);

            case 3:
              payload = _context2.sent;

              dispatch(complaintCategoriesFetchSucess(payload));
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);

              dispatch(complaintCategoriesFetchError(_context2.t0.message));

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