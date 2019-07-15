"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequiredDocuments = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _footer = require("./footer");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  header: {
    color: "gba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "28px",
    paddingLeft: "5px"
  },
  subHeader: {
    color: "gba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "19px"
  },
  docs: {
    color: "rgba(0, 0, 0, 0.6)",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "17px",
    paddingBottom: "24px"
  },
  description: {
    fontFamily: "Roboto",
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "12px",
    fontWeight: 400,
    letterSpacing: "0.6px",
    lineHeight: "14px"
  }
};

var header = (0, _utils.getCommonHeader)({
  labelName: "Required Documents-Fire NOC",
  labelKey: "NOC_REQ_DOCS_HEADER"
}, {
  style: styles.header
});

var generateDocument = function generateDocument(item) {
  // Add header to individual grey cards
  var subHeader = item.code && (0, _utils.getCommonTitle)({
    labelKey: (0, _commons.getTransformedLocale)("NOC_" + item.code + "_HEADING")
  }, {
    style: styles.subHeader
  });

  // Add documents in individual grey cards
  var docs = {};
  if (item.hasOwnProperty("dropdownData")) {
    docs = item.dropdownData.reduce(function (obj, doc) {
      obj[doc.code] = (0, _utils2.getLabelOnlyValue)({
        labelKey: (0, _commons.getTransformedLocale)("NOC_" + doc.code + "_LABEL")
      }, {
        style: styles.docs
      });
      return obj;
    }, {});
  } else if (item.hasOwnProperty("options")) {
    docs = item.options.reduce(function (obj, doc) {
      obj[doc.code] = (0, _utils2.getLabelOnlyValue)({
        labelKey: (0, _commons.getTransformedLocale)("NOC_" + doc.code + "_LABEL")
      }, {
        style: styles.docs
      });
      return obj;
    }, {});
  }

  // Add description to individual grey cards
  var subParagraph = item.description ? (0, _utils.getCommonParagraph)({
    labelKey: (0, _commons.getTransformedLocale)("NOC_" + item.description + "_NOTE")
  }, {
    style: styles.description
  }) : {};

  return (0, _utils2.getCommonGrayCard)({
    subHeader: subHeader,
    break: (0, _utils.getBreak)(),
    docs: (0, _utils.getCommonContainer)((0, _extends3.default)({}, docs)),
    subParagraph: subParagraph
  });
};

var getRequiredDocuments = exports.getRequiredDocuments = function getRequiredDocuments(documents) {
  var doc = documents.map(function (item) {
    return generateDocument(item);
  });
  return (0, _utils.getCommonContainer)({
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        header: header
      }
    },
    documents: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: (0, _extends3.default)({}, doc),
      props: {
        id: "documents-div"
      }
    },
    footer: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        footer: _footer.footer
      }
    }
  }, {
    style: {
      paddingBottom: 75
    }
  });
};