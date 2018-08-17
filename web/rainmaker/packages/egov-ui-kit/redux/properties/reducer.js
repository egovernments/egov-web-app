"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  loading: false,
  propertiesById: {},
  draftsById: {},
  assessmentsByStatus: {},
  error: false,
  errorMessage: ""
};

var propertyReducer = function propertyReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];
  var type = action.type;


  switch (type) {
    case actionTypes.PROPERTY_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.PROPERTY_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.RECEIPT_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.RECEIPT_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.DRAFT_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.DRAFT_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.FAILED_TRANSACTION_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.SUCCESS_TRANSACTION_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.SUCCESS_TRANSACTION_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.FAILED_TRANSACTION_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.PROPERTY_FETCH_COMPLETE:
      var propertiesById = (0, _commons.transformById)(action.payload["Properties"], "propertyId");
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        propertiesById: propertiesById
      });
    case actionTypes.DRAFT_FETCH_COMPLETE:
      var draftsById = (0, _commons.transformById)(action.payload["drafts"], "id");
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        draftsById: draftsById
      });
    case actionTypes.FAILED_TRANSACTION_FETCH_COMPLETE:
      var failedPayments = (0, _commons.transformById)(action.payload["Transaction"], "txnId");
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        failedPayments: failedPayments
      });
    case actionTypes.SUCCESS_TRANSACTION_FETCH_COMPLETE:
      var successPayments = (0, _commons.transformById)(action.payload["Transaction"], "txnId");
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        successPayments: successPayments
      });
    case actionTypes.RECEIPT_FETCH_COMPLETE:
      var receipts = action.payload["Receipt"];
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        receipts: receipts
      });
    case actionTypes.ASSESSMENT_STATUS_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        errorMessage: ""
      });
    case actionTypes.ASSESSMENT_STATUS_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.ASSESSMENT_STATUS_COMPLETE:
      var assessmentsByStatus = {};
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        assessmentsByStatus: assessmentsByStatus
      });
    default:
      return state;
  }
};

exports.default = propertyReducer;