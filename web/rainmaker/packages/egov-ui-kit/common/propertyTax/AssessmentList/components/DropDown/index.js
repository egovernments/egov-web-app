"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require("material-ui/MenuItem");

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _api = require("egov-ui-kit/utils/api");

var _createReceipt = require("../../../PaymentStatus/Components/createReceipt");

var _receiptsPDF = require("../../../PaymentStatus/Components/receiptsPDF");

var _receiptsPDF2 = _interopRequireDefault(_receiptsPDF);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

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

var DropDown = function (_Component) {
  (0, _inherits3.default)(DropDown, _Component);

  function DropDown() {
    var _ref,
        _this3 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DropDown.__proto__ || Object.getPrototypeOf(DropDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imageUrl: ""
    }, _this.componentDidMount = function () {
      var item = _this.props.item;

      var tenantId = item && item.tenantId;
      tenantId && _this.convertImgToDataURLviaCanvas(_this.createImageUrl(tenantId), function (data) {
        this.setState({ imageUrl: data });
      }.bind(_this));
    }, _this.convertImgToDataURLviaCanvas = function (url, callback, outputFormat) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    }, _this.createImageUrl = function (tenantId) {
      return "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + tenantId + "/logo.png";
    }, _this.onSelectFieldChange = function (event, key, payload, imageUrl) {
      var _this$props = _this.props,
          generalMDMSDataById = _this$props.generalMDMSDataById,
          citizenUserId = _this$props.citizenUserId,
          history = _this$props.history,
          item = _this$props.item;
      var _this2 = _this,
          downloadReceipt = _this2.downloadReceipt;

      switch (payload) {
        case "Re-Assess":
          localStorage.setItem("draftId", "");
          history && citizenUserId ? history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&uuid=" + citizenUserId + "&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId) : history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);

          break;
        case "Download Receipt":
          //Need 1. Property, 2. Property Details, 3. receiptdetails
          // call receiptcreate func
          downloadReceipt(item, generalMDMSDataById, false, imageUrl);
          break;
        case "Download Citizen Receipt":
          downloadReceipt(item, generalMDMSDataById, false, imageUrl);
          break;
        case "Download Employee Receipt":
          downloadReceipt(item, generalMDMSDataById, true, imageUrl);
          break;
        case "Complete Payment":
          localStorage.setItem("draftId", "");
          history && citizenUserId ? history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&isCompletePayment=true&uuid=" + citizenUserId + "&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId) : history.push("/property-tax/assessment-form?FY=" + item.financialYear + "&assessmentId=" + item.assessmentNo + "&isReassesment=true&isCompletePayment=true&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);

          break;
      }
    }, _this.downloadReceipt = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item, generalMDMSDataById, isEmployeeReceipt, imageUrl) {
        var queryObj, payload, totalAmountToPay, receiptDetails;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryObj = [{ key: "tenantId", value: item.tenantId }, { key: "consumerCode", value: item.consumerCode }];
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.httpRequest)("/collection-services/receipts/_search", "_search", queryObj, {}, [], { ts: 0 });

              case 4:
                payload = _context.sent;
                totalAmountToPay = payload && payload.Receipt && (0, _get2.default)(payload.Receipt[payload.Receipt.length - 1], "Bill[0].billDetails[0].totalAmount");
                receiptDetails = payload && payload.Receipt && (0, _createReceipt.createReceiptDetails)(item.property, item.propertyDetails, payload.Receipt[0], item.localizationLabels, item.cities, totalAmountToPay);

                receiptDetails && (0, _receiptsPDF2.default)("pt-reciept-citizen", receiptDetails, generalMDMSDataById, imageUrl, isEmployeeReceipt);
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);

                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this3, [[1, 10]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DropDown, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var item = this.props.item;
      var imageUrl = this.state.imageUrl;

      var userType = localStorage.getItem("user-info") && JSON.parse(localStorage.getItem("user-info")).type;
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
              return _this4.onSelectFieldChange(event, key, payload, imageUrl);
            }
          },
          userType === "CITIZEN" && _react2.default.createElement(_MenuItem2.default, { value: "Download Receipt", primaryText: "Download Receipt" }),
          userType === "EMPLOYEE" && _react2.default.createElement(_MenuItem2.default, { value: "Download Citizen Receipt", primaryText: "Download Citizen Receipt" }),
          userType === "EMPLOYEE" && _react2.default.createElement(_MenuItem2.default, { value: "Download Employee Receipt", primaryText: "Download Employee Receipt" }),
          item.status !== "Completed" && _react2.default.createElement(_MenuItem2.default, { value: "Re-Assess", primaryText: "Re-Assess" }),
          item.status === "Partially Paid" && _react2.default.createElement(_MenuItem2.default, { value: "Complete Payment", primaryText: "Complete Payment" })
        )
      );
    }
  }]);
  return DropDown;
}(_react.Component);

exports.default = DropDown;