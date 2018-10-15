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

var _uiMolecules = require("ui-molecules");

var _uiAtoms = require("ui-atoms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSteps() {
  return ["Blood Donation ?", "Processing", "Testing", "Storage", "Distributing", "Transforming"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Blood Donation ?",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/856x423-process-reg.jpg.img.jpeg",
          title: "Registration"
        }
      });
    case 1:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Processing",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/520x295-health-history.jpg.img.jpeg",
          title: "Health History"
        }
      });
    case 2:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Testing",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/your-donation.jpg.img.jpeg",
          title: "Health History"
        }
      });
    case 3:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Storage",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/your-donation.jpg.img.jpeg",
          title: "Health History"
        }
      });
    case 4:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Distributing",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/your-donation.jpg.img.jpeg",
          title: "Health History"
        }
      });

    default:
      return _react2.default.createElement(_uiMolecules.CardWithMedia, {
        heading: "Transforming",
        cardContent: ["We’ll sign you in and go over basic eligibility.", "You’ll be asked to show ID, such as your driver’s license.", "You’ll read some information about donating blood."],
        cardMedia: {
          src: "https://www.redcrossblood.org/content/dam/redcrossblood/rcb/donate-blood/components/856x423-process-your-donation.jpg/donation-process-refreshments.jpg.img.jpeg",
          title: "Health History"
        }
      });
  }
}

var ProcessOverview = function (_React$Component) {
  (0, _inherits3.default)(ProcessOverview, _React$Component);

  function ProcessOverview() {
    (0, _classCallCheck3.default)(this, ProcessOverview);
    return (0, _possibleConstructorReturn3.default)(this, (ProcessOverview.__proto__ || Object.getPrototypeOf(ProcessOverview)).apply(this, arguments));
  }

  (0, _createClass3.default)(ProcessOverview, [{
    key: "render",
    value: function render() {
      var steps = getSteps();

      return _react2.default.createElement(
        _uiAtoms.Div,
        null,
        _react2.default.createElement(_uiMolecules.StepperNonLinearWithoutAction, {
          steps: steps,
          getStepContent: getStepContent
        })
      );
    }
  }]);
  return ProcessOverview;
}(_react2.default.Component);

ProcessOverview.propTypes = {};

exports.default = ProcessOverview;