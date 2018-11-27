"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

var _commons = require("egov-ui-kit/utils/commons");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeServiceWithActions = function mergeServiceWithActions(payload) {
  return payload && payload.actionHistory && payload.actionHistory.reduce(function (result, item, index) {
    if (!(0, _isEmpty2.default)(item) && !(0, _isEmpty2.default)(item.actions)) {
      result.push((0, _extends3.default)({}, payload.services[index], {
        actions: item.actions
      }));
    }
    return result;
  }, []);
};

var intialState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
  categoriesById: {},
  order: ""
};

var complaintsReducer = function complaintsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments[1];
  var type = action.type,
      overWrite = action.overWrite;


  switch (type) {
    case actionTypes.COMPLAINTS_FETCH_PENDING:
      return (0, _extends3.default)({}, state, {
        loading: true,
        error: false,
        fetchSuccess: false,
        errorMessage: ""
      });
    case actionTypes.COMPLAINTS_FETCH_COMPLETE:
      var complaintsById = (0, _commons.transformById)(mergeServiceWithActions(action.payload), "serviceRequestId");
      return (0, _extends3.default)({}, state, {
        loading: false,
        fetchSuccess: true,
        byId: overWrite ? (0, _extends3.default)({}, complaintsById) : (0, _extends3.default)({}, state.byId, complaintsById)
      });
    case actionTypes.COMPLAINTS_FETCH_ERROR:
      return (0, _extends3.default)({}, state, {
        loading: false,
        fetchSuccess: true,
        error: true,
        errorMessage: action.error
      });
    case actionTypes.COMPLAINTS_CATEGORIES_FETCH_SUCCESS:
      var categoriesById = (0, _commons.transformById)(action.payload.MdmsRes["RAINMAKER-PGR"].ServiceDefs, "serviceCode");
      return (0, _extends3.default)({}, state, {
        loading: false,
        categoriesById: (0, _extends3.default)({}, state.categoriesById, categoriesById)
      });
    case actionTypes.COMPLAINTS_SORT_ORDER:
      return (0, _extends3.default)({}, state, {
        loading: false,
        order: action.order
      });

    case actionTypes.COMPLAINTS_SEND_MESSAGE:
      if (action.jsonPath === "") {
        return (0, _extends3.default)({}, state, {
          loading: false,
          ShareMetaData: action.message
        });
      }
      if (action.jsonPath === "ShareMetaData.shareMedia") {
        return (0, _extends3.default)({}, state, {
          loading: false,
          ShareMetaData: (0, _extends3.default)({}, state.ShareMetaData, {
            shareMedia: action.message
          })
        });
      }
      if (action.jsonPath === "ShareMetaData.shareContent.to") {
        var shareCont = state.ShareMetaData.shareContent;
        shareCont.map(function (elem) {
          elem.to = action.message;
        });
        return (0, _extends3.default)({}, state, {
          loading: false,
          ShareMetaData: (0, _extends3.default)({}, state.ShareMetaData, {
            shareContent: shareCont
          })
        });
      }

    case actionTypes.SHARE_CONTACT:
      if (action.jsonPath === "") {
        return (0, _extends3.default)({}, state, {
          loading: false,
          Contact: action.data
        });
      } else {
        (0, _set2.default)(state, action.jsonPath, action.data);
        return state;
      }
    default:
      return state;
  }
};

exports.default = complaintsReducer;