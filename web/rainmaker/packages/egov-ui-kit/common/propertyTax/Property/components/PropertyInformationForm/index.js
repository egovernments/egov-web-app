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

var _common = require("modules/common");

var _components = require("components");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _GenericForm = require("egov-ui-kit/common/GenericForm");

var _GenericForm2 = _interopRequireDefault(_GenericForm);

var _Forms = require("../../../../PropertyTax/FormWizard/components/Forms");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _reactRedux = require("react-redux");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buttons = {
  button1: "GO BACK",
  button2: "SAVE"
};

var OwnerInfoHOC = (0, _form2.default)({ formKey: "ownerInfo", path: "PropertyTaxPay" })(_Forms.OwnerInformation);

var PropertyAddressHOC = (0, _form2.default)({ formKey: "propertyInformation", path: "PropertyTaxPay" })(_GenericForm2.default);

var PropertyInformation = function (_Component) {
  (0, _inherits3.default)(PropertyInformation, _Component);

  function PropertyInformation() {
    (0, _classCallCheck3.default)(this, PropertyInformation);
    return (0, _possibleConstructorReturn3.default)(this, (PropertyInformation.__proto__ || Object.getPrototypeOf(PropertyInformation)).apply(this, arguments));
  }

  (0, _createClass3.default)(PropertyInformation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var fetchProperties = this.props.fetchProperties;

      fetchProperties([{ key: "ids", value: this.props.match.params.propertyId }, { key: "tenantId", value: this.props.match.params.tenantId }]);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(PropertyAddressHOC, {
            cardTitle: _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline", style: { marginLeft: 12, marginBottom: 10 } },
              _react2.default.createElement(_components.Icon, { action: "action", name: "home" }),
              _react2.default.createElement(_translationNode2.default, { label: "Property Address", containerStyle: { marginLeft: 5 } })
            )
          }),
          _react2.default.createElement(OwnerInfoHOC, {
            checkBox: true,
            cardTitle: _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline", style: { marginLeft: 25, marginBottom: 10 } },
              _react2.default.createElement(_components.Icon, { action: "social", name: "person" }),
              _react2.default.createElement(_translationNode2.default, { label: "Owner Information", containerStyle: { marginLeft: 5 } })
            )
          }),
          _react2.default.createElement(_common.ActionFooter, { label1: buttons.button1, label2: buttons.button2 })
        )
      );
    }
  }]);
  return PropertyInformation;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref, compProps) {
  var properties = _ref.properties;
  var propertiesById = properties.propertiesById;

  var currentProperty = [];
  if (propertiesById.hasOwnProperty(compProps.match.params.propertyId)) {
    currentProperty[0] = propertiesById[compProps.match.params.propertyId];
    currentProperty[0].propertyDetails = (0, _PTCommon.getLatestPropertyDetails)(currentProperty[0].propertyDetails);
  }
  return {
    currentProperty: currentProperty
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions.fetchProperties)(queryObjectProperty));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PropertyInformation);