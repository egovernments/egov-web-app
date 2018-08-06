"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var titleStyle = {
  display: "flex",
  alignItems: "center"
};

var getTitle = function getTitle(length) {
  return _react2.default.createElement(
    "div",
    { className: "pt-ownerinfo-title", style: titleStyle },
    _react2.default.createElement(
      "span",
      null,
      _react2.default.createElement(_components.Icon, { action: "social", name: "person" })
    ),
    _react2.default.createElement(
      "span",
      { style: { marginLeft: 4 } },
      "Owner-",
      length
    )
  );
};

var MultipleOwnerInfoHOC = function MultipleOwnerInfoHOC(_ref) {
  var _handleRemoveOwner = _ref.handleRemoveOwner,
      addOwner = _ref.addOwner,
      ownerDetails = _ref.ownerDetails,
      disabled = _ref.disabled;
  return _react2.default.createElement(
    "div",
    null,
    ownerDetails.map(function (Data, index) {
      return _react2.default.createElement(Data.Component, {
        key: index,
        cardTitle: getTitle(index + 1),
        deleteBtn: ownerDetails.length > 1,
        handleRemoveOwner: function handleRemoveOwner(formId, formKey) {
          _handleRemoveOwner(formId, formKey);
        },
        formId: Data.index,
        disabled: disabled
      });
    }),
    _react2.default.createElement(
      "div",
      { className: "pt-add-owner-btn", onClick: addOwner },
      "+ Add Owner"
    )
  );
};

exports.default = MultipleOwnerInfoHOC;