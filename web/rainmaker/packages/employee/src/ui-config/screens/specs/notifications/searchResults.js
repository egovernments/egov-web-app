import React from "react";
import { Link } from "react-router-dom";
import { getEventsByType } from "egov-ui-kit/utils/commons";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getLocaleLabels, getTransformedLocalStorgaeLabels, epochToYmd } from "egov-ui-framework/ui-utils/commons";

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export const searchApiCall = async (state, dispatch) => {
  const events = await getEventsByType("BROADCAST");

  try {
    let data = events.map((item) => ({
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
  return `/notifications/create?purpose=edit&uuid=${rowData.id}&tenantId=${rowData.tenantId}`;
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  props: {
    columns: {
      [getLocaleLabels("Message", "EVENTS_MESSAGE_LABEL", getTransformedLocalStorgaeLabels())]: {
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
      [getLocaleLabels("Posting Date", "EVENTS_POSTING_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
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
        {getLocaleLabels("Uploaded Messages", "EVENTS_UPLOADED_MESSAGES_HEADER", getTransformedLocalStorgaeLabels())}
      </span>
    ),

    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
  },
};
