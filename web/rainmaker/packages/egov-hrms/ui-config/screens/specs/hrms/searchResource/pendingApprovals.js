"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pendingApprovals = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pendingApprovals = exports.pendingApprovals = {
  uiFramework: "custom-atoms",
  componentPath: "Div",
  visible: false,
  children: {
    breakPending: (0, _utils.getBreak)(),
    pendingApprovals: {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-hrms",
      componentPath: "Table",
      props: {
        data: [{
          "Application No": 1234,
          "Trade Name": "Matchbox Plant",
          "Owner Name": "Satinder Singh",
          "Locality/Mohalla": "Gurudwara Mohalla",
          "Payment Date": "12/08/2018",
          "Days Elapsed": "2 Days"
        }, {
          "Application No": 1234,
          "Trade Name": "Matchbox Plant",
          "Owner Name": "Satinder Singh",
          "Locality/Mohalla": "Railway Colony",
          "Payment Date": "12/08/2018",
          "Days Elapsed": "10 Days"
        }, {
          "Application No": 1234,
          "Trade Name": "Matchbox Plant",
          "Owner Name": "Satinder Singh",
          "Locality/Mohalla": "Gurudwara Mohalla",
          "Payment Date": "12/08/2018",
          "Days Elapsed": "2 Days"
        }, {
          "Application No": 1234,
          "Trade Name": "Matchbox Plant",
          "Owner Name": "Satinder Singh",
          "Locality/Mohalla": "Assi Mohalla",
          "Payment Date": "12/08/2018",
          "Days Elapsed": "2 Days"
        }],
        columns: {
          "Application No": {},
          "Trade Name": {},
          "Owner Name": {},
          "Locality/Mohalla": {},
          "Payment Date": {},
          "Days Elapsed": {
            format: function format(value) {
              var color = "";
              if (value.toLowerCase().indexOf("10") !== -1) {
                color = "green";
              } else if (value.toLowerCase().indexOf("2") !== -1) {
                color = "red";
              }
              return _react2.default.createElement(
                "span",
                {
                  style: {
                    color: color,
                    fontSize: "14px",
                    fontWeight: 400
                  }
                },
                value
              );
            }
          }
        },
        title: "Pending for your Approval (4)",
        options: {
          filterType: "dropdown",
          responsive: "stacked",
          selectableRows: false
        }
      }
    }
  }
};