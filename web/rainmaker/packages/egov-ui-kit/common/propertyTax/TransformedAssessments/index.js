"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompletedTransformedItems = exports.getTransformedItems = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _commons = require("egov-ui-kit/utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var getTransformedItems = exports.getTransformedItems = function getTransformedItems(propertiesById) {
  return propertiesById && Object.values(propertiesById).reduce(function (acc, curr) {
    var propertyDetail = curr.propertyDetails && curr.propertyDetails.map(function (item) {
      return {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "INR 1300.00", fontSize: "16px", color: "#484848", bold: true, labelStyle: primaryTextLabelStyle }),

        secondaryText: _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(_translationNode2.default, {
            label: item && item.financialYear,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getCommaSeperatedAddress)(curr.address.buildingName, curr.address.street),
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Assessment No.: " + item.assessmentNumber,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          })
        ),
        date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
        status: "Paid",

        receipt: true
      };
    });
    acc = [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(propertyDetail));
    return acc;
  }, []);
};

var getCompletedTransformedItems = exports.getCompletedTransformedItems = function getCompletedTransformedItems(assessmentsByStatus, cities, localizationLabels) {
  return assessmentsByStatus && Object.values(assessmentsByStatus).map(function (item, index) {
    return {
      primaryText: _react2.default.createElement(
        "div",
        { className: "assesment-history-info" },
        _react2.default.createElement(_translationNode2.default, {
          label: "INR " + (0, _get2.default)(item, "receiptInfo.totalAmount"),
          fontSize: "16px",
          color: "#484848",
          bold: true,
          labelStyle: primaryTextLabelStyle
        }),
        _react2.default.createElement(
          "div",
          { style: { height: "auto", marginTop: 0 } },
          _react2.default.createElement(_translationNode2.default, { label: item && item.financialYear, containerStyle: secondaryTextContainer, labelStyle: secondaryTextLabelStyle, color: "#484848" }),
          _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getCommaSeperatedAddress)(item.address, cities),
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          }),
          _react2.default.createElement(_translationNode2.default, {
            label: "Assessment No.: " + item.assessmentNumber,
            containerStyle: secondaryTextContainer,
            labelStyle: secondaryTextLabelStyle,
            color: "#484848"
          })
        )
      ),
      // secondaryText: (
      //   <div style={{ height: "auto", marginTop: 0 }}>
      //     <Label label={item && item.financialYear} containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} color="#484848" />
      //     <Label
      //       label={getCommaSeperatedAddress(item.address, cities)}
      //       containerStyle={secondaryTextContainer}
      //       labelStyle={secondaryTextLabelStyle}
      //       color="#484848"
      //     />
      //     <Label
      //       label={`Assessment No.: ${item.assessmentNumber}`}
      //       containerStyle={secondaryTextContainer}
      //       labelStyle={secondaryTextLabelStyle}
      //       color="#484848"
      //     />
      //   </div>
      //),
      epocDate: item.assessmentDate,
      financialYear: item.financialYear,
      assessmentNo: item.assessmentNumber,
      propertyId: item.propertyId,
      propertyDetails: item,
      property: item.property,
      tenantId: item.tenantId,
      date: (0, _commons.getDateFromEpoch)(item.assessmentDate),
      status: (0, _get2.default)(item, "receiptInfo.status"),
      consumerCode: item.propertyId + ":" + item.assessmentNumber,
      receipt: true,
      localizationLabels: localizationLabels,
      cities: cities
    };
  });
};