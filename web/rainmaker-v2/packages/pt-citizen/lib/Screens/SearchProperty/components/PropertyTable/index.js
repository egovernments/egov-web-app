"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnData = [{ id: "index", numeric: true, disablePadding: false, label: "S.No" }, { id: "name", numeric: false, disablePadding: true, label: "Owner Name" }, { id: "propertyId", numeric: false, disablePadding: false, label: "Property Tax Assessment ID" }, { id: "oldPropertyId", numeric: false, disablePadding: false, label: "Old Property ID" }, { id: "address", numeric: false, disablePadding: false, label: "Address" }, { id: "action", numeric: false, disablePadding: false, label: "Action" }];

var PropertyTable = function PropertyTable(_ref) {
  var tableData = _ref.tableData,
      onActionClick = _ref.onActionClick;

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_components.Card, {
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Label, {
          label: "Property Search Result",
          className: "property-search-table-heading",
          labelStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0px",
            textAlign: "left",
            color: "#484848"
          }
        }),
        _react2.default.createElement(_components.TableUi, {
          rowCheckBox: false,
          orderby: "index",
          columnData: columnData,
          rowData: tableData,
          ActionOnRow: _react2.default.createElement(_components.Button, { className: "search-table-assess-pay-btn", label: "Assess & Pay", onClick: onActionClick })
        })
      )
    })
  );
};

exports.default = PropertyTable;