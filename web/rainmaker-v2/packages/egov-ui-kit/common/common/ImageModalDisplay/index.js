"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageModalDisplay = function ImageModalDisplay(_ref) {
  var history = _ref.history,
      location = _ref.location;

  // very bad way to do it!! temp fix only
  var imageSource = location.search.replace("?source=", "");
  return _react2.default.createElement(_components.ImageModal, { imageSource: imageSource, onCloseClick: function onCloseClick() {
      return history.goBack();
    } });
};

exports.default = ImageModalDisplay;