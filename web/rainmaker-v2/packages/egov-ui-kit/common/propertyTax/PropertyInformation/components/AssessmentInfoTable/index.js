"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _Receipt = require("egov-ui-kit/components/Receipt");

var _Receipt2 = _interopRequireDefault(_Receipt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssessmentInfoTable = function AssessmentInfoTable(_ref) {
  var items = _ref.items,
      tableHeaderItems = _ref.tableHeaderItems;

  return _react2.default.createElement(
    "div",
    { className: "clearfix", style: { marginBottom: 15 } },
    _react2.default.createElement(
      "div",
      { style: { marginTop: -5 } },
      _react2.default.createElement(_Receipt2.default, { receiptItems: tableHeaderItems })
    ),
    _react2.default.createElement(
      "div",
      { className: "col-sm-12 col-xs-12", style: { marginTop: -10 } },
      _react2.default.createElement(
        "div",
        { className: "custom-table-pt-container table-responsive" },
        _react2.default.createElement(
          "table",
          { className: "custom-table-pt table table-bordered" },
          _react2.default.createElement(
            "thead",
            null,
            _react2.default.createElement(
              "tr",
              { className: "active" },
              items.header.map(function (header, index) {
                return _react2.default.createElement(
                  "th",
                  { key: index },
                  header
                );
              })
            )
          ),
          _react2.default.createElement(
            "tbody",
            null,
            items.values.map(function (value, index) {
              return _react2.default.createElement(
                "tr",
                { key: index },
                value.value.map(function (nestedValue, nestedIndex) {
                  return _react2.default.createElement(
                    "td",
                    { key: nestedIndex },
                    nestedValue
                  );
                })
              );
            })
          )
        )
      )
    )
  );
};

exports.default = AssessmentInfoTable;