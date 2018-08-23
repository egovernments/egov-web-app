"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("../GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DuplicateCard = [];

var DuplicateCardsHOC = function (_React$Component) {
  (0, _inherits3.default)(DuplicateCardsHOC, _React$Component);

  function DuplicateCardsHOC(props) {
    (0, _classCallCheck3.default)(this, DuplicateCardsHOC);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DuplicateCardsHOC.__proto__ || Object.getPrototypeOf(DuplicateCardsHOC)).call(this, props));

    _this.setFormContent = function () {
      var Comp = (0, _form2.default)({ formKey: _this.props.formKey, path: "PropertyTaxPay", makeCopy: true })(_GenericForm2.default);
      return _react2.default.createElement(Comp, null);
    };

    _this.state = {
      DuplicateCard: []
    };
    return _this;
  }

  (0, _createClass3.default)(DuplicateCardsHOC, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var formKey = this.props.formKey;

      this.setState({
        DuplicateCard: this.setFormContent()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var DuplicateCard = this.state.DuplicateCard;

      return _react2.default.createElement(
        "div",
        null,
        [].concat((0, _toConsumableArray3.default)(DuplicateCard))
      );
    }
  }]);
  return DuplicateCardsHOC;
}(_react2.default.Component);

exports.default = DuplicateCardsHOC;