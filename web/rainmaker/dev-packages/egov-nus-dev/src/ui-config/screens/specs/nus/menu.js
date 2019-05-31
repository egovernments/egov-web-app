
const screenConfig = {
  uiFramework: "material-ui",
  name: "menu",
  components: {
    div: {
      uiFramework: "custom-molecules-local",
      componentPath: "SimpleTabs",
      props: {
        className: "common-div-css",
        menuItems : [
          {label : "HOME"},
          {label : "ABOUT NUS"},
          {label : "CORE COMPONENTS"},
          {label : "IMPLEMENATION  PLAN"},
          {label : "TESTIMONIALS"},
          {label : "NEWS & GALLERY"},
          {label : "CASE STUDIES"}

        ]
      },
      
    }
   
  }
};

export default screenConfig;