"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  marginRight: "13px",
  height: "24px",
  width: "24px"
};

var imageStyles = {
  maxHeight: "100px",
  minHeight: "100px"
};

var mapIconStyle = {
  marginRight: "7px",
  height: "12px",
  width: "14px",
  borderRadius: "50%"
};

var Details = function (_Component) {
  (0, _inherits3.default)(Details, _Component);

  function Details() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Details);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Details.__proto__ || Object.getPrototypeOf(Details)).call.apply(_ref, [this].concat(args))), _this), _this.navigateToComplaintType = function () {
      _this.props.history.push("/complaint-type");
    }, _this.onImageClick = function (source) {
      _this.props.history.push("/image?source=" + source);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Details, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          status = _props.status,
          complaint = _props.complaint,
          applicationNo = _props.applicationNo,
          description = _props.description,
          submittedDate = _props.submittedDate,
          address = _props.address,
          landMark = _props.landMark,
          mapAction = _props.mapAction,
          images = _props.images,
          action = _props.action,
          role = _props.role,
          complaintLoc = _props.complaintLoc;

      var icon = {};
      icon.name = "location";
      icon.style = {
        display: "block"
      };
      var statusKey = "";

      if (status) {
        if (status.toLowerCase() == "open") {
          if (action && action === "reopen") {
            statusKey = "CS_COMMON_REOPENED";
          } else {
            statusKey = "CS_COMMON_SUBMITTED";
          }
        } else if (status.toLowerCase() == "reassignrequested") {
          if (role === "citizen") {
            statusKey = "CS_COMMON_" + status.toUpperCase();
          } else {
            statusKey = "CS_COMMON_CITIZEN_REQUEST_REASSIGN";
          }
        } else {
          statusKey = "CS_COMMON_" + status.toUpperCase();
        }
      }
      var titleKey = complaint && "SERVICEDEFS." + complaint.toUpperCase();

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Card, {
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline" },
              _react2.default.createElement(_components.Icon, { action: "notification", name: "sms-failed", color: "#767676" }),
              " ",
              _react2.default.createElement(_translationNode2.default, { label: "CS_COMPLAINT_DETAILS_COMPLAINT_DETAILS", containerStyle: { marginLeft: "13px" }, labelClassName: "dark-heading" })
            ),
            _react2.default.createElement(
              "div",
              { key: 10, className: "complaint-detail-full-width" },
              _react2.default.createElement(_translationNode2.default, { labelClassName: "dark-heading rainmaker-big-font", label: titleKey }),
              _react2.default.createElement(
                "div",
                { className: "complaint-detail-detail-section-status row" },
                _react2.default.createElement(_translationNode2.default, { className: "col-xs-6  col-sm-4 col-md-2 status-color", label: "CS_COMMON_COMPLAINT_NO" }),
                _react2.default.createElement(_translationNode2.default, {
                  labelStyle: { color: "inherit" },
                  className: "col-xs-6  col-sm-8 col-md-10 no-padding status-result-color",
                  id: "complaint-details-complaint-number",
                  label: applicationNo
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "complaint-detail-detail-section-status row" },
                _react2.default.createElement(_translationNode2.default, { className: "col-xs-6  col-sm-4 col-md-2 status-color", label: "CS_COMPLAINT_DETAILS_CURRENT_STATUS" }),
                _react2.default.createElement(_translationNode2.default, {
                  className: "col-xs-6  col-sm-8 col-md-10 no-padding status-result-color",
                  id: "complaint-details-current-status",
                  labelStyle: { color: "inherit" },
                  label: statusKey
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "complaint-detail-detail-section-status row" },
                _react2.default.createElement(_translationNode2.default, { className: "col-xs-6  col-sm-4 col-md-2 status-color", label: "CS_COMPLAINT_DETAILS_SUBMISSION_DATE" }),
                _react2.default.createElement(_translationNode2.default, {
                  className: "col-xs-6  col-sm-8 col-md-10 no-padding status-result-color",
                  label: submittedDate,
                  id: "complaint-details-submission-date",
                  labelStyle: { color: "inherit" }
                })
              ),
              _react2.default.createElement(
                "div",
                { style: { marginTop: "16px" }, className: "complaint-image-cont" },
                images && images.map(function (image, index) {
                  return image && _react2.default.createElement(
                    "div",
                    { className: "complaint-image-wrapper", key: index },
                    _react2.default.createElement(_components.Image, {
                      style: imageStyles,
                      size: "medium",
                      className: "complaint-image",
                      width: "100%",
                      height: 46,
                      source: image,
                      onClick: function onClick() {
                        return _this2.onImageClick(image);
                      }
                    }),
                    " "
                  );
                })
              ),
              landMark && _react2.default.createElement(
                "div",
                { className: "rainmaker-displayInline", style: { marginTop: 10 } },
                _react2.default.createElement(_components.Icon, { action: "maps", name: "place", style: iconStyle, color: "#969696" }),
                _react2.default.createElement(_translationNode2.default, {
                  label: "Landmark : " + landMark,
                  className: "status-result-color",
                  id: "complaint-details-complaint-location",
                  labelStyle: { color: "inherit" }
                })
              ),
              address && _react2.default.createElement(
                "div",
                { className: "rainmaker-displayInline", style: { marginTop: 10 } },
                _react2.default.createElement(_components.Icon, { action: "maps", name: "place", style: iconStyle, color: "#969696" }),
                _react2.default.createElement(_translationNode2.default, {
                  label: address,
                  className: "status-result-color",
                  id: "complaint-details-complaint-location",
                  labelStyle: { color: "inherit" }
                })
              ),
              _react2.default.createElement(
                "div",
                { style: { marginTop: 10 } },
                mapAction && complaintLoc.lat && _react2.default.createElement(_components.Button, {
                  className: "employee-complaint-summary-mapBtn",
                  primary: true,
                  label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "ES_COMPLAINT_SUMMARY_MAP", color: "#ffffff" }),
                  style: {
                    height: "auto",
                    lineHeight: "auto",
                    minWidth: "inherit"
                  },
                  labelStyle: {
                    padding: "0 12px 0 0 ",
                    letterSpacing: "0.6px",
                    display: "inline-block",
                    height: "22px",
                    lineHeight: "22px"
                  },
                  icon: _react2.default.createElement(_components.Icon, { action: "maps", name: "place", style: mapIconStyle, color: "#ffffff" }),
                  onClick: function onClick(e) {
                    _this2.props.redirectToMap(true);
                  }
                })
              ),
              description && _react2.default.createElement(
                "div",
                { style: { marginTop: "16px" }, className: "rainmaker-displayInline" },
                _react2.default.createElement(_components.Icon, { action: "editor", name: "format-quote", style: iconStyle, color: "#969696" }),
                _react2.default.createElement(_translationNode2.default, {
                  label: description,
                  id: "complaint-details-complaint-description",
                  className: "status-result-color",
                  labelStyle: { color: "inherit" }
                })
              )
            )
          )
        })
      );
    }
  }]);
  return Details;
}(_react.Component);

exports.default = Details;