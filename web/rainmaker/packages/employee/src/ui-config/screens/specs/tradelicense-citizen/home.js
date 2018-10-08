import {
  getLabel,
  getCommonCard,
  getCommonGrayCard,
  getCommonTitle,
  getCommonSubHeader,
  getCommonParagraph,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";


const screenConfig = {
  uiFramework: "material-ui",
  components: {
    header: getCommonHeader("Trade License"),
    card: getCommonCard({
      conatiner: getCommonContainer({
        grayCard: {
          ...getCommonGrayCard(),
          gridDefination: {
            sm: 4
          }
        },
        rightSection: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          props: {
            style: {
              marginLeft: "16px"
            }
          },
          gridDefination: {
            sm: 6
          },
          children: {
            title: getCommonTitle("Apply for New Trade License"),
            subHeader: getCommonParagraph(
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum has been the industry's standard."
            ),
            button: {
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary"
              }
            }
          }
        }
      })
    }),
    searchResults: {
      uiFramework: "custom-molecules-local",
      componentPath: "Table",
      visible: false,
      props: {
        data: [],
        columns: {
          "Application No": {},
          "License No": {},
          "Trade Name": {},
          "Owner Name": {},
          "Application Date": {}
        },
        title: "Search Results for Trade License Applications"
      }
    }
  },
  beforeInitScreen: (action, state, dispatch) => {
    return action;
  }
};

export default screenConfig;
