import {
  getCommonCard,
  getTextField,
  getCommonHeader,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCommonSubHeader,
  getCommonParagraph,
  getLabel,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getTenantId, getAccessToken, localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
import { prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, validateFields } from "egov-ui-framework/ui-utils/commons";
import commonConfig from "config/common.js";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import get from "lodash/get";
import set from "lodash/set";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils/index";

const header = getCommonHeader({
  labelName: "Add New Public Message",
  labelKey: "ADD_NEW_PUBLIC_MESSAGE",
});

export const callBackForNext = async (state, dispatch) => {
  const isNative = localStorageGet("isNative");
  const isFormValid = validateFields(
    "components.div.children.createCard.children.createForm.children.cardContent.children.createContainer.children",
    state,
    dispatch,
    "create"
  );
  const eventsData = get(state.screenConfiguration.preparedFinalObject, "events[0]");
  let fromDate = get(eventsData, "eventDetails.fromDate");
  let toDate = get(eventsData, "eventDetails.toDate");
  if (fromDate) {
    fromDate = convertDateToEpoch(fromDate);
    set(eventsData, "eventDetails.fromDate", fromDate);
  }
  if (toDate) {
    toDate = convertDateToEpoch(toDate);
    set(eventsData, "eventDetails.toDate", toDate);
  }
  set(eventsData, "source", isNative ? "MOBILEAPP" : "WEBAPP");
  set(eventsData, "recepient", null);
  set(eventsData, "eventType", "BROADCAST");
  const requestBody = {
    RequestInfo: {
      apiId: "org.egov.pt",
      ver: "1.0",
      ts: 1502890899493,
      action: "asd",
      did: "4354648646",
      key: "xyz",
      msgId: "654654",
      requesterId: "61",
      authToken: getAccessToken(),
    },
    events: [eventsData],
  };
  if (isFormValid) {
    try {
      await httpRequest("post", "/egov-user-event/v1/events/_create", "_create", [], requestBody);
      dispatch(
        setRoute(
          `/notifications/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&FY=${financialYear}&tenantId=${tenantId}`
        )
      );
    } catch (e) {
      toggleSnackbar(true, { labelKey: "Create error" }, "error");
    }
  }
};

const footer = (buttonLabel, callBack) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer",
    },
    children: {
      payButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            minWidth: "200px",
            height: "48px",
            marginRight: "45px",
          },
        },
        children: {
          submitButtonLabel: getLabel(buttonLabel),
          submitButtonIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "keyboard_arrow_right",
            },
          },
        },
        onClickDefination: {
          action: "condition",
          callBack: callBackForNext,
        },
      },
    },
  };
};

export const getMdmsData = async (action, state, dispatch) => {
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants",
            },
          ],
        },
      ],
    },
  };
  try {
    let payload = null;
    payload = await httpRequest("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);
    const localities = get(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.tenant.localities", []);
    if (localities && localities.length > 0) {
      payload.MdmsRes.tenant.localities = localities;
    }
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

export const createForm = getCommonCard({
  createContainer: getCommonContainer({
    ulb: {
      ...getSelectField({
        label: {
          labelName: "ULB",
          labelKey: "EVENTS_ULB_LABEL",
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS",
        },
        optionLabel: "name",
        placeholder: { labelName: "Select City", labelKey: "TL_SELECT_CITY" },
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        jsonPath: "events[0].tenantId",
        required: true,
        props: {
          required: true,
          // disabled: true,
          style: {
            marginBottom: 10,
          },
        },
      }),
    },
    dummyDiv5: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    title: getTextField({
      label: {
        labelName: "Title",
        labelKey: "EVENTS_TITLE_LABEL",
      },
      placeholder: {
        labelName: "Enter message title",
        labelKey: "EVENTS_TITLE_LABEL_PLACEHOLDER",
      },
      required: true,
      jsonPath: "events[0].name",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
    }),
    dummyDiv1: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    comments: getTextField({
      label: {
        labelName: "Message Content",
        labelKey: "EVENTS_COMMENTS_LABEL",
      },
      placeholder: {
        labelName: "Message Content ( Character Length:280)",
        labelKey: "EVENTS_COMMENTS_PLACEHOLDER",
      },
      required: true,
      pattern: "",
      jsonPath: "events[0].description",
      props: {
        multiline: true,
        rows: 6,
        InputProps: {
          disableUnderline: true,
          marginTop: 50,
          style: {
            border: "1px solid #ced4da",
          },
        },
        style: {
          marginBottom: 10,
        },
      },
    }),
    dummyDiv2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    uploadFile: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      children: {
        subheader: getCommonSubHeader(
          {
            labelName: "Attachment",
            labelKey: "EVENTS_ATTACHMENT_LABEL",
          },
          {
            style: {
              fontSize: "12px",
              fontWeight: 500,
              color: "rgba(0, 0, 0, 0.60)",
            },
          }
        ),
        uploadButton: {
          uiFramework: "custom-molecules",
          componentPath: "UploadMultipleFiles",
          gridDefination: {
            xs: 12,
            sm: 6,
          },
          props: {
            maxFiles: 4,
            inputProps: {
              accept: "image/*, .pdf, .png, .jpeg",
            },
            buttonLabel: { labelName: "UPLOAD FILES", labelKey: "EVENTS_UPLOAD_FILE" },
            jsonPath: "events[0].eventDetails.documents",
            maxFileSize: 5000,
          },
        },

        uploadFileInfo: getCommonParagraph(
          {
            labelName: "Only .jpg and .pdf files. 5MB max file size.",
            labelKey: "TL_APPROVAL_UPLOAD_SUBHEAD",
          },
          {
            style: {
              fontSize: 12,
              marginBottom: 10,
              marginTop: 5,
              color: "rgba(0, 0, 0, 0.6000000238418579)",
            },
          }
        ),
      },
    },
    dummyDiv3: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    fromDate: {
      ...getDateField({
        label: {
          labelName: "Display From Date",
          labelKey: "EVENTS_FROM_DATE_LABEL",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "events[0].eventDetails.fromDate",
        props: {
          // inputProps: {
          //   min: getTodaysDateInYMD(),
          //   max: getFinancialYearDates("yyyy-mm-dd").endDate,
          // },
          style: { marginBottom: 10 },
        },
      }),
    },
    dummyDiv4: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6,
      },
      props: {
        disabled: true,
      },
    },
    toDate: {
      ...getDateField({
        label: { labelName: "To Date", labelKey: "TL_COMMON_TO_DATE_LABEL" },
        placeholder: {
          labelName: "Display To Date",
          labelKey: "EVENTS_TO_DATE_LABEL",
        },
        required: true,
        pattern: getPattern("Date"),
        jsonPath: "events[0].eventDetails.toDate",
        props: {
          //   inputProps: {
          //     min: getNextMonthDateInYMD(),
          //     max: getFinancialYearDates("yyyy-mm-dd").endDate,
          //   },
          style: { marginBottom: 10 },
        },
      }),
    },
  }),
});

const getFooter = () => {
  const queryValue = getQueryArg(window.location.href, "purpose");
  let buttonLabel = {};
  if (queryValue === "edit") {
    buttonLabel = {
      labelName: "Save",
      // labelKey: "",
    };
    return footer(buttonLabel);
  } else if (queryValue == "delete") {
    buttonLabel = {
      labelName: "Delete",
      // labelKey: "",
    };
    return footer(buttonLabel);
  } else {
    buttonLabel = {
      labelName: "Add Message",
      // labelKey: "",
    };
    return footer(buttonLabel);
  }
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "create",
  beforeInitScreen: (action, state, dispatch) => {
    const tenantId = getTenantId();
    getMdmsData(action, state, dispatch);
    let props = get(
      action.screenConfig,
      "components.div.children.createCard.children.createForm.children.cardContent.children.createContainer.children.ulb.props",
      {}
    );
    props.value = tenantId;
    props.disabled = true;
    set(
      action.screenConfig,
      "components.div.children.createCard.children.createForm.children.cardContent.children.createContainer.children.ulb.props",
      props
    );
    dispatch(prepareFinalObject("events[0].tenantId", tenantId));
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
          },
        },
        createCard: {
          uiFramework: "custom-atoms",
          componentPath: "Form",
          props: {
            id: "create_form",
          },
          children: {
            createForm,
            footer: getFooter(),
          },
        },
      },
    },
  },
};

export default screenConfig;
