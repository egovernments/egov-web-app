let baseUrl="https://egov-micro-dev.egovernments.org";
let contextPath="/employee-tradelicence/mihy-ui-framework/tradelicence/search";
let src=`${baseUrl}${contextPath}`;
if (process.env.NODE_ENV !== "development") {
  src=`${window.origin}${contextPath}`;
}

const tradeLicenseSearchAndResult = {
  uiFramework: "custom-containers-local",
  name: "search",
  components: {
    iframe: {
      componentPath: "Iframe",
      props: {
        src: "http://localhost:3001/mihy-ui-framework/tradelicence/search",
      },
    },
  },
};

export default tradeLicenseSearchAndResult;
