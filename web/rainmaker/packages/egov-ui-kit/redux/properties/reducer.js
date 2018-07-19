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
    case actionTypes.PROPERTY_FETCH_COMPLETE:
      var propertiesById = (0, _commons.transformById)(action.payload["Properties"], "propertyId");
      return (0, _extends3.default)({}, state, {
        loading: false,
        error: false,
        errorMessage: "",
        propertiesById: propertiesById
      });
    default:
      return state;
  }
};

exports.default = propertyReducer;