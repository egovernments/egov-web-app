 
const screenConfig = {
  uiFramework: "material-ui",
  name: "about",
  //  components: {
  //   div: {
  //     uiFramework: "custom-molecules-local",
  //     componentPath: "AboutCard",
         
  //   children: {
  //     headerDiv: {
  //       uiFramework: "custom--molecules-local",
  //       componentPath: "SimpleList",

  //     }
  //   }
  // }


  // }  



  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        div1: {
          uiFramework: "custom-molecules-local",
          componentPath: "AboutCard",
          props:{
            className : ""
          }
         
        },
        div2: {
          uiFramework: "custom-molecules-local",
          componentPath: "SimpleList",
         
        }
      },
     
    }
  }
  

};

export default screenConfig;
   
   
   
   
   
 