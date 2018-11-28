let src = process.env.REACT_APP_WS_CONSUMERS;

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
