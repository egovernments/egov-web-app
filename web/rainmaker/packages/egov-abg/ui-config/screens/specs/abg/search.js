"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _fireNocApplication = require("./searchResource/fireNocApplication");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _pendingApprovals = require("./searchResource/pendingApprovals");

var _searchResults = require("./searchResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasButton = (0, _commons.getQueryArg)(window.location.href, "hasButton");
//const hasApproval = getQueryArg(window.location.href, "hasApproval");

// import { progressStatus } from "./searchResource/progressStatus";
var enableButton = true;
//enableInbox = hasApproval && hasApproval === "false" ? false : true;
enableButton = hasButton && hasButton === "false" ? false : true;

var header = (0, _utils.getCommonHeader)({
  labelName: "Group Bills",
  labelKey: "NOC_COMMON_NOC"
});
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
        pendingApprovals: _pendingApprovals.pendingApprovals,
        abgSearchCard: _fireNocApplication.abgSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        // progressStatus,
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = abgSearchAndResult;