import asyncComponent from "./asyncComponent";

const PTHome = asyncComponent(() =>
  import("../Screens/PTHome").then(module => module.default)
);
const SearchProperty = asyncComponent(() =>
  import("../Screens/SearchProperty").then(
    module => module.default
  )
);
const Property = asyncComponent(() =>
  import("egov-ui-kit/common/propertyTax/Property").then(
    module => module.default
  )
);
const FormWizard = asyncComponent(() =>
  import("../Screens/FormWizard").then(
    module => module.default
  )
);
const PaymentSuccess = asyncComponent(() =>
  import("../Screens/PaymentSuccess").then(
    module => module.default
  )
);
const PaymentFailure = asyncComponent(() =>
  import("../Screens/PaymentFailure").then(
    module => module.default
  )
);
const PropertyInformationForm = asyncComponent(() =>
  import("../Screens/PropertyEditForm").then(
    module => module.default
  )
);
const routes = [
  // property tax routes
  {
    path: "property-tax",
    component: PTHome,
    needsAuthentication: true,
    options: {
      title: "Property Tax",
      hideFooter: true
      // hideBackButton: true,
      // isHomeScreen: true,
    }
  },
  {
    path: "property-tax/search-property",
    component: SearchProperty,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "Search Property"
      // hideBackButton: true,
    }
  },
  {
    path: "property-tax/property/:propertyId/:tenantId",
    component: Property,
    needsAuthentication: true,
    options: {
      hideFooter: true
      // hideBackButton: true,
    }
  },

  {
    path: "property-tax/assessment-form",
    component: FormWizard,
    needsAuthentication: true,
    options: {
      hideFooter: true
      // hideBackButton: true,
    }
  },
  {
    path:
      "property-tax/payment-success/:propertyId/:tenantId/:assessmentId/:assessmentYear",
    component: PaymentSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      hideTitle: true
    }
  },
  {
    path:
      "property-tax/payment-failure/:propertyId/:tenantId/:assessmentNumber/:assessmentYear",
    component: PaymentFailure,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      hideTitle: true
    }
  },
  {
    path: "property-tax/property/:propertyId/:tenantId/edit-property",
    component: PropertyInformationForm,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      hideTitle: true
    }
  }
];

export default routes;
