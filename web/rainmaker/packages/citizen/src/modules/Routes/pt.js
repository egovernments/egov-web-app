// property tax
import asyncComponent from "./asyncComponent";
// import PTHome from "modules/citizen/PropertyTax/PTHome";
const PTHome = asyncComponent(() => import("modules/citizen/PropertyTax/PTHome").then((module) => module.default));
// import AssessPay from "modules/citizen/PropertyTax/AssessPay";
const AssessPay = asyncComponent(() => import("modules/citizen/PropertyTax/AssessPay").then((module) => module.default));
// import SearchProperty from "modules/citizen/PropertyTax/SearchProperty";
const SearchProperty = asyncComponent(() => import("modules/citizen/PropertyTax/SearchProperty").then((module) => module.default));
// import CompletedAssessments from "modules/citizen/PropertyTax/CompletedAssessments";
const CompletedAssessments = asyncComponent(() => import("modules/citizen/PropertyTax/CompletedAssessments").then((module) => module.default));
// import IncompleteAssessments from "modules/citizen/PropertyTax/IncompleteAssessments";
const IncompleteAssessments = asyncComponent(() => import("modules/citizen/PropertyTax/IncompleteAssessments").then((module) => module.default));
// import MyProperties from "modules/citizen/PropertyTax/MyProperties";
const MyProperties = asyncComponent(() => import("modules/citizen/PropertyTax/MyProperties").then((module) => module.default));
// import Property from "modules/citizen/PropertyTax/Property";
const Property = asyncComponent(() => import("modules/citizen/PropertyTax/Property").then((module) => module.default));
// import MyReceipts from "modules/citizen/PropertyTax/MyReceipts";
const MyReceipts = asyncComponent(() => import("modules/citizen/PropertyTax/MyReceipts").then((module) => module.default));
// import PropertyTaxAssessmentFormWizard from "modules/citizen/PropertyTax/AssessmentFormWizard";
const PropertyTaxAssessmentFormWizard = asyncComponent(() => import("modules/citizen/PropertyTax/AssessmentFormWizard").then((module) => module.default));
// import PaymentSuccess from "modules/citizen/PropertyTax/PaymentSuccess";
const PaymentSuccess = asyncComponent(() => import("modules/citizen/PropertyTax/PaymentSuccess").then((module) => module.default));
// import PaymentFailure from "modules/citizen/PropertyTax/PaymentFailure";
const PaymentFailure = asyncComponent(() => import("modules/citizen/PropertyTax/PaymentFailure").then((module) => module.default));
// import Events from "modules/citizen/PropertyTax/Events";
const Events = asyncComponent(() => import("modules/citizen/PropertyTax/Events").then((module) => module.default));
// import Payments from "modules/citizen/PropertyTax/Payments";
const Payments = asyncComponent(() => import("modules/citizen/PropertyTax/Payments").then((module) => module.default));
// import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
const ReviewForm = asyncComponent(() => import("modules/citizen/PropertyTax/ReviewForm").then((module) => module.default));
// import PropertyAddress from "modules/citizen/PropertyTax/AssessmentFormWizard/components/PropertyAddress";
const PropertyAddress = asyncComponent(() => import("modules/citizen/PropertyTax/AssessmentFormWizard/components/PropertyAddress").then((module) => module.default));
// import FormWizard from "modules/citizen/PropertyTax/FormWizard";
const FormWizard = asyncComponent(() => import("modules/citizen/PropertyTax/FormWizard").then((module) => module.default));

const routes = [
  // property tax routes
  {
    path: "property-tax",
    component: PTHome,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      // title: "PUNJAB MUNICIPAL CORPORATION",
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
    path: "property-tax/property",
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
  {
    path: "property-tax/property-address",
    component: PropertyAddress,
    needsAuthentication: true,
    options: {
      hideFooter: true,
    },
  },
  {
    path: "pt-payment-assessment-form-wizard",
    component: PropertyTaxAssessmentFormWizard,
    needsAuthentication: true,
    options: {
      title: "PT_PAYMENT_ASSESSMENT_FORM_WIZARD",
      hideFooter: true,
    },
  },
  {
    path: "property-tax/assessment-form",
    component: FormWizard,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "propert-tax/review-property",
    component: ReviewForm,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
];

export default routes;
