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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _OwnerDetails = require("./components/OwnerDetails");

var _OwnerDetails2 = _interopRequireDefault(_OwnerDetails);

var _PropertyAddress = require("./components/PropertyAddress");

var _PropertyAddress2 = _interopRequireDefault(_PropertyAddress);

var _TaxAssessmentDetailsOne = require("./components/TaxAssessmentDetailsOne");

var _TaxAssessmentDetailsOne2 = _interopRequireDefault(_TaxAssessmentDetailsOne);

var _TaxAssessmentDetailsTwo = require("./components/TaxAssessmentDetailsTwo");

var _TaxAssessmentDetailsTwo2 = _interopRequireDefault(_TaxAssessmentDetailsTwo);

var _FullOrPartialExemption = require("./components/FullOrPartialExemption");

var _FullOrPartialExemption2 = _interopRequireDefault(_FullOrPartialExemption);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  display: "inline-block"
};

var activeStepperStyle = {
  width: 20,
  height: 20,
  boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24)",
  backgroundColor: "#fe7a51",
  borderRadius: "50%",
  position: "relative",
  zIndex: 100
};

var defaultStepperStyle = {
  width: 18,
  height: 18
};

var formKey = "propertyTaxAssessment";
var OwnerDetailsHOC = (0, _form2.default)({ formKey: formKey })(_OwnerDetails2.default);
var PropertyAddressHOC = (0, _form2.default)({ formKey: formKey })(_PropertyAddress2.default);
var TaxAssessmentDetailsOneHOC = (0, _form2.default)({ formKey: formKey })(_TaxAssessmentDetailsOne2.default);
var TaxAssessmentDetailsTwoHOC = (0, _form2.default)({ formKey: formKey })(_TaxAssessmentDetailsTwo2.default);
var FullOrPartialExemptionHOC = (0, _form2.default)({ formKey: formKey })(_FullOrPartialExemption2.default);

var AssessmentFormWizard = function (_Component) {
  (0, _inherits3.default)(AssessmentFormWizard, _Component);

  function AssessmentFormWizard(props) {
    (0, _classCallCheck3.default)(this, AssessmentFormWizard);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AssessmentFormWizard.__proto__ || Object.getPrototypeOf(AssessmentFormWizard)).call(this, props));

    _this.getWizardFields = function (index) {
      return function (formFields) {
        var fields = _this.wizardFields[index];
        return fields.reduce(function (wizardFields, fieldKey) {
          var field = formFields[fieldKey];
          wizardFields[fieldKey] = field;
          return wizardFields;
        }, {});
      };
    };

    _this.handleNext = function () {
      var stepIndex = _this.state.stepIndex;

      if (stepIndex < 5) {
        _this.setState({
          stepIndex: stepIndex + 1
        });
      }
    };

    _this.handlePrev = function () {
      var stepIndex = _this.state.stepIndex;

      if (stepIndex > 0) {
        _this.setState({ stepIndex: stepIndex - 1 });
      }
    };

    _this.getStepContent = function (stepIndex, fields) {
      var wizardFields = _this.getWizardFields(stepIndex);
      switch (stepIndex) {
        case 0:
          return {
            component: _react2.default.createElement(OwnerDetailsHOC, { wizardFields: wizardFields }),
            trianglePos: "2%",
            iconName: "person",
            iconAction: "social",
            header: "Owner Details"
          };
        case 1:
          return {
            component: _react2.default.createElement(PropertyAddressHOC, { wizardFields: wizardFields }),
            trianglePos: "25%",
            iconName: "home",
            iconAction: "action",
            header: "Property Address"
          };
        case 2:
          return {
            component: _react2.default.createElement(TaxAssessmentDetailsOneHOC, { wizardFields: wizardFields }),
            trianglePos: "48%",
            iconName: "person",
            iconAction: "social",
            header: "Tax Assessment Details - 1"
          };
        case 3:
          return {
            component: _react2.default.createElement(TaxAssessmentDetailsTwoHOC, { wizardFields: wizardFields }),
            trianglePos: "70%",
            iconName: "person",
            iconAction: "social",
            header: "Tax Assessment Details - 2"
          };
        default:
          return {
            component: _react2.default.createElement(FullOrPartialExemptionHOC, { wizardFields: wizardFields }),
            trianglePos: "93%",
            iconName: "person",
            iconAction: "social",
            header: "Full/ Partial Exemption (if any)"
          };
      }
    };

    var isBackFromMap = sessionStorage.getItem("backFromPTMap");
    _this.state = {
      stepIndex: isBackFromMap ? 1 : 0
    };
    isBackFromMap && sessionStorage.removeItem("backFromPTMap");

    _this.wizardFields = [["name", "fatherHusbandName", "aadharNumber", "mobileNumber", "address"], ["propertyNumber", "colony", "street", "location"], ["propertyType", "plotSize", "floorCount"], ["builtUpArea1", "builtUpArea2"], ["propertcategoryNumber", "referenceId", "proof"]];
    return _this;
  }

  (0, _createClass3.default)(AssessmentFormWizard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var stepIndex = this.state.stepIndex;
      var getStepContent = this.getStepContent;

      var _getStepContent = getStepContent(stepIndex),
          component = _getStepContent.component,
          iconAction = _getStepContent.iconAction,
          header = _getStepContent.header,
          iconName = _getStepContent.iconName,
          trianglePos = _getStepContent.trianglePos;

      var steps = [1, 2, 3, 4, 5].map(function (item, index) {
        return {
          labelChildren: "",
          labelProps: {
            icon: _this2.state.stepIndex === index ? _react2.default.createElement("div", { style: activeStepperStyle }) : _this2.state.stepIndex > index ? _react2.default.createElement(_components.Icon, { style: defaultStepperStyle, color: "#ffffff", action: "custom", name: "check-circle" }) : _react2.default.createElement(_components.Icon, { style: defaultStepperStyle, color: "#ffffff", action: "custom", name: "circle" }),
            style: {
              padding: 0
            },
            iconContainerStyle: {
              padding: 0,
              display: "flex"
            }
          }
        };
      });

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.TimeLine, {
          stepperProps: {
            activeStep: stepIndex,
            style: { background: "rgb(0, 188, 209)", position: "relative", zIndex: 10000, padding: "0 24px" },
            connector: _react2.default.createElement("div", { style: { border: "1px solid #fff", width: "100%", marginLeft: "-2px", marginRight: "4px" } })
          },
          steps: steps,
          horizontal: true
        }),
        _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_components.Card, {
            style: { margin: "24px 8px" },
            textChildren: _react2.default.createElement(
              "div",
              { style: { position: "relative" } },
              _react2.default.createElement("div", { style: { left: trianglePos }, className: "card-triangle" }),
              _react2.default.createElement(
                "div",
                { className: "pt-form-card-header-cont" },
                _react2.default.createElement(_components.Icon, { name: iconName, action: iconAction, style: iconStyle }),
                _react2.default.createElement(_translationNode2.default, {
                  label: header,
                  bold: true,
                  dark: true,
                  labelStyle: { letterSpacing: 0.6 },
                  containerStyle: { display: "inline-block", marginLeft: 16 }
                })
              ),
              component
            )
          }),
          _react2.default.createElement(
            "div",
            { className: "flexbox-container" },
            _react2.default.createElement(
              "div",
              { className: "flex-item" },
              _react2.default.createElement(_components.Button, { onClick: this.handlePrev, fullWidth: true, primary: true, label: "GO BACK" })
            ),
            _react2.default.createElement(
              "div",
              { className: "flex-item" },
              _react2.default.createElement(_components.Button, { onClick: this.handleNext, fullWidth: true, label: "NEXT" })
            )
          )
        )
      );
    }
  }]);
  return AssessmentFormWizard;
}(_react.Component);

exports.default = AssessmentFormWizard;