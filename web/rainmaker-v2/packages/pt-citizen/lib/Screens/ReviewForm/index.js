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

var _components = require("components");

var _PropertyAddress = require("./components/PropertyAddress");

var _PropertyAddress2 = _interopRequireDefault(_PropertyAddress);

var _AssessmentInfo = require("./components/AssessmentInfo");

var _AssessmentInfo2 = _interopRequireDefault(_AssessmentInfo);

var _OwnerInfo = require("./components/OwnerInfo");

var _OwnerInfo2 = _interopRequireDefault(_OwnerInfo);

var _PropertyTaxDetails = require("./components/PropertyTaxDetails");

var _PropertyTaxDetails2 = _interopRequireDefault(_PropertyTaxDetails);

var _propertyAddress = require("./formConfigs/propertyAddress");

var _propertyAddress2 = _interopRequireDefault(_propertyAddress);

var _reactRedux = require("react-redux");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultIconStyle = {
  fill: "#767676",
  width: 18,
  height: 20,
  marginLeft: 26,
  marginRight: 10
};

var PropAddressIcon = _react2.default.createElement(_components.Icon, { style: defaultIconStyle, color: "#ffffff", action: "action", name: "home" });
var AssessmentInfoIcon = _react2.default.createElement(_components.Icon, { style: defaultIconStyle, color: "#ffffff", action: "action", name: "assessment" });
var OwnerInfoIcon = _react2.default.createElement(_components.Icon, { style: defaultIconStyle, color: "#ffffff", action: "social", name: "person" });

var ReviewForm = function (_Component) {
  (0, _inherits3.default)(ReviewForm, _Component);

  function ReviewForm() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ReviewForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReviewForm.__proto__ || Object.getPrototypeOf(ReviewForm)).call.apply(_ref, [this].concat(args))), _this), _this.editIcon = _react2.default.createElement(_components.Icon, { onClick: _this.handleEdit, style: defaultIconStyle, color: "#ffffff", action: "image", name: "edit" }), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ReviewForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          updateIndex = _props.updateIndex,
          stepZero = _props.stepZero,
          stepTwo = _props.stepTwo,
          stepOne = _props.stepOne;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_PropertyAddress2.default, {
          form: _propertyAddress2.default,
          icon: PropAddressIcon,
          editIcon: _react2.default.createElement(_components.Icon, {
            onClick: function onClick() {
              updateIndex(0);
            },
            style: defaultIconStyle,
            color: "#ffffff",
            action: "image",
            name: "edit"
          }),
          component: stepZero
        }),
        _react2.default.createElement(_AssessmentInfo2.default, {
          icon: AssessmentInfoIcon,
          editIcon: _react2.default.createElement(_components.Icon, {
            onClick: function onClick() {
              updateIndex(1);
            },
            style: defaultIconStyle,
            color: "#ffffff",
            action: "image",
            name: "edit"
          }),
          component: stepOne
        }),
        _react2.default.createElement(_OwnerInfo2.default, {
          icon: OwnerInfoIcon,
          editIcon: _react2.default.createElement(_components.Icon, {
            onClick: function onClick() {
              updateIndex(2);
            },
            style: defaultIconStyle,
            color: "#ffffff",
            action: "image",
            name: "edit"
          }),
          form: _propertyAddress2.default,
          component: stepTwo
        }),
        _react2.default.createElement(_PropertyTaxDetails2.default, null)
      );
    }
  }]);
  return ReviewForm;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch({ type: "SET_ROUTE", route: route });
    }
  };
};
exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ReviewForm);