"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _fireNocApplication = require("./searchResource/fireNocApplication");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _searchResults = require("./searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Group Bills",
  labelKey: "NOC_COMMON_NOC"
});
// import { pendingApprovals } from "./searchResource/pendingApprovals";
// import { progressStatus } from "./searchResource/progressStatus";


var abgSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header)
          }
        },
        abgSearchCard: _fireNocApplication.abgSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        // progressStatus,
        searchResults: _searchResults.searchResults,
        breakAfterSearchResults: (0, _utils.getBreak)(),
        mergeDownloadButton: _fireNocApplication.mergeDownloadButton
      }
    }
  }
};

exports.default = abgSearchAndResult;