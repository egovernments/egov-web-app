"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jurisdictionDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _map = require("lodash/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arrayCrawler = function arrayCrawler(arr, n) {
  if (n == 1) {
    return arr.map(function (item) {
      return item.code;
    });
  } else return arr.map(function (item) {
    return arrayCrawler(item.children, n - 1);
  });
};

var jurisdictionDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: (0, _utils.getCommonGrayCard)({
      jnDetailsCardContainer: (0, _utils.getCommonContainer)({
        hierarchy: (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: { labelName: "Hierarchy", labelKey: "HR_HIERARCHY_LABEL" },
          placeholder: {
            labelName: "Select Hierarchy",
            labelKey: "HR_HIERARCHY_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Employee[0].jurisdictions[0].hierarchy",
          sourceJsonPath: "createScreenMdmsData.hierarchyList",
          props: {
            className: "hr-generic-selectfield",
            optionValue: "code",
            optionLabel: "name"
          }
        }), {
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
            var hierarchyList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.hierarchyList", []);

            // GETTING BOUNDARY DATA FOR SELECTED HIERARCHY
            var hierarchyIndex = hierarchyList.findIndex(function (x) {
              return x.code == action.value;
            });
            var selectedBoundaryData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary[" + hierarchyIndex + "].boundary", []);

            // AFTER SELECTION OF HIERARCHY CRAWL BOUNDARY DATA TO GET THE BOUNDARY TYPES
            var boundaryList = [];
            var crawlBoundaryData = selectedBoundaryData;
            while (crawlBoundaryData != null) {
              // console.log(crawlBoundaryData.label);
              boundaryList.push({ value: crawlBoundaryData.label });
              crawlBoundaryData = (0, _get2.default)(crawlBoundaryData, "children[0]", null);
            }
            dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.boundaryList", boundaryList));
            // console.log("!!!!!!!ASD", action, hierarchyIndex);
            // return action;
          }
        }),
        boundaryType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: {
            labelName: "Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_LABEL"
          },
          placeholder: {
            labelName: "Select Boundary Type",
            labelKey: "HR_BOUNDARY_TYPE_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Employee[0].jurisdictions[0].boundary",
          sourceJsonPath: "createScreenMdmsData.boundaryList",
          props: {
            className: "hr-generic-selectfield",
            // data: [
            //   {
            //     value: "Block",
            //     label: "Block"
            //   },
            //   {
            //     value: "Zone",
            //     label: "Zone"
            //   }
            // ],
            optionValue: "value",
            optionLabel: "label"
          }
        }), {
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            // GET COMPLETE EGOV-LOCATION DATA FROM PFO
            var tenantBoundary = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.egov-location.TenantBoundary", []);
            // GET HIERARCHY LIST FROM PFO
            var hierarchyList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.hierarchyList", []);
            // GET BOUNDARY "TYPE" LIST FROM PFO
            var boundaryList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "createScreenMdmsData.boundaryList", []);
            // GET THE CURRENT CARD NUMBER WHICH IS BEING CHANGED
            var cardNumber = action.componentJsonpath.match(/\[[0-9]*\]/g).toString().replace(/^\[|\]$/g, "");
            var selectedHierarchy = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee[0].jurisdictions[" + cardNumber + "].hierarchy", "");
            // GET THE INDEX OF CURRENTLY SELECTED HIERARCHY FROM HIERARCHY LIST
            // SO AS TO GET THE BOUNDARY DATA FOR THAT HIERARCHY FROM tenantBoundary
            var hierarchyIndex = hierarchyList.findIndex(function (x) {
              return x.code == selectedHierarchy;
            });
            // GET THE INDEX / LEVEL OF THE BOUNDARY TYPE SO AS TO CRAWL DATA
            var boundaryIndex = boundaryList.findIndex(function (x) {
              return x.value == action.value;
            });
            // GET THE SPECIFIC DATA WHICH HAS TO BE CRAWLED
            var crawlingData = (0, _get2.default)(tenantBoundary[hierarchyIndex], "boundary.children", []);

            // A RECURSIVE FUNCTION WHICH CRAWLS THE DATA, FLATTENS ARRAY AND RETURNS A LIST
            // OF PROCESSED BOUNDARY DATA.
            var processedBoundaryData = [];
            if (boundaryIndex > 0) {
              processedBoundaryData = arrayCrawler(crawlingData, boundaryIndex).flat(boundaryIndex).map(function (item) {
                return { value: item };
              });
            } else {
              processedBoundaryData = [{
                value: (0, _get2.default)(tenantBoundary[hierarchyIndex], "boundary.code", "")
              }];
            }
            dispatch((0, _actions.prepareFinalObject)("createScreenMdmsData.processedBoundaryDataList", processedBoundaryData));
            // console.log(
            //   arrayCrawler(crawlingData, boundaryIndex).flat(boundaryIndex)
            // );
          }
        }),
        boundary: (0, _extends3.default)({}, (0, _utils.getSelectField)({
          label: { labelName: "Boundary", labelKey: "HR_BOUNDARY_LABEL" },
          placeholder: {
            labelName: "Select Boundary",
            labelKey: "HR_BOUNDARY_PLACEHOLDER"
          },
          required: true,
          jsonPath: "Employee[0].jurisdictions[0].boundaryType",
          sourceJsonPath: "createScreenMdmsData.processedBoundaryDataList",
          props: {
            className: "hr-generic-selectfield",
            // data: [
            //   {
            //     value: "B1",
            //     label: "Block 1"
            //   },
            //   {
            //     value: "B2",
            //     label: "Block 2"
            //   }
            // ],
            optionValue: "value",
            optionLabel: "label"
          }
        }))
      }, {
        style: {
          overflow: "visible"
        }
      })
    }),
    items: [],
    addItemLabel: "ADD JURISDICTION",
    headerName: "Jurisdiction",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].jurisdictions",
    prefixSourceJsonPath: "children.cardContent.children.jnDetailsCardContainer.children"
  },
  type: "array"
};

var jurisdictionDetails = exports.jurisdictionDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Jurisdiction Details",
    labelKey: "HR_JURIS_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  jurisdictionDetailsCard: jurisdictionDetailsCard
});