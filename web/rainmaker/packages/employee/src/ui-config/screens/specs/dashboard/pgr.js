let contextPath = "/dashboard";
let src = process.env.REACT_APP_PGR_DASHBOARD;
// console.log(process.env);
// let src = "";
// if (process.env.NODE_ENV !== "development") {
//   src = `${window.location.origin}${contextPath}`;
// }

const dashboard = {
  uiFramework: "custom-containers-local",
  name: "search",
  components: {
    iframe: {
      componentPath: "Iframe",
      props: {
        src,
      },
    },
  },
};

export default dashboard;
