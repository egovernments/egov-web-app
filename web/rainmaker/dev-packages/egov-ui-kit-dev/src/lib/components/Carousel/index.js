"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactIdSwiper = require("react-id-swiper");

var _reactIdSwiper2 = _interopRequireDefault(_reactIdSwiper);

var _swiper = require("react-id-swiper/src/styles/css/swiper.css");

var _swiper2 = _interopRequireDefault(_swiper);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarouselUI = function CarouselUI(_ref) {
  var items = _ref.items;

  var params = {
    slidesPerView: 3,
    spaceBetween: -50,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  };
  return _react2.default.createElement(
    _reactIdSwiper2.default,
    params,
    items.map(function (item, index) {
      return _react2.default.createElement(
        "div",
        { key: index },
        item
      );
    })
  );
};

exports.default = CarouselUI;