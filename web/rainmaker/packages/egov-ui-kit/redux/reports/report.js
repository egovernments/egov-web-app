'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultState = {
  showTable: false,
  metaData: {},
  reportResult: {},
  flag: 0,
  searchParams: [],
  tableSelectionData: [],
  reportHistory: [],
  reportIndex: 0
};

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments[1];

  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return (0, _extends3.default)({}, state, {
        searchParams: action.searchParams
      });

    case 'PUSH_REPORT_HISTORY':
      var current = (0, _extends3.default)({}, state);
      if (_lodash2.default.findIndex(current.reportHistory, {
        reportName: action.reportData.reportName
      }) != -1) {
        var index = _lodash2.default.findIndex(current.reportHistory, {
          reportName: action.reportData.reportName
        });
        current.reportHistory[index] = action.reportData;
        current.reportIndex = current.reportHistory.length;
      } else {
        current.reportHistory.push(action.reportData);
        current.reportIndex = current.reportIndex + 1;
      }
      return current;

    case 'CLEAR_REPORT_HISTORY':
      return (0, _extends3.default)({}, state, {
        reportHistory: [],
        reportIndex: 0
      });

    case 'INCREASE_REPORT_INDEX':
      return (0, _extends3.default)({}, state, {
        reportIndex: state.reportIndex + 1
      });

    case 'DECREASE_REPORT_INDEX':
      return (0, _extends3.default)({}, state, {
        reportIndex: state.reportIndex - 1
      });

    case 'SET_META_DATA':
      return (0, _extends3.default)({}, state, {
        metaData: (0, _extends3.default)({}, state.metaData, action.metaData)
        // Object.assign(state.metaData,action.metaData)
      });

    case 'SET_REPORT_RESULT':
      return (0, _extends3.default)({}, state, {
        reportResult: action.reportResult
      });

    case 'SHOW_TABLE':
      return (0, _extends3.default)({}, state, {
        showTable: action.state
      });

    case 'SET_FLAG':
      return (0, _extends3.default)({}, state, {
        flag: action.flag
      });

    case 'SET_TABLE_SELECTION_DATA':
      return (0, _extends3.default)({}, state, {
        tableSelectionData: action.tableSelectionData
      });

    default:
      return state;
  }
};