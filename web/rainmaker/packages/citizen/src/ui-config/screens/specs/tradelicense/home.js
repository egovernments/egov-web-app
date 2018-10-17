let baseUrl = "https://egov-micro-dev.egovernments.org";
let contextPath = "/employee-tradelicence/mihy-ui-framework/tradelicense-citizen/home";
let src = `${baseUrl}${contextPath}`;
if (process.env.NODE_ENV !== "development") {
  src = `${window.origin}${contextPath}`;
}

const tradeLicenseSearchAndResult = {
  uiFramework: "custom-containers-local",
  name: "home",
  components: {
    iframe: {
      componentPath: "Iframe",
      props: {
        src,
      },
    },
  },
};

export default tradeLicenseSearchAndResult;
