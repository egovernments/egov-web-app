import React from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";

const getLocalTextFromCode = localCode => {
  return JSON.parse(localStorage.getItem("localization_en_IN")).find(
    item => item.code == localCode
  );
};

export const textToLocalMapping = {
  "Application No": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_NO"),
    "message",
    "Application No"
  ),
  "License No": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_LIC_NO"),
    "message",
    "License No"
  ),
  "Trade Name": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_TRD_NAME"),
    "message",
    "Trade Name"
  ),
  "Owner Name": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_OWN_NAME"),
    "message",
    "Owner Name"
  ),
  "Application Date": get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_DATE"),
    "message",
    "Application Date"
  ),
  Status: get(
    getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
    "message",
    "Status"
  ),
  INITIATED: get(getLocalTextFromCode("TL_INITIATED"), "message", "INITIATED"),
  APPLIED: get(getLocalTextFromCode("TL_APPLIED"), "message", "APPLIED"),
  PAID: get(getLocalTextFromCode("TL_PAID"), "message", "PAID"),
  APPROVED: get(getLocalTextFromCode("TL_APPROVED"), "message", "APPROVED"),
  REJECTED: get(getLocalTextFromCode("TL_REJECTED"), "message", "REJECTED"),
  CANCELLED: get(getLocalTextFromCode("TL_CANCELLED"), "message", "CANCELLED"),
  "Search Results for Trade License Applications": get(
    getLocalTextFromCode("TL_HOME_SEARCH_RESULTS_TABLE_HEADING"),
    "message",
    "Search Results for Trade License Applications"
  )
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      [get(textToLocalMapping, "Application No")]: {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>
              {rowData[get(textToLocalMapping, "Application No")]}
            </Link>
          );
        }
      },
      [get(textToLocalMapping, "License No")]: {},
      [get(textToLocalMapping, "Trade Name")]: {},
      [get(textToLocalMapping, "Owner Name")]: {},
      [get(textToLocalMapping, "Application Date")]: {},
      [get(textToLocalMapping, "Status")]: {
        format: rowData => {
          let value = rowData[get(textToLocalMapping, "Status")];
          let color = "";
          if (value.indexOf(get(textToLocalMapping, "APPROVED")) !== -1) {
            color = "green";
          } else {
            color = "red";
          }
          return (
            <span
              style={{
                color: color,
                fontSize: "14px",
                fontWeight: 400
              }}
            >
              {value}
            </span>
          );
        }
      }
    },
    title: get(
      textToLocalMapping,
      "Search Results for Trade License Applications"
    ),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 20, 40]
    }
  }
};

const onRowClick = rowData => {
  switch (rowData[get(textToLocalMapping, "Status")]) {
    case get(textToLocalMapping, "APPLIED"):
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "APPROVED"):
      return `/mihy-ui-framework/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;

    case get(textToLocalMapping, "PAID"):
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "CANCELLED"):
      return `/mihy-ui-framework/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "INITIATED"):
      return `/mihy-ui-framework/tradelicence/apply?applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    case get(textToLocalMapping, "REJECTED"):
      return `/mihy-ui-framework/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
        rowData[get(textToLocalMapping, "Application No")]
      }&tenantId=${rowData["tenantId"]}`;
    default:
      return `/mihy-ui-framework/tradelicence/search`;
  }
};
