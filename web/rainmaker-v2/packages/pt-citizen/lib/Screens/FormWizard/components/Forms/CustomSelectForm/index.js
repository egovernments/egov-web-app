"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const getDropDownData = (noFloors) => {
//   return [...Array(parseInt(noFloors))].map((item, key) => {
//     return { label: key + 1, value: key + 1 };
//   });
// };

var CustomSelectForm = function CustomSelectForm(_ref) {
  var handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      noFloors = _ref.noFloors;

  var fields = form.fields || {};

  return _react2.default.createElement(
    "div",
    { style: { marginLeft: "30px" } },
    _react2.default.createElement(_field2.default, { fieldKey: "floorName", field: fields.floorName, handleFieldChange: handleFieldChange })
  );
};

exports.default = CustomSelectForm;