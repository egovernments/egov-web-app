import {
  getCommonHeader

  //getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader({
  labelName: "",
  labelKey: "UC_COMMON_HEADER"
});

const nusScreen = {
  uiFramework: "material-ui",
  name: "nusScreen",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "nusScreen"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)(
              {
                gridDefination: {
                  xs: 12,
                  sm: 6
                }
              },
              header
            ),
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right"
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px"
                }
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px"
                    }
                  }
                },

                buttonLabel: (0, _utils.getLabel)({
                  labelName: "NEW COLLECTION",
                  labelKey: "UC_SEARCH_RESULTS_NEW_COLLECTION_BUTTON"
                })
              },
              onClickDefination: {
                action: "page_change",
                path:
                  process.env.REACT_APP_SELF_RUNNING === "true"
                    ? "/egov-ui-framework/uc/newCollection"
                    : "/uc/newCollection"
              }
            }
          }
        }
      }
    }
  }
};

export default nusScreen;
