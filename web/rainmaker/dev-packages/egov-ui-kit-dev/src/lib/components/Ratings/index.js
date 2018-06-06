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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parentStyles = {
  overflow: "hidden",
  position: "relative"
};

var defaultStyles = {
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  display: "block",
  float: "left",
  marginRight: "7px"
};

var getHalfStarStyles = function getHalfStarStyles(color, uniqueness) {
  return "\n    .react-stars-" + uniqueness + ":before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: " + color + ";\n  }";
};

var ReactStars = function (_Component) {
  (0, _inherits3.default)(ReactStars, _Component);

  function ReactStars(props) {
    (0, _classCallCheck3.default)(this, ReactStars);

    // set defaults

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReactStars.__proto__ || Object.getPrototypeOf(ReactStars)).call(this, props));

    props = Object.assign({}, props);

    _this.state = {
      uniqueness: (Math.random() + "").replace(".", ""),
      value: props.value || 0,
      stars: [],
      halfStar: {
        at: Math.floor(props.value),
        hidden: props.half && props.value % 1 < 0.5
      }
    };

    _this.state.config = {
      count: props.count,
      size: props.size,
      char: props.char,
      // default color of inactive star
      color1: props.color1,
      // color of an active star
      color2: props.color2,
      half: props.half,
      edit: props.edit
    };
    return _this;
  }

  (0, _createClass3.default)(ReactStars, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        stars: this.getStars(this.state.value)
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextprops) {
      if (!(0, _lodash2.default)(nextprops, this.props)) {
        this.setState({
          stars: this.getStars(nextprops.value),
          value: nextprops.value,
          halfStar: {
            at: Math.floor(nextprops.value),
            hidden: this.state.config.half && nextprops.value % 1 < 0.5
          }
        });
      }
    }
  }, {
    key: "isDecimal",
    value: function isDecimal(value) {
      return value % 1 !== 0;
    }
  }, {
    key: "getRate",
    value: function getRate() {
      var stars = void 0;
      if (this.state.config.half) {
        stars = Math.floor(this.state.value);
      } else {
        stars = Math.round(this.state.value);
      }
      return stars;
    }
  }, {
    key: "getStars",
    value: function getStars(activeCount) {
      if (typeof activeCount === "undefined") {
        activeCount = this.getRate();
      }
      var stars = [];
      for (var i = 0; i < this.state.config.count; i++) {
        stars.push({
          active: i <= activeCount - 1
        });
      }
      return stars;
    }
  }, {
    key: "mouseOver",
    value: function mouseOver(event) {
      var _state = this.state,
          config = _state.config,
          halfStar = _state.halfStar;

      if (!config.edit) return;
      var index = Number(event.target.getAttribute("data-index"));
      if (config.half) {
        var isAtHalf = this.moreThanHalf(event, config.size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index = index + 1;
        halfStar.at = index;
      } else {
        index = index + 1;
      }
      this.setState({
        stars: this.getStars(index)
      });
    }
  }, {
    key: "moreThanHalf",
    value: function moreThanHalf(event, size) {
      var target = event.target;

      var mouseAt = event.clientX - target.getBoundingClientRect().left;
      mouseAt = Math.round(Math.abs(mouseAt));
      return mouseAt > size / 2;
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      var _state2 = this.state,
          value = _state2.value,
          halfStar = _state2.halfStar,
          config = _state2.config;

      if (!config.edit) return;
      if (config.half) {
        halfStar.hidden = !this.isDecimal(value);
        halfStar.at = Math.floor(this.state.value);
      }
      this.setState({
        stars: this.getStars()
      });
    }
  }, {
    key: "clicked",
    value: function clicked(event) {
      var _state3 = this.state,
          config = _state3.config,
          halfStar = _state3.halfStar;

      if (!config.edit) return;
      var index = Number(event.target.getAttribute("data-index"));
      var value = void 0;
      if (config.half) {
        var isAtHalf = this.moreThanHalf(event, config.size);
        halfStar.hidden = isAtHalf;
        if (isAtHalf) index = index + 1;
        value = isAtHalf ? index : index + 0.5;
        halfStar.at = index;
      } else {
        value = index = index + 1;
      }
      this.setState({
        value: value,
        stars: this.getStars(index)
      });
      this.props.onChange(value);
    }
  }, {
    key: "renderHalfStarStyleElement",
    value: function renderHalfStarStyleElement() {
      var _state4 = this.state,
          config = _state4.config,
          uniqueness = _state4.uniqueness;

      return _react2.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: getHalfStarStyles(config.color2, uniqueness)
        }
      });
    }
  }, {
    key: "renderStars",
    value: function renderStars() {
      var _this2 = this;

      var _state5 = this.state,
          halfStar = _state5.halfStar,
          stars = _state5.stars,
          uniqueness = _state5.uniqueness,
          config = _state5.config;
      var color1 = config.color1,
          color2 = config.color2,
          size = config.size,
          char = config.char,
          half = config.half,
          edit = config.edit;
      var id = this.props.id;

      return stars.map(function (star, i) {
        var starClass = "";
        if (half && !halfStar.hidden && halfStar.at === i) {
          starClass = "react-stars-" + uniqueness;
        }
        var style = Object.assign({}, defaultStyles, {
          color: star.active ? color2 : color1,
          cursor: edit ? "pointer" : "default",
          fontSize: size + "px"
        });
        return _react2.default.createElement(
          "span",
          {
            className: starClass,
            style: style,
            key: i,
            id: id + i,
            "data-index": i,
            "data-forhalf": char,
            onMouseOver: _this2.mouseOver.bind(_this2),
            onMouseMove: _this2.mouseOver.bind(_this2),
            onMouseLeave: _this2.mouseLeave.bind(_this2),
            onClick: _this2.clicked.bind(_this2)
          },
          char
        );
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          id = _props.id;


      return _react2.default.createElement(
        "div",
        { className: className, style: parentStyles, id: id },
        this.state.config.half ? this.renderHalfStarStyleElement() : "",
        this.renderStars()
      );
    }
  }]);
  return ReactStars;
}(_react.Component);

ReactStars.propTypes = {
  className: _propTypes2.default.string,
  edit: _propTypes2.default.bool,
  half: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  count: _propTypes2.default.number,
  char: _propTypes2.default.string,
  size: _propTypes2.default.number,
  color1: _propTypes2.default.string,
  color2: _propTypes2.default.string
};

ReactStars.defaultProps = {
  edit: true,
  half: true,
  value: 0,
  count: 5,
  char: "★",
  size: 15,
  color1: "gray",
  color2: "#f5a623",

  onChange: function onChange() {}
};

exports.default = ReactStars;