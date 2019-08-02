import get from "lodash/get";
import set from "lodash/set";
import { getLabel, getSelectField, getCommonContainer, getCommonCard } from "egov-ui-framework/ui-config/screens/specs/utils";
import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
import { localStorageGet, getAccessToken } from "egov-ui-kit/utils/localStorageUtils";
import { convertDateToEpoch } from "egov-ui-framework/ui-config/screens/specs/utils/index";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getQueryArg, validateFields } from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "egov-ui-framework/ui-utils/api";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import commonConfig from "config/common.js";

export const callBackForNext = async (state, dispatch, eventType, isDelete) => {
  const uuid = getQueryArg(window.location.href, "uuid");
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
  set(eventsData, "eventType", eventType);
  if (isDelete) {
    set(eventsData, "status", "CANCELLED");
  }
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

  if (isFormValid && !uuid) {
    let purpose = "apply";
    let status = "success";
    try {
      await httpRequest("post", "/egov-user-event/v1/events/_create", "_create", [], requestBody);
      dispatch(setRoute(`/notifications/acknowledgement?purpose=${purpose}&status=${status}`));
    } catch (e) {
      toggleSnackbar(true, { labelKey: "Create error" }, "error");
    }
  } else if (uuid) {
    let purpose = isDelete ? "delete" : "edit";
    const status = "success";
    try {
      await httpRequest("post", "/egov-user-event/v1/events/_update", "_update", [], requestBody);
      dispatch(setRoute(`/notifications/acknowledgement?purpose=${purpose}&status=${status}`));
    } catch (e) {
      toggleSnackbar(true, { labelKey: "Create error" }, "error");
    }
  }
};

export const getEventsByType = async (queryObj) => {
  const requestBody = {
    apiId: "org.egov.pt",
    ver: "1.0",
    ts: 1502890899493,
    action: "asd",
    did: "4354648646",
    key: "xyz",
    msgId: "654654",
    requesterId: "61",
    authToken: getAccessToken(),
  };

  try {
    const payload = await httpRequest("post", "/egov-user-event/v1/events/_search", "_search", queryObj, requestBody);
    if (payload) {
      return payload.events;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const footer = (eventType = "BROADCAST") => {
  const uuid = getQueryArg(window.location.href, "uuid");
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer",
    },
    children: {
      saveButton: {
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
          submitButtonLabel: getLabel({
            labelName: uuid ? "SAVE" : "ADD MESSAGE",
            labelKey: uuid ? "MESSAGE_SAVE_BUTTOM" : "ADD_MESSAGE_BUTTON",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => callBackForNext(state, dispatch, eventType),
        },
      },
      cancelButton: {
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
          submitButtonLabel: getLabel({
            labelName: "CANCEL",
            labelKey: "MESSAGE_CANCEL_BUTTON",
          }),
        },
        onClickDefination: {
          action: "page_change",
          path: "/notifications/search",
        },
        visible: uuid ? true : false,
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

export const getSingleMessage = async (state, dispatch, messageTenant, uuid) => {
  const queryObject = [
    {
      key: "tenantId",
      value: messageTenant,
    },
    {
      key: "ids",
      value: uuid,
    },
  ];
  const messageResponse = await getEventsByType(queryObject);
  messageResponse && dispatch(prepareFinalObject("events[0]", messageResponse[0]));
};

export const getDeleteButton = () => {
  const uuid = getQueryArg(window.location.href, "uuid");
  const isDelete = true;
  return {
    componentPath: "Button",
    gridDefination: {
      xs: 12,
      sm: 6,
      align: "right",
    },
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
      buttonLabel: getLabel({
        labelName: "DELETE MESSAGE",
        labelKey: "MESSAGE_DELETE_BUTTON_LABEL",
      }),
    },
    onClickDefination: {
      action: "condition",
      callBack: (state, dispatch) => callBackForNext(state, dispatch, "BROADCAST", isDelete),
    },
    visible: uuid ? true : false,
  };
};

export const ulbFilter = getCommonCard({
  container: getCommonContainer({
    ulb: getSelectField({
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
      gridDefination: {
        xs: 12,
        sm: 3,
      },
      props: {
        data: [
          {
            value: "pb.amritsar",
            label: "TENANT_TENANTS_PB_AMRITSAR",
          },
        ],
        optionValue: "value",
        optionLabel: "label",
      },
    }),
  }),
});
