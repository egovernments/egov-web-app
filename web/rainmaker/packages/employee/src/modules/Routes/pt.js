import asyncComponent from "./asyncComponent";

const PTHome = asyncComponent(() => import("modules/employee/PropertyTax/PTHome").then((module) => module.default));
const SearchProperty = asyncComponent(() => import("modules/employee/PropertyTax/SearchProperty").then((module) => module.default));
const Property = asyncComponent(() => import("modules/employee/PropertyTax/Property").then((module) => module.default));
const FormWizard = asyncComponent(() => import("modules/employee/PropertyTax/FormWizard").then((module) => module.default));
const PaymentSuccess = asyncComponent(() => import("modules/employee/PropertyTax/PaymentSuccess").then((module) => module.default));
const PaymentFailure = asyncComponent(() => import("modules/employee/PropertyTax/PaymentFailure").then((module) => module.default));

const routes = [
  // property tax routes
  {
    path: "property-tax",
    component: PTHome,
    needsAuthentication: true,
    options: {
      title: "Property Tax",
      hideFooter: true,
      hideBackButton: true,
      isHomeScreen: true,
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
    path: "property-tax/property/:propertyId",
    component: Property,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
    },
  },

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

  // {
  //   path: "property-tax/assessment-form",
  //   component: FormWizard,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     hideBackButton: true,
  //     title: "Assessment Form",
  //   },
  // },
  {
    path: "property-tax/payment-success/:propertyId/:tenantId/:assessmentId/:assessmentYear",
    component: PaymentSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      hideTitle: true,
    },
  },
  {
    path: "property-tax/payment-failure/:propertyId/:tenantId/:assessmentNumber/:assessmentYear",
    component: PaymentFailure,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      hideTitle: true,
    },
  },
];

export default routes;
