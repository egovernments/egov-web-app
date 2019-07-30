import { getCommonHeader, getLabel, getBreak } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { searchResults, searchApiCall } from "./searchResults";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const pageResetAndChange = (state, dispatch) => {
  // dispatch(prepareFinalObject("Licenses", [{ licenseType: "PERMANENT" }]));
  dispatch(setRoute("/notifications/create"));
};

const header = getCommonHeader({
  labelName: "Public Message Notice",
  labelKey: "EVENTS_PUBLIC_MESSAGE_NOTICE_HEADER",
});
const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "search",
  beforeInitScreen: (action, state, dispatch) => {
    searchApiCall(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "search",
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 6,
              },
              ...header,
            },
            newApplicationButton: {
              componentPath: "Button",
              gridDefination: {
                xs: 12,
                sm: 6,
                align: "right",
              },
              visible: enableButton,
              props: {
                variant: "contained",
                color: "primary",
                style: {
                  color: "white",
                  borderRadius: "2px",
                  width: "250px",
                  height: "48px",
                },
              },

              children: {
                plusIconInsideButton: {
                  uiFramework: "custom-atoms",
                  componentPath: "Icon",
                  props: {
                    iconName: "add",
                    style: {
                      fontSize: "24px",
                    },
                  },
                },

                buttonLabel: getLabel({
                  labelName: "NEW PUBLIC MESSAGE",
                  labelKey: "NEW_PUBLIC_MESSAGE_BUTTON_LABEL",
                }),
              },
              onClickDefination: {
                action: "condition",
                callBack: (state, dispatch) => {
                  pageResetAndChange(state, dispatch);
                },
              },
              roleDefination: {
                rolePath: "user-info.roles",
                roles: ["TL_CEMP"],
              },
            },
          },
        },
        breakAfterSearch: getBreak(),
        searchResults,
      },
    },
  },
};

export default tradeLicenseSearchAndResult;
