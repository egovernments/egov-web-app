import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getCommonParagraph,
  getLabel
} from "mihy-ui-framework/ui-config/screens/specs/utils";
// import tradeLicenseSearchAndResult from "../tradelicence/search";
import { showCityPicker } from "../utils";
import { searchResults } from "./citizenSearchResource/citizenSearchResults";
import { fetchData } from "./citizenSearchResource/citizenFunctions";
import { cityPicker } from "./citypicker";
import { prepareFinalObject as pFO } from "mihy-ui-framework/ui-redux/screen-configuration/actions";

const header = getCommonHeader({
  labelName: "Trade License",
  labelKey: "TL_COMMON_TL"
});

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    process.env.NODE_ENV === "development"
      ? dispatch(
          pFO("citiesByModule", {
            TL: {
              module: "TL",
              code: "TL",
              tenants: [
                {
                  code: "pb.jalandhar"
                },
                {
                  code: "pb.nawanshahr"
                },
                {
                  code: "pb.amritsar"
                }
              ]
            }
          })
        )
      : null;

    fetchData(action, state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          children: {
            card: getCommonCard({
              applicationSuccessContainer: getCommonContainer({
                icon: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "book",
                    variant: "outlined",
                    style: {
                      fontSize: "110px",
                      width: 120,
                      height: 100,
                      color: "rgba(0, 0, 0, 0.6)",
                      marginLeft: -22
                    }
                  }
                },
                body: {
                  uiFramework: "custom-atoms",
                  componentPath: "Div",
                  children: {
                    header: getCommonHeader({
                      labelName: "Apply for New Trade License",
                      labelKey: "TL_COMMON_APPL_NEW_LICe"
                    }),
                    break: getBreak(),
                    // paragraph: getCommonParagraph({
                    //   labelName:
                    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
                    // }),
                    applyButton: {
                      componentPath: "Button",
                      props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                          width: "200px",
                          height: "48px",
                          marginRight: "40px"
                        }
                      },
                      children: {
                        collectPaymentButtonLabel: getLabel({
                          labelName: "APPLY",
                          labelKey: "TL_APPLY"
                        })
                      },
                      // onClickDefination: {
                      //   action: "page_change",
                      //   path: "/mihy-ui-framework/tradelicense-citizen/apply"
                      // },
                      onClickDefination: {
                        action: "condition",
                        callBack: showCityPicker
                      },
                      roleDefination: {
                        rolePath: "user-info.roles",
                        roles: ["CITIZEN"]
                      }
                    }
                  }
                }
              })
            }),
            break: getBreak(),
            searchResults: searchResults
          }
        }
      }
    },
    cityPickerDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "md"
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            style: { minHeight: "320px", minWidth: "365px" }
          },
          children: {
            popup: cityPicker
          }
        }
      }
    }
  }
};

export default tradeLicenseSearchAndResult;
