"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InfoTable = function InfoTable(_ref) {
  var items = _ref.items,
      labelParentClass = _ref.labelParentClass,
      valueParentClass = _ref.valueParentClass,
      parentClass = _ref.parentClass;

  return items.map(function (item, index) {
    return _react2.default.createElement(
      "div",
      { key: index, className: parentClass },
      _react2.default.createElement(
        "div",
        { className: labelParentClass },
        _react2.default.createElement(
          "span",
          null,
          item.label
        )
      ),
      _react2.default.createElement("div", { className: valueParentClass, children: item.childElements })
    );
  });
};

InfoTable.propTypes = {
  labelContainer: _propTypes2.default.string,
  valueContainer: _propTypes2.default.string,
  itemContainer: _propTypes2.default.string
};

exports.default = InfoTable;