import React from "react";
import { Link } from "react-router-dom";
import { getEventsByType } from "egov-ui-kit/utils/commons";
import { handleScreenConfigurationFieldChange as handleField, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getLocaleLabels, getTransformedLocalStorgaeLabels } from "egov-ui-framework/ui-utils/commons";

export const searchApiCall = async (state, dispatch) => {
  //   const events = await getEventsByType("BROADCAST");
  const events = [
    {
      tenantId: "pb.amritsar",
      id: "e488a7c0-8d05-43db-a0df-7c7f2041c712",
      referenceId: null,
      eventType: "BROADCAST",
      name: "Blood Donation Camp",
      description: "Blood Donation Camp in Amritsar organised by the Govt.",
      status: "ACTIVE",
      source: "WEBAPP",
      postedBy: "6bb5624b-da7c-4465-82c6-776bc4d0fe58",
      recepient: {
        toRoles: ["CITIZEN.*"],
        toUsers: null,
      },
      actions: null,
      eventDetails: {
        id: "fc2d78d5-e176-4487-a0e5-cd5708f64e1f",
        eventId: "e488a7c0-8d05-43db-a0df-7c7f2041c712",
        fromDate: 1561726008000,
        toDate: 1561812408000,
        latitude: 18.2345,
        longitude: 20.2345,
        address: null,
      },
      auditDetails: {
        createdBy: "6bb5624b-da7c-4465-82c6-776bc4d0fe58",
        createdTime: 1564045936156,
        lastModifiedBy: "6bb5624b-da7c-4465-82c6-776bc4d0fe58",
        lastModifiedTime: 1564045936156,
      },
      recepientEventMap: null,
      generateCounterEvent: null,
    },
  ];
  try {
    let data = events.map((item) => ({
      [getLocaleLabels("Message", "EVENTS_MESSAGE_LABEL", getTransformedLocalStorgaeLabels())]: item.name,
      [getLocaleLabels("Posting Date", "EVENTS_POSTING_DATE_LABEL", getTransformedLocalStorgaeLabels())]: item.auditDetails.lastModifiedTime,
      [getLocaleLabels("Start Date", "EVENTS_START_DATE_LABEL", getTransformedLocalStorgaeLabels())]: item.eventDetails
        ? item.eventDetails.fromDate
        : "NA",
      [getLocaleLabels("End Date", "EVENTS_END_DATE_LABEL", getTransformedLocalStorgaeLabels())]: item.eventDetails ? item.eventDetails.toDate : "NA",
      [getLocaleLabels("Status", "EVENTS_STATUS_LABEL", getTransformedLocalStorgaeLabels())]: item.status,
    }));
    dispatch(handleField("search", "components.div.children.searchResults", "props.data", data));
  } catch (error) {
    dispatch(toggleSnackbar(true, error.message, "error"));
    console.log(error);
  }
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  props: {
    columns: {
      [getLocaleLabels("Message", "EVENTS_MESSAGE_LABEL", getTransformedLocalStorgaeLabels())]: {
        format: (rowData) => {
          return (
            // <Link to={onRowClick(rowData)}>
            <span
              style={{
                color: "#FE7A51",
              }}
            >
              {rowData["EVENTS_MESSAGE_LABEL"]}
            </span>
            // </Link>
          );
        },
      },
      [getLocaleLabels("Posting Date", "EVENTS_POSTING_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("Start Date", "EVENTS_START_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("End Date", "EVENTS_END_DATE_LABEL", getTransformedLocalStorgaeLabels())]: {},
      [getLocaleLabels("Status", "EVENTS_STATUS_LABEL", getTransformedLocalStorgaeLabels())]: {},
    },
    title: getLocaleLabels("Uploaded Messages", "EVENTS_UPLOADED_MESSAGES_HEADER", getTransformedLocalStorgaeLabels()),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
    },
    // customSortColumn: {
    //   column: "Application Date",
    //   sortingFn: (data, i, sortDateOrder) => {
    //     const epochDates = data.reduce((acc, curr) => {
    //       acc.push([...curr, getEpochForDate(curr[4], "dayend")]);
    //       return acc;
    //     }, []);
    //     const order = sortDateOrder === "asc" ? true : false;
    //     const finalData = sortByEpoch(epochDates, !order).map((item) => {
    //       item.pop();
    //       return item;
    //     });
    //     return { data: finalData, currentOrder: !order ? "asc" : "desc" };
    //   },
    // },
  },
};
