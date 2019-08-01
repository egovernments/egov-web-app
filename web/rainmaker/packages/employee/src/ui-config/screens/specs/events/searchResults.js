import React from "react";
import { Link } from "react-router-dom";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getLocaleLabels, getTransformedLocalStorgaeLabels, epochToYmd } from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";
import { getEventsByType } from "../utils";
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const searchApiCall = async (state, dispatch) => {
  const queryObject = [
    {
      key: "tenantId",
      value: getTenantId(),
    },
    { key: "eventTypes", value: "EVENTSONGROUND" },
  ];
  const events = await getEventsByType(queryObject);

  try {
    let data =
      events &&
      events.map((item) => ({
        [getLocaleLabels("Message", "EVENTS_MESSAGE_LABEL", getTransformedLocalStorgaeLabels())]: item.name,
        [getLocaleLabels("Posting Date", "EVENTS_POSTING_DATE_LABEL", getTransformedLocalStorgaeLabels())]: epochToYmd(
          item.auditDetails.lastModifiedTime
        ),
        [getLocaleLabels("Start Date", "EVENTS_START_DATE_LABEL", getTransformedLocalStorgaeLabels())]: item.eventDetails
          ? epochToYmd(item.eventDetails.fromDate)
          : "NA",
        [getLocaleLabels("End Date", "EVENTS_END_DATE_LABEL", getTransformedLocalStorgaeLabels())]: item.eventDetails
          ? epochToYmd(item.eventDetails.toDate)
          : "NA",
        [getLocaleLabels("Status", "EVENTS_STATUS_LABEL", getTransformedLocalStorgaeLabels())]: item.status,
        id: item.id,
        tenantId: item.tenantId,
      }));
    dispatch(handleField("search", "components.div.children.searchResults", "props.data", data));
  } catch (error) {
    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
};

const onRowClick = (rowData) => {
  return `/events/create?uuid=${rowData.id}&tenantId=${rowData.tenantId}`;
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  props: {
    columns: {
      [getLocaleLabels("Event Name", "EVENTS_EVENT_NAME_LABEL", getTransformedLocalStorgaeLabels())]: {
        format: (rowData) => {
          return (
            <Link to={onRowClick(rowData)}>
              <span
                style={{
                  color: "#2196F3",
                }}
              >
                {rowData["Message"]}
              </span>
            </Link>
          );
        },
      },
      [getLocaleLabels("Event Category", "EVENTS_EVENT_CATEGORY_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("Start Date", "EVENTS_START_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("End Date", "EVENTS_END_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("Status", "EVENTS_STATUS_LABEL", getTransformedLocalStorgaeLabels())]: {
        format: (rowData) => {
          return (
            <span
              style={{
                color: rowData["Status"] === "ACTIVE" ? "#4CAF50" : "#F44336",
              }}
            >
              {rowData["Status"]}
            </span>
          );
        },
      },
    },
    title: (
      <span
        style={{
          color: "rgba(0, 0, 0, 0.87)",
          fontWeight: 900,
        }}
      >
        {getLocaleLabels("Created Events", "EVENTS_CREATED_EVENTS_HEADER", getTransformedLocalStorgaeLabels())}
      </span>
    ),

    options: {
      filter: true,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
  },
};
