"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Card = require("material-ui/Card");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropertyTaxDetails = function PropertyTaxDetails(_ref) {
  var form = _ref.form;

  return _react2.default.createElement(
    _Card.Card,
    { style: { marginBottom: 200, "background-color": "white" } },
    _react2.default.createElement(_Card.CardHeader, {
      className: "tax-calculation-card-header",
      actAsExpander: true,
      showExpandableButton: true,
      closeIcon: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { className: "pt-tax-calc-details-btn" },
          "View Details"
        )
      ),
      iconStyle: {},
      title: _react2.default.createElement(
        "div",
        { className: "" },
        _react2.default.createElement(
          "div",
          { className: "tax-header-price" },
          _react2.default.createElement(
            "span",
            null,
            "Property Tax Dues"
          ),
          " ",
          _react2.default.createElement(
            "span",
            { className: "pt-total" },
            "1,432.50"
          )
        )
      )
    }),
    _react2.default.createElement(
      _Card.CardText,
      { expandable: true },
      _react2.default.createElement(
        "div",
        { className: "fare-section" },
        _react2.default.createElement(
          "div",
          { className: "pt-rf-detailed-bill" },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "pt-rf-detailed-bill-text col-md-6 col-lg-6" },
              "Detailed Bill"
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-rf-detailed-bill-text col-md-6 col-lg-6" },
              "Due Date: 20/05/2018"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "pt-rf-detailed-bill-table" },
            _react2.default.createElement(
              "div",
              { className: "pt-rf-detailed-bill-points" },
              _react2.default.createElement(
                "span",
                { className: "" },
                "Property Tax"
              ),
              _react2.default.createElement(
                "span",
                { className: "pt-rf-price" },
                "1432.50"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-rf-detailed-bill-points" },
              _react2.default.createElement(
                "span",
                { className: "" },
                "Fire Cess (10% of property tax)"
              ),
              _react2.default.createElement(
                "span",
                { className: "pt-rf-price" },
                "103.20"
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-rf-detailed-bill-points" },
              _react2.default.createElement(
                "span",
                { className: "" },
                "Rebate (Paid before 20/05/2018)"
              ),
              _react2.default.createElement(
                "span",
                { className: "pt-rf-price" },
                "-103.20"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "pt-rf-detailed-bill-total" },
            _react2.default.createElement(
              "span",
              { className: "" },
              "Total"
            ),
            _react2.default.createElement(
              "span",
              { className: "pt-rf-price" },
              "1432.50"
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "date-details" },
          _react2.default.createElement(
            "span",
            { className: "header" },
            "Dates"
          ),
          _react2.default.createElement(
            "ul",
            null,
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "span",
                null,
                "Due Date"
              ),
              _react2.default.createElement(
                "span",
                null,
                "01-01-2019"
              )
            ),
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "span",
                null,
                "Payment Date"
              ),
              _react2.default.createElement(
                "span",
                null,
                "01-01-2019"
              )
            ),
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "span",
                null,
                "Last Date for Rebate (20% of PT)"
              ),
              _react2.default.createElement(
                "span",
                null,
                "01-01-2019"
              )
            ),
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "span",
                null,
                "Penalty (20% of PT) applied from"
              ),
              _react2.default.createElement(
                "span",
                null,
                "01-01-2019"
              )
            ),
            _react2.default.createElement(
              "li",
              null,
              _react2.default.createElement(
                "span",
                null,
                "Interest (18% p.a. daily) applied from"
              ),
              _react2.default.createElement(
                "span",
                null,
                "01-01-2019"
              )
            )
          )
        )
      )
    )
  );
};

exports.default = PropertyTaxDetails;