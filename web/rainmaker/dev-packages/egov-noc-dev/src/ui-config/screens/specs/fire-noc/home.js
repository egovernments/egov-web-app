import React from "react";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";

const header = getCommonHeader({
  labelName: "Fire Noc",
  labelKey: "Fire Noc"
});

const cardItems = [
  {
    label: {
      labelKey: "NOC_APPLY",
      labelName: "Apply for Fire Noc"
    },
    icon: <FireNocIcon />,
    route: "apply"
  },
  {
    label: {
      labelKey: "NOC_MY_APPLICATIONS",
      labelName: "My Applications"
    },
    icon: <MyApplicationIcon />,
    route: "my-applications"
  }
];

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  // beforeInitScreen: (action, state, dispatch) => {
  //   fetchData(action, state, dispatch);
  //   return action;
  // },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        },
        listCard: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-noc",
          componentPath: "HowItWorks"
        }
      }
    }
    // cityPickerDialog: {
    //   componentPath: "Dialog",
    //   props: {
    //     open: false,
    //     maxWidth: "md"
    //   },
    //   children: {
    //     dialogContent: {
    //       componentPath: "DialogContent",
    //       props: {
    //         style: { minHeight: "180px", minWidth: "365px" }
    //       },
    //       children: {
    //         popup: cityPicker
    //       }
    //     }
    //   }
    // }
  }
};

export default tradeLicenseSearchAndResult;
