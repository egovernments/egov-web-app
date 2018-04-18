"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLoadImage = require("react-load-image");

var _reactLoadImage2 = _interopRequireDefault(_reactLoadImage);

var _CircularProgress = require("material-ui/CircularProgress");

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

var _imageLoading = require("assets/images/image-loading.png");

var _imageLoading2 = _interopRequireDefault(_imageLoading);

var _brokenImage = require("assets/images/broken-image.png");

var _brokenImage2 = _interopRequireDefault(_brokenImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Preloader = function Preloader(props) {
  return _react2.default.createElement("img", _extends({ src: _imageLoading2.default }, props));
};

var getImageSource = function getImageSource(imageSource, size) {
  var images = imageSource.split(",");
  if (!images.length) {
    return null;
  }
  switch (size) {
    case "small":
      imageSource = images[2];
      break;
    case "medium":
      imageSource = images[1];
      break;
    case "large":
    default:
      imageSource = images[0];
  }
  return imageSource || images[0];
};

var isImageSourceUrl = function isImageSourceUrl(imageSource) {
  return (/https?/.test(imageSource)
  );
};

var Image = function Image(_ref) {
  var _ref$circular = _ref.circular,
      circular = _ref$circular === undefined ? false : _ref$circular,
      _ref$size = _ref.size,
      size = _ref$size === undefined ? "large" : _ref$size,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      style = _ref.style,
      source = _ref.source,
      height = _ref.height,
      width = _ref.width,
      onClick = _ref.onClick,
      _ref$isLazyLoading = _ref.isLazyLoading,
      isLazyLoading = _ref$isLazyLoading === undefined ? true : _ref$isLazyLoading;

  var classNames = circular ? "img-responsive img-circle" : "img-responsive";
  var imageSource = isImageSourceUrl(source) && getImageSource(source, size) || source;
  classNames = className ? classNames + " " + className : classNames;
  return isLazyLoading ? _react2.default.createElement(
    _reactLoadImage2.default,
    { src: imageSource },
    _react2.default.createElement("img", { className: classNames, style: style, height: height, width: width, onClick: onClick }),
    _react2.default.createElement("img", { src: _brokenImage2.default, className: classNames, style: style, height: height, width: width }),
    _react2.default.createElement(Preloader, { className: classNames, style: style, height: height, width: width })
  ) : _react2.default.createElement("img", { className: classNames, src: imageSource, style: style, height: height, width: width, onClick: onClick });
};

Image.propTypes = {
  source: _propTypes2.default.string,
  circular: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = Image;