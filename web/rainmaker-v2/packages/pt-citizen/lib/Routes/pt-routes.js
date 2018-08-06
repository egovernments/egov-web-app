"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncComponent = require("./asyncComponent");

var _asyncComponent2 = _interopRequireDefault(_asyncComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PTHome = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/PTHome").then(function (module) {
    return module.default;
  });
}); // property tax

var AssessPay = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/AssessPay").then(function (module) {
    return module.default;
  });
});
var SearchProperty = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/SearchProperty").then(function (module) {
    return module.default;
  });
});
var CompletedAssessments = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/CompletedAssessments").then(function (module) {
    return module.default;
  });
});
var IncompleteAssessments = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/IncompleteAssessments").then(function (module) {
    return module.default;
  });
});
var MyProperties = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/MyProperties").then(function (module) {
    return module.default;
  });
});
var Property = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/Property").then(function (module) {
    return module.default;
  });
});
var MyReceipts = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/MyReceipts").then(function (module) {
    return module.default;
  });
});
var ViewAllAssessments = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/ViewAllAssessments").then(function (module) {
    return module.default;
  });
});
// const PropertyTaxAssessmentFormWizard = asyncComponent(() =>
//   import("modules/citizen/PropertyTax/AssessmentFormWizard").then((module) => module.default)
// );
var PaymentSuccess = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/PaymentSuccess").then(function (module) {
    return module.default;
  });
});
var PaymentFailure = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/PaymentFailure").then(function (module) {
    return module.default;
  });
});
var ReviewForm = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/ReviewForm").then(function (module) {
    return module.default;
  });
});
// const PropertyAddress = asyncComponent(() =>
//   import("modules/citizen/PropertyTax/AssessmentFormWizard/components/PropertyAddress").then((module) => module.default)
// );

var FormWizard = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/FormWizard").then(function (module) {
    return module.default;
  });
});

var PastPayment = (0, _asyncComponent2.default)(function () {
  return import("modules/citizen/PropertyTax/LinkPastPayments").then(function (module) {
    return module.default;
  });
});

var routes = [
// property tax routes
{
  path: "property-tax",
  component: PTHome,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    isHomeScreen: true,
    hideTitle: true
  }
}, {
  path: "property-tax/assess-pay",
  component: AssessPay,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "Assess & Pay : Select Property",
    hideBackButton: true
  }
}, {
  path: "property-tax/incomplete-assessments",
  component: IncompleteAssessments,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "Incomplete Assessments",
    hideBackButton: true
  }
}, {
  path: "property-tax/completed-assessments",
  component: CompletedAssessments,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "Completed Assessments",
    hideBackButton: true
  }
}, {
  path: "property-tax/my-properties",
  component: MyProperties,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "My Properties",
    hideBackButton: true
  }
}, {
  path: "property-tax/my-properties/property/:propertyId",
  component: Property,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/my-properties/property/view-assessments/:propertyId",
  component: ViewAllAssessments,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/assess-pay/search-property",
  component: SearchProperty,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "Search Property",
    hideBackButton: true
  }
}, {
  path: "property-tax/my-receipts",
  component: MyReceipts,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "My Receipts",
    hideBackButton: true
  }
}, {
  path: "property-tax/payment-success",
  component: PaymentSuccess,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/payment-failure",
  component: PaymentFailure,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/assessment-form",
  component: FormWizard,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    title: "Assessment Form"
  }
}, {
  path: "propert-tax/review-property",
  component: ReviewForm,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true
  }
}, {
  path: "property-tax/past-payment",
  component: PastPayment,
  needsAuthentication: true
}];

exports.default = routes;