"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _api = require("egov-ui-kit/utils/api");

var _createReceipt = require("modules/citizen/PropertyTax/common/PaymentStatus/Components/createReceipt");

var _createReceipt2 = _interopRequireDefault(_createReceipt);

var _receiptsPDF = require("modules/citizen/PropertyTax/common/PaymentStatus/Components/receiptsPDF");

var _receiptsPDF2 = _interopRequireDefault(_receiptsPDF);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  customWidth: {
    width: 120,
    backgroundColor: "#F0F0F0",
    height: "25px",
    paddingLeft: "10px"
  },
  iconStyle: { top: "-13px", fill: "#484848", width: "35px" },
  underlineStyle: { display: "none" },
  hintStyle: { color: "#484848", top: 0 }
};

var PartiallyPaiddropDownData = [{
  label: "Download Statement",
  value: "Download Statement"
}, {
  label: "Re-Assess",
  value: "Re-Assess"
}, {
  label: "Complete Payment",
  value: "Complete Payment"
}];

var onSelectFieldChange = function onSelectFieldChange(event, key, payload, history, item) {
  switch (payload) {
    case "Re-Assess":
      localStorage.setItem("draftId", "");
      history && history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);
      break;
    case "Download Statement":
      //Need 1. Property, 2. Property Details, 3. receiptdetails
      // call receiptcreate func
      downloadReceipt(item);
      break;
    case "Complete Payment":
      localStorage.setItem("draftId", "");
      history && history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);
      break;
  }
};

var downloadReceipt = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
    var queryObj, payload, receiptDetails;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queryObj = [{ key: "tenantId", value: item.tenantId }, { key: "consumerNo", value: item.consumerCode }];
            _context.prev = 1;
            _context.next = 4;
            return (0, _api.httpRequest)("/collection-services/receipts/_search", "_search", queryObj, {}, [], { ts: 0 });

          case 4:
            payload = _context.sent;
            receiptDetails = payload && payload.Receipt && (0, _createReceipt2.default)(item.property, item.propertyDetails, payload.Receipt[0], item.localizationLabels);

            receiptDetails && (0, _receiptsPDF2.default)("pt-reciept-citizen", receiptDetails);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 9]]);
  }));

  return function downloadReceipt(_x) {
    return _ref.apply(this, arguments);
  };
}();

var DropDown = function DropDown(_ref2) {
  var history = _ref2.history,
      item = _ref2.item;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _SelectField2.default,
      {
        autoWidth: true,
        className: "pt-action-dropDown",
        hintText: "Select action",
        underlineStyle: styles.underlineStyle,
        iconStyle: styles.iconStyle,
        style: styles.customWidth,
        hintStyle: styles.hintStyle,
        onChange: function onChange(event, key, payload) {
          return onSelectFieldChange(event, key, payload, history, item);
        }
      },
      _react2.default.createElement(_MenuItem2.default, { value: "Download Statement", primaryText: "Download Statement" }),
      _react2.default.createElement(_MenuItem2.default, { value: "Re-Assess", primaryText: "Re-Assess" }),
      item.status === "Partially Paid" && _react2.default.createElement(_MenuItem2.default, { value: "Complete Payment", primaryText: "Complete Payment" })
    )
  );
};

exports.default = DropDown;