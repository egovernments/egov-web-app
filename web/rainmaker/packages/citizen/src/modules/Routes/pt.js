// property tax
import asyncComponent from "./asyncComponent";
// import PTHome from "modules/citizen/PropertyTax/PTHome";
const PTHome = asyncComponent(() => import("modules/citizen/PropertyTax/PTHome").then((module) => module.default));
// import AssessPay from "modules/citizen/PropertyTax/AssessPay";
const AssessPay = asyncComponent(() => import("modules/citizen/PropertyTax/AssessPay").then((module) => module.default));
const SearchProperty = asyncComponent(() => import("modules/citizen/PropertyTax/SearchProperty").then((module) => module.default));
const CompletedAssessments = asyncComponent(() => import("modules/citizen/PropertyTax/CompletedAssessments").then((module) => module.default));
const IncompleteAssessments = asyncComponent(() => import("modules/citizen/PropertyTax/IncompleteAssessments").then((module) => module.default));
const MyProperties = asyncComponent(() => import("modules/citizen/PropertyTax/MyProperties").then((module) => module.default));
const Property = asyncComponent(() => import("modules/citizen/PropertyTax/Property").then((module) => module.default));
const MyReceipts = asyncComponent(() => import("modules/citizen/PropertyTax/MyReceipts").then((module) => module.default));
const PropertyTaxAssessmentFormWizard = asyncComponent(() =>
  import("modules/citizen/PropertyTax/AssessmentFormWizard").then((module) => module.default)
);
const PaymentSuccess = asyncComponent(() => import("modules/citizen/PropertyTax/PaymentSuccess").then((module) => module.default));
const PaymentFailure = asyncComponent(() => import("modules/citizen/PropertyTax/PaymentFailure").then((module) => module.default));
const Events = asyncComponent(() => import("modules/citizen/PropertyTax/Events").then((module) => module.default));
const Payments = asyncComponent(() => import("modules/citizen/PropertyTax/Payments").then((module) => module.default));
const ReviewForm = asyncComponent(() => import("modules/citizen/PropertyTax/ReviewForm").then((module) => module.default));
const PropertyAddress = asyncComponent(() =>
  import("modules/citizen/PropertyTax/AssessmentFormWizard/components/PropertyAddress").then((module) => module.default)
);

const FormWizard = asyncComponent(() => import("modules/citizen/PropertyTax/FormWizard").then((module) => module.default));

const PastPayment = asyncComponent(() => import("modules/citizen/PropertyTax/LinkPastPayments").then((module) => module.default));

const routes = [
  // property tax routes
  {
    path: "property-tax",
    component: PTHome,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      isHomeScreen: true,
    },
  },
  {
    path: "property-tax/assess-pay",
    component: AssessPay,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "Assess & Pay : Select Property",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/incomplete-assessments",
    component: IncompleteAssessments,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "Incomplete Assessments",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/completed-assessments",
    component: CompletedAssessments,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "Completed Assessments",
      hideBackButton: true,
    },
  },

  {
    path: "property-tax/my-properties",
    component: MyProperties,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "My Properties",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/my-properties/property/:propertyId",
    component: Property,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/search-property",
    component: SearchProperty,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "Search Property",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/my-receipts",
    component: MyReceipts,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "My Receipts",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/payment-success",
    component: PaymentSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/payment-failure",
    component: PaymentFailure,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
    },
  },
  // {
  //   path: "property-tax/property-address",
  //   component: PropertyAddress,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //   },
  // },
  // {
  //   path: "pt-payment-assessment-form-wizard",
  //   component: PropertyTaxAssessmentFormWizard,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //   },
  // },
  {
    path: "property-tax/assessment-form",
    component: FormWizard,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "Assessment Form",
    },
  },
  {
    path: "propert-tax/review-property",
    component: ReviewForm,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/past-payment",
    component: PastPayment,
    needsAuthentication: true,
  },
];

export default routes;
