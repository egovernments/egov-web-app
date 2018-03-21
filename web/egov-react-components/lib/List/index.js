"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require("material-ui/List");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var baseListContainerStyle = { background: "#fff", padding: "0px" };
var baseListItemStyle = { color: "#484848", fontWeight: 500 };

var List = function List(_ref) {
  var listItemContainer = _ref.listItemContainer,
      onItemClick = _ref.onItemClick,
      _ref$listItemStyle = _ref.listItemStyle,
      listItemStyle = _ref$listItemStyle === undefined ? {} : _ref$listItemStyle,
      _ref$listContainerSty = _ref.listContainerStyle,
      listContainerStyle = _ref$listContainerSty === undefined ? {} : _ref$listContainerSty,
      _ref$items = _ref.items,
      items = _ref$items === undefined ? [] : _ref$items,
      rest = _objectWithoutProperties(_ref, ["listItemContainer", "onItemClick", "listItemStyle", "listContainerStyle", "items"]);

  var renderListItems = function renderListItems(items) {
    return items.map(function (item, index) {
      var nestedItems = item.nestedItems;


      if (listItemStyle && Object.keys(listItemStyle).length) {
        item.style = _extends({}, baseListItemStyle, listItemStyle, item.style);
      }
      if (nestedItems) {
        // recurse over the nested items
        item.nestedItems = renderListItems(nestedItems);
      }

      return _react2.default.createElement(_List.ListItem, _extends({ onClick: function onClick() {
          return onItemClick && onItemClick(item, index);
        }, containerElement: listItemContainer, key: index }, rest, item));
    });
  };

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      _List.List,
      { style: _extends({}, baseListContainerStyle, listContainerStyle) },
      renderListItems(items)
    )
  );
};

List.propTypes = {
  listItemContainer: _propTypes2.default.string,
  listItemStyle: _propTypes2.default.object,
  onItemClick: _propTypes2.default.func,
  listContainerStyle: _propTypes2.default.object,
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    primaryText: _propTypes2.default.node,
    nestedItems: _propTypes2.default.array,
    secondaryText: _propTypes2.default.node,
    leftIcon: _propTypes2.default.element,
    rightIcon: _propTypes2.default.element,
    leftAvatar: _propTypes2.default.element,
    rightAvatar: _propTypes2.default.element,
    initiallyOpen: _propTypes2.default.bool,
    primaryTogglesNestedList: _propTypes2.default.bool,
    style: _propTypes2.default.object
  }))
};

exports.default = List;