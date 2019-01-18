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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactResponsiveCarousel = require("react-responsive-carousel");

var _Div = require("../../ui-atoms/HtmlElements/Div");

var _Div2 = _interopRequireDefault(_Div);

var _carouselMin = require("react-responsive-carousel/lib/styles/carousel.min.css");

var _carouselMin2 = _interopRequireDefault(_carouselMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyCarousel = function (_Component) {
  (0, _inherits3.default)(MihyCarousel, _Component);

  function MihyCarousel() {
    (0, _classCallCheck3.default)(this, MihyCarousel);
    return (0, _possibleConstructorReturn3.default)(this, (MihyCarousel.__proto__ || Object.getPrototypeOf(MihyCarousel)).apply(this, arguments));
  }

  (0, _createClass3.default)(MihyCarousel, [{
    key: "render",
    value: function render() {
      var items = this.props.items;

      return _react2.default.createElement(
        _reactResponsiveCarousel.Carousel,
        { showThumbs: false },
        items.map(function (item, key) {
          return _react2.default.createElement(
            _Div2.default,
            { key: key },
            _react2.default.createElement("img", { src: item.src }),
            _react2.default.createElement(
              "p",
              { className: "legend" },
              item.legend
            )
          );
        })
      );
    }
  }]);
  return MihyCarousel;
}(_react.Component);

exports.default = MihyCarousel;