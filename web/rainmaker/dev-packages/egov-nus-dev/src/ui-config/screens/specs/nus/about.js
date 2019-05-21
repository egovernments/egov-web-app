import {
     getCommonContent,
    getCommonHeader,
    getCommonContainer,
    getCommonSubHeader
    //getCommonTitle
  } from "egov-ui-framework/ui-config/screens/specs/utils";
 
  const header = getCommonContainer({
    header: getCommonHeader({
      labelName: "About",
      labelKey: "NUS_ABOUT_LABEL"
    }),
    subheader: getCommonSubHeader({
        labelName: "National Urban Stack",
        labelKey: "NUS_ABOUT_COMMON_SUB_HEADER"
      }),

      subheader1: getCommonSubHeader({
        labelName: "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin",
        labelKey: "NUS_ABOUT_COMMON_SUB_HEADER1"
      }),
      
      subheader2: getCommonContent({
        labelName: "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio.",
        labelKey: "NUS_ABOUT_COMMON_SUB_HEADER2"
      }),



  });