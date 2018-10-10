import React from "react";
import { Link } from "react-router-dom";


export const getLocalTextFromCode = (localCode) => {
  JSON.parse(
    localStorage.getItem("localization_en_IN")
  ).find(item => {
    return item.code == localCode;
  });
};

const textToLocalMapping = {
  "Application No": getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_NO"),
  "License No": getLocalTextFromCode("TL_COMMON_TABLE_COL_LIC_NO"),
  "Trade Name": getLocalTextFromCode("TL_COMMON_TABLE_COL_TRD_NAME"),
  "Owner Name": getLocalTextFromCode("TL_COMMON_TABLE_COL_OWN_NAME"),
  "Application Date": getLocalTextFromCode("TL_COMMON_TABLE_COL_APP_DATE"),
  "Status": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "INITIATED": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "APPLIED": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "PAID": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "APPROVED": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "REJECTED": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS"),
  "CANCELLED": getLocalTextFromCode("TL_COMMON_TABLE_COL_STATUS")
};

export const searchResults = {
  uiFramework: "custom-molecules-local",
  componentPath: "Table",
  visible: false,
  props: {
    data: [],
    columns: {
      "Application No": {
        format: rowData => {
          return (
            <Link to={onRowClick(rowData)}>{rowData["Application No"]}</Link>
          );
        }
      },
      "License No": {},
      "Trade Name": {},
      "Owner Name": {},
      "Application Date": {},
      Status: {
        format: rowData => {
          let value = rowData["Status"];
          let color = "";
          if (value.toLowerCase().indexOf("approved") !== -1) {
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
    title: "Search Results for Trade License Applications",
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 20, 40],
    }
  }
};

const onRowClick = rowData => {
  switch (rowData["Status"]) {
    case "APPLIED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_payment&role=approver&applicationNumber=${
        rowData["Application No"]}&tenantId=${rowData["tenantId"]}`;
    case "APPROVED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=approved&role=approver&applicationNumber=${
        rowData["Application No"]
        }&tenantId=${rowData["tenantId"]}`;

    case "PAID":
      return `/mihy-ui-framework/tradelicence/search-preview?status=pending_approval&role=approver&applicationNumber=${
        rowData["Application No"]
        }&tenantId=${rowData["tenantId"]}`;
    case "CANCELLED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=cancelled&role=approver&applicationNumber=${
        rowData["Application No"]
        }&tenantId=${rowData["tenantId"]}`;
    case "INITIATED":
      return `/mihy-ui-framework/tradelicence/apply?applicationNumber=${
        rowData["Application No"]
        }&tenantId=${rowData["tenantId"]}`;
    case "REJECTED":
      return `/mihy-ui-framework/tradelicence/search-preview?status=rejected&role=approver&applicationNumber=${
        rowData["Application No"]
        }&tenantId=${rowData["tenantId"]}`;
    default:
      return `/mihy-ui-framework/tradelicence/search`;
  }
};
