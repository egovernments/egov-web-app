"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("egov-ui-kit/components/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Card = require("egov-ui-kit/components/Card");

var _Card2 = _interopRequireDefault(_Card);

var _Tables = require("egov-ui-kit/components/Tables");

var _Tables2 = _interopRequireDefault(_Tables);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnData = [{ id: "index", numeric: true, disablePadding: false, label: "S.No" }, { id: "name", numeric: false, disablePadding: true, label: "Owner Name" }, { id: "propertyId", numeric: false, disablePadding: false, label: "Property Tax Assessment ID" }, { id: "oldPropertyId", numeric: false, disablePadding: false, label: "Existing Property ID" }, { id: "address", numeric: false, disablePadding: false, label: "Address" }, { id: "action", numeric: false, disablePadding: false, label: "Action" }];

var PropertyTable = function PropertyTable(_ref) {
  var tableData = _ref.tableData,
      onActionClick = _ref.onActionClick;

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_Card2.default, {
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, {
          label: "PT_SEARCH_PROPERTY_TABLE_HEADERS",
          className: "property-search-table-heading",
          labelStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0px",
            textAlign: "center",
            color: "#484848"
          }
        }),
        _react2.default.createElement(_Tables2.default, {
          rowCheckBox: false,
          orderby: "index",
          columnData: columnData,
          rowData: tableData,
          ActionOnRow: _react2.default.createElement(_Button2.default, { className: "search-table-assess-pay-btn", label: "PT_PAYMENT_ASSESS_AND_PAY", onClick: onActionClick })
        })
      )
    })
  );
};

exports.default = PropertyTable;